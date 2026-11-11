"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import FormField from "./FormField";
import PasswordField from "./PasswordField";
import styles from "./AuthForm.module.css";

import { createClient } from "@/lib/supabase/client";

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [mensagem, setMensagem] = useState("");

  const [entrando, setEntrando] = useState(false);
  const [erroGeral, setErroGeral] = useState("");

  function clearError(field: keyof LoginErrors) {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    setMensagem("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);

    const email = String(dados.get("email") ?? "").trim();
    const senha = String(dados.get("password") ?? "");

    const novosErros: LoginErrors = {};
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      novosErros.email = "Informe seu e-mail.";
    } else if (!emailValido.test(email)) {
      novosErros.email = "Digite um e-mail válido.";
    }

    if (!senha) {
      novosErros.password = "Informe sua senha.";
    }

    setErrors(novosErros);
    setMensagem("");
    setErroGeral("");

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setEntrando(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        if (error.code === "email_not_confirmed") {
          setErroGeral(
            "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.",
          );
        } else if (error.code === "invalid_credentials") {
          setErroGeral(
            "E-mail ou senha incorretos. Verifique e tente novamente.",
          );
        } else {
          setErroGeral(
            "Não foi possível entrar na sua conta. Tente novamente.",
          );
        }

        return;
      }

      setMensagem(
        "Login realizado com sucesso! Sua sessão está ativa no Mora.",
      );
    } catch {
      setErroGeral(
        "Não foi possível conectar ao serviço. Verifique sua conexão.",
      );
    } finally {
      setEntrando(false);
    }
  }

  return (
    <div className={styles.card}>
      <span className={styles.eyebrow}>ACESSE SUA CONTA</span>

      <h2>Bem-vindo de volta!</h2>

      <p className={styles.description}>
        Entre para salvar imóveis, conversar com anunciantes e gerenciar suas
        reservas.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* E-mail */}
        <FormField id="email" label="E-mail" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={errors.email ? styles.inputError : ""}
            onChange={() => clearError("email")}
          />
        </FormField>

        {/* Senha */}
        <FormField id="password" label="Senha" error={errors.password}>
          <PasswordField
            id="password"
            name="password"
            placeholder="Digite sua senha"
            autoComplete="current-password"
            visible={mostrarSenha}
            onToggle={() => setMostrarSenha(!mostrarSenha)}
            onChange={() => clearError("password")}
            error={errors.password}
          />
        </FormField>

        <div className={styles.forgotPassword}>
          <Link href="/recuperar-senha">Esqueceu sua senha?</Link>
        </div>

        <button type="submit" className={styles.submit} disabled={entrando}>
          {entrando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {erroGeral && (
        <p className={styles.generalError} role="alert">
          {erroGeral}
        </p>
      )}

      {mensagem && (
        <p className={styles.message} role="status">
          {mensagem}
        </p>
      )}

      <p className={styles.signup}>
        Ainda não tem uma conta? <Link href="/cadastro">Cadastre-se</Link>
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
