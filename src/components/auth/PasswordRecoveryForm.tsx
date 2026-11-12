"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import FormField from "./FormField";
import styles from "./AuthForm.module.css";

export default function PasswordRecoveryForm() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setMensagem("");

    const endereco = email.trim();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!endereco) {
      setErro("Informe seu e-mail.");
      return;
    }

    if (!emailValido.test(endereco)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    setEnviando(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.resetPasswordForEmail(endereco, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) {
        console.error("Erro do Supabase:", {
          codigo: error.code,
          status: error.status,
          mensagem: error.message,
        });

        if (error.status === 429) {
          setErro(
            "Muitas solicitações de recuperação. " +
              "Aguarde antes de tentar novamente.",
          );
        } else if (error.code === "email_address_not_authorized") {
          setErro(
            "Este e-mail não está autorizado para envio " +
              "pelo serviço de testes do Supabase.",
          );
        } else {
          setErro(
            "Não foi possível enviar o e-mail de recuperação. " +
              "Tente novamente mais tarde.",
          );
        }

        return;
      }

      setMensagem(
        "Se existir uma conta com esse e-mail, você receberá " +
          "um link para redefinir sua senha. Confira também o spam.",
      );
    } catch {
      setErro(
        "Não foi possível conectar ao serviço. " +
          "Verifique sua conexão e tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className={styles.card}>
      <span className={styles.eyebrow}>RECUPERAÇÃO DE CONTA</span>

      <h2>Esqueceu sua senha?</h2>

      <p className={styles.description}>
        Informe o e-mail cadastrado para receber as instruções de recuperação da
        sua conta.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <FormField id="recoveryEmail" label="E-mail" error={erro}>
          <input
            id="recoveryEmail"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErro("");
              setMensagem("");
            }}
            aria-invalid={!!erro}
            aria-describedby={erro ? "recoveryEmail-error" : undefined}
            className={erro ? styles.inputError : ""}
          />
        </FormField>

        <button type="submit" className={styles.submit} disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar link de recuperação"}
        </button>
      </form>

      {mensagem && (
        <p className={styles.message} role="status">
          {mensagem}
        </p>
      )}

      <p className={styles.signup}>
        Lembrou sua senha? <Link href="/login">Voltar ao login</Link>
      </p>

      <div className={styles.separator}>
        <span>ou</span>
      </div>

      <Link href="/imoveis" className={styles.explore}>
        Explorar imóveis sem entrar
      </Link>
    </div>
  );
}
