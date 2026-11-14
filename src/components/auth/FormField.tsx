import type { ReactNode } from "react";

import styles from "./AuthForm.module.css";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export default function FormField({
  id,
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className={styles.field}>
      {/* RÓTULO E ERRO NA MESMA LINHA */}
      <div className={styles.fieldHeading}>
        <label htmlFor={id}>{label}</label>

        {error && (
          <span id={`${id}-error`} className={styles.fieldError} role="alert">
            {error}
          </span>
        )}
      </div>

      {/* CAMPO DE ENTRADA */}
      {children}
    </div>
  );
}
