"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import styles from "./AuthForm.module.css";

type FormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterForm() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [mensagem, setMensagem] = useState("");

  function clearError(field: keyof FormErrors) {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    setMensagem("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);

    const nome = String(dados.get("fullName") ?? "").trim();
    const email = String(dados.get("email") ?? "").trim();
    const senha = String(dados.get("password") ?? "");
    const confirmarSenha = String(dados.get("confirmPassword") ?? "");

    const novosErros: FormErrors = {};

    // Validar nome
    if (nome.length < 3) {
      novosErros.fullName = "Digite seu nome completo.";
    } else if (nome.includes("@")) {
      novosErros.fullName = "Informe seu nome, não um e-mail.";
    }

    // Validar e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
      novosErros.email = "Digite um e-mail válido.";
    }

    // Validar senha
    if (senha.length < 8) {
      novosErros.password = "Sua senha deve ter pelo menos 8 caracteres.";
    }

    // Validar confirmação da senha
    if (!confirmarSenha) {
      novosErros.confirmPassword = "Confirme sua senha.";
    } else if (senha !== confirmarSenha) {
      novosErros.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(novosErros);
    setMensagem("");

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setMensagem(
      "Formulário validado! O cadastro real será implementado futuramente.",
    );
  }

  return (
    <div className={`${styles.card} ${styles.registerCard}`}>
      <span className={styles.eyebrow}>CRIE SUA CONTA</span>

      <h2>Faça parte do Mora</h2>

      <p className={styles.description}>
        Crie sua conta para salvar imóveis, conversar com anunciantes e divulgar
        suas próprias oportunidades.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Nome completo */}
        <div className={styles.field}>
          <label htmlFor="fullName">Nome completo</label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Digite seu nome completo"
            autoComplete="name"
            required
            minLength={3}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={errors.fullName ? styles.inputError : ""}
            onChange={() => clearError("fullName")}
          />

          {errors.fullName && (
            <span id="fullName-error" className={styles.errorText} role="alert">
              {errors.fullName}
            </span>
          )}
        </div>

        {/* E-mail */}
        <div className={styles.field}>
          <label htmlFor="registerEmail">E-mail</label>

          <input
            id="registerEmail"
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

          {errors.email && (
            <span id="email-error" className={styles.errorText} role="alert">
              {errors.email}
            </span>
          )}
        </div>

        {/* Senha */}
        <div className={styles.field}>
          <label htmlFor="registerPassword">Senha</label>

          <div className={styles.passwordField}>
            <input
              id="registerPassword"
              name="password"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Crie uma senha"
              autoComplete="new-password"
              minLength={8}
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={errors.password ? styles.inputError : ""}
              onChange={() => clearError("password")}
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={mostrarSenha ? "Ocultar senhas" : "Mostrar senhas"}
              aria-pressed={mostrarSenha}
            >
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {errors.password && (
            <span id="password-error" className={styles.errorText} role="alert">
              {errors.password}
            </span>
          )}
        </div>

        {/* Confirmar senha */}
        <div className={styles.field}>
          <label htmlFor="confirmPassword">Confirmar senha</label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type={mostrarSenha ? "text" : "password"}
            placeholder="Repita sua senha"
            autoComplete="new-password"
            minLength={8}
            required
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? "confirmPassword-error" : undefined
            }
            className={errors.confirmPassword ? styles.inputError : ""}
            onChange={() => clearError("confirmPassword")}
          />

          {errors.confirmPassword && (
            <span
              id="confirmPassword-error"
              className={styles.errorText}
              role="alert"
            >
              {errors.confirmPassword}
            </span>
          )}
        </div>

        <button type="submit" className={styles.submit}>
          Criar conta
        </button>
      </form>

      {mensagem && (
        <p className={styles.message} role="status">
          {mensagem}
        </p>
      )}

      <p className={styles.signup}>
        Já possui uma conta? <Link href="/login">Entrar</Link>
      </p>

      <div className={styles.separator}>
        <span>ou</span>
      </div>

      <Link href="/imoveis" className={styles.explore}>
        Explorar imóveis sem criar conta
      </Link>
    </div>
  );
}
