import type { ChangeEventHandler } from "react";

import styles from "./AuthForm.module.css";

type PasswordFieldProps = {
  id: string;
  name: string;
  placeholder: string;
  autoComplete: "current-password" | "new-password";
  visible: boolean;
  onToggle: () => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  minLength?: number;
};

export default function PasswordField({
  id,
  name,
  placeholder,
  autoComplete,
  visible,
  onToggle,
  onChange,
  error,
  minLength = 8,
}: PasswordFieldProps) {
  return (
    <div className={styles.passwordField}>
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        required
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={error ? styles.inputError : ""}
      />

      <button
        type="button"
        className={styles.passwordToggle}
        onClick={onToggle}
        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={visible}
      >
        {visible ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
}
