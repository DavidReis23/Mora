"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import FormField from "./FormField";
import PasswordField from "./PasswordField";
import styles from "./AuthForm.module.css";

import { createClient } from "@/lib/supabase/client";

type FormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  accountType?: string;
};

export default function RegisterForm() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [mensagem, setMensagem] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [enviando, setEnviando] = useState(false);

  function clearError(field: keyof FormErrors) {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    setMensagem("");
    setErroGeral("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);

    const nome = String(dados.get("fullName") ?? "").trim();
    const email = String(dados.get("email") ?? "").trim();
    const senha = String(dados.get("password") ?? "");
    const confirmarSenha = String(dados.get("confirmPassword") ?? "");
    const tipoConta = String(dados.get("accountType") ?? "");

    const novosErros: FormErrors = {};
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // VALIDAR NOME
    if (nome.length < 3) {
      novosErros.fullName = "Digite seu nome completo.";
    } else if (nome.includes("@")) {
      novosErros.fullName = "Informe seu nome, não um e-mail.";
    }

    // VALIDAR E-MAIL
    if (!emailValido.test(email)) {
      novosErros.email = "Digite um e-mail válido.";
    }

    // VALIDAR SENHA
    if (senha.length < 8) {
      novosErros.password = "Sua senha deve ter pelo menos 8 caracteres.";
    }

    // CONFIRMAR SENHA
    if (!confirmarSenha) {
      novosErros.confirmPassword = "Confirme sua senha.";
    } else if (senha !== confirmarSenha) {
      novosErros.confirmPassword = "As senhas não coincidem.";
    }

    // VALIDAR TIPO DE CONTA
    if (tipoConta !== "cliente" && tipoConta !== "proprietario") {
      novosErros.accountType = "Escolha o tipo de conta.";
    }

    setErrors(novosErros);
    setMensagem("");
    setErroGeral("");

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setEnviando(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            full_name: nome,
            account_type: tipoConta,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        if (error.code === "email_address_not_authorized") {
          setErroGeral(
            "O Supabase ainda não permite enviar e-mails " +
              "para esse endereço. Utilize um e-mail " +
              "autorizado do projeto.",
          );
        } else if (error.code === "over_email_send_rate_limit") {
          setErroGeral(
            "Limite de envio de e-mails atingido. " +
              "Tente novamente mais tarde.",
          );
        } else if (error.code === "weak_password") {
          setErrors((prev) => ({
            ...prev,
            password: "A senha não atende aos requisitos de segurança.",
          }));
        } else {
          setErroGeral(
            "Não foi possível concluir o cadastro. " +
              "Verifique os dados e tente novamente.",
          );
        }

        return;
      }

      setMensagem(
        "Solicitação de cadastro recebida! " +
          "Se o endereço puder ser cadastrado, " +
          "você receberá um e-mail de confirmação. " +
          "Verifique também a pasta de spam.",
      );
    } catch {
      setErroGeral(
        "Não foi possível conectar ao serviço. " +
          "Verifique sua internet e tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className={`${styles.card} ${styles.registerCard}`}>
      <span className={styles.eyebrow}>CRIE SUA CONTA</span>

      <h2>Faça parte do Mora</h2>

      <p className={styles.description}>
        Crie sua conta para encontrar, salvar ou anunciar imóveis.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* TIPO DE CONTA */}
        <fieldset
          className={styles.accountTypeField}
          aria-invalid={!!errors.accountType}
          aria-describedby={
            errors.accountType ? "account-type-error" : undefined
          }
        >
          <legend className={styles.accountTypeLegend}>
            <span className={styles.fieldHeading}>
              <span>Como você deseja usar o Mora?</span>

              {errors.accountType && (
                <span
                  id="account-type-error"
                  className={styles.fieldError}
                  role="alert"
                >
                  {errors.accountType}
                </span>
              )}
            </span>
          </legend>

          <div className={styles.accountTypeOptions}>
            <label className={styles.accountTypeOption}>
              <input
                type="radio"
                name="accountType"
                value="cliente"
                onChange={() => clearError("accountType")}
              />

              <span>
                <strong>Cliente</strong>
                <small>Quero encontrar imóveis</small>
              </span>
            </label>

            <label className={styles.accountTypeOption}>
              <input
                type="radio"
                name="accountType"
                value="proprietario"
                onChange={() => clearError("accountType")}
              />

              <span>
                <strong>Proprietário</strong>
                <small>Quero anunciar imóveis</small>
              </span>
            </label>
          </div>
        </fieldset>

        {/* NOME COMPLETO */}
        <FormField id="fullName" label="Nome completo" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Digite seu nome completo"
            autoComplete="name"
            minLength={3}
            required
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={errors.fullName ? styles.inputError : ""}
            onChange={() => clearError("fullName")}
          />
        </FormField>

        {/* E-MAIL */}
        <FormField id="registerEmail" label="E-mail" error={errors.email}>
          <input
            id="registerEmail"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "registerEmail-error" : undefined}
            className={errors.email ? styles.inputError : ""}
            onChange={() => clearError("email")}
          />
        </FormField>

        {/* SENHA */}
        <FormField id="registerPassword" label="Senha" error={errors.password}>
          <PasswordField
            id="registerPassword"
            name="password"
            placeholder="Crie uma senha"
            autoComplete="new-password"
            visible={mostrarSenha}
            onToggle={() => setMostrarSenha(!mostrarSenha)}
            onChange={() => clearError("password")}
            error={errors.password}
          />
        </FormField>

        {/* CONFIRMAR SENHA */}
        <FormField
          id="confirmPassword"
          label="Confirmar senha"
          error={errors.confirmPassword}
        >
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
        </FormField>

        {/* BOTÃO */}
        <button type="submit" className={styles.submit} disabled={enviando}>
          {enviando ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      {/* ERRO DO SUPABASE */}
      {erroGeral && (
        <p className={styles.generalError} role="alert">
          {erroGeral}
        </p>
      )}

      {/* SUCESSO */}
      {mensagem && (
        <p className={styles.message} role="status">
          {mensagem}
        </p>
      )}

      {/* LOGIN */}
      <p className={styles.signup}>
        Já possui uma conta? <Link href="/login">Entrar</Link>
      </p>
    </div>
  );
}
