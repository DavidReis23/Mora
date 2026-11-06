"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import FormField from "./FormField";
import styles from "./AuthForm.module.css";

export default function PasswordRecoveryForm() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setMensagem("");

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setErro("Informe seu e-mail.");
      return;
    }

    if (!emailValido.test(email.trim())) {
      setErro("Digite um e-mail válido.");
      return;
    }

    setMensagem(
      "E-mail validado! A recuperação de senha será disponibilizada futuramente. Nenhuma mensagem foi enviada.",
    );
  }

  return (
    <div className={styles.card}>
      <span className={styles.eyebrow}>RECUPERAÇÃO DE CONTA</span>

      <h2>Esqueceu sua senha?</h2>

      <p className={styles.description}>
        Informe o e-mail cadastrado para solicitar a recuperação do acesso à sua
        conta.
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
            required
          />
        </FormField>

        <button type="submit" className={styles.submit}>
          Continuar
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
