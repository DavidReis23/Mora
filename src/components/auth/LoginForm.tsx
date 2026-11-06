"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import FormField from "./FormField";
import PasswordField from "./PasswordField";
import styles from "./AuthForm.module.css";

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [mensagem, setMensagem] = useState("");

  function clearError(field: keyof LoginErrors) {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    setMensagem("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);

    const email = String(dados.get("email") ?? "").trim();
    const senha = String(dados.get("password") ?? "");

    const novosErros: LoginErrors = {};

    // Validar e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      novosErros.email = "Informe seu e-mail.";
    } else if (!emailValido.test(email)) {
      novosErros.email = "Digite um e-mail válido.";
    }

    // Validar senha
    if (!senha) {
      novosErros.password = "Informe sua senha.";
    } else if (senha.length < 8) {
      novosErros.password = "Sua senha deve ter pelo menos 8 caracteres.";
    }

    setErrors(novosErros);
    setMensagem("");

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setMensagem(
      "Formulário validado! A autenticação real será implementada futuramente.",
    );
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

        <button type="submit" className={styles.submit}>
          Entrar
        </button>
      </form>

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
