"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem(
      "Esta é uma prévia do formulário. A autenticação será implementada futuramente.",
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

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="email">E-mail</label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Senha</label>

          <div className={styles.passwordField}>
            <input
              id="password"
              name="password"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              minLength={6}
              required
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={mostrarSenha}
            >
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

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
