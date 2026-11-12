"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

import FormField from "./FormField";
import PasswordField from "./PasswordField";
import styles from "./AuthForm.module.css";

type Etapa = "verificando" | "pronto" | "invalido" | "concluido";

export default function ResetPasswordForm() {
  const [etapa, setEtapa] = useState<Etapa>("verificando");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function verificarSessao() {
      try {
        const supabase = createClient();

        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (ativo) {
          setEtapa(!error && user ? "pronto" : "invalido");
        }
      } catch {
        if (ativo) {
          setEtapa("invalido");
        }
      }
    }

    void verificarSessao();

    return () => {
      ativo = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (etapa !== "pronto" || salvando) return;

    setErro("");

    const dados = new FormData(event.currentTarget);

    const senha = String(dados.get("password") ?? "");
    const confirmarSenha = String(dados.get("confirmPassword") ?? "");

    if (senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setSalvando(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password: senha,
      });

      if (error) {
        setErro(
          "Não foi possível alterar a senha. " +
            "Solicite um novo link e tente novamente.",
        );
        return;
      }

      // Após a alteração, solicitamos um novo login.
      await supabase.auth.signOut();

      setEtapa("concluido");
    } catch {
      setErro("Ocorreu um problema de conexão. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className={styles.card}>
      <span className={styles.eyebrow}>SEGURANÇA DA CONTA</span>

      {etapa === "verificando" && (
        <>
          <h2>Verificando seu link...</h2>
          <p className={styles.description} role="status">
            Estamos verificando sua solicitação de recuperação.
          </p>
        </>
      )}

      {etapa === "invalido" && (
        <>
          <h2>Link inválido ou expirado</h2>

          <p className={styles.description} role="alert">
            Este link não pode mais ser utilizado. Solicite uma nova recuperação
            de senha.
          </p>

          <Link href="/recuperar-senha" className={styles.explore}>
            Solicitar novo link
          </Link>
        </>
      )}

      {etapa === "pronto" && (
        <>
          <h2>Crie uma nova senha</h2>

          <p className={styles.description}>
            Digite sua nova senha e confirme para recuperar o acesso à sua
            conta.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <FormField id="newPassword" label="Nova senha">
              <PasswordField
                id="newPassword"
                name="password"
                placeholder="Digite sua nova senha"
                autoComplete="new-password"
                visible={mostrarSenha}
                onToggle={() => setMostrarSenha(!mostrarSenha)}
                onChange={() => setErro("")}
              />
            </FormField>

            <FormField id="confirmNewPassword" label="Confirmar nova senha">
              <PasswordField
                id="confirmNewPassword"
                name="confirmPassword"
                placeholder="Confirme sua nova senha"
                autoComplete="new-password"
                visible={mostrarSenha}
                onToggle={() => setMostrarSenha(!mostrarSenha)}
                onChange={() => setErro("")}
              />
            </FormField>

            {erro && (
              <p className={styles.generalError} role="alert">
                {erro}
              </p>
            )}

            <button type="submit" className={styles.submit} disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar nova senha"}
            </button>
          </form>
        </>
      )}

      {etapa === "concluido" && (
        <>
          <h2>Senha alterada!</h2>

          <p className={styles.message} role="status">
            Sua senha foi atualizada com sucesso. Agora você pode entrar
            novamente no Mora.
          </p>

          <Link href="/login" className={styles.explore}>
            Voltar ao login
          </Link>
        </>
      )}
    </div>
  );
}
