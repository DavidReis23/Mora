import type { ReactNode } from "react";

import Logo from "@/components/brand/Logo";
import styles from "./AuthLayout.module.css";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className={styles.layout}>
      {/* FOTOGRAFIA DE FUNDO */}
      <div className={styles.background} aria-hidden="true" />

      {/* CARTÃO CENTRALIZADO */}
      <div className={styles.shell}>
        {/* LOGO APENAS VISUAL, SEM LINK */}
        <div className={styles.brand}>
          <Logo size={44} />
          <span>Mora</span>
        </div>

        {/* FORMULÁRIO DA PÁGINA */}
        <section
          className={styles.formArea}
          aria-label="Área de autenticação do Mora"
        >
          {children}
        </section>
      </div>
    </main>
  );
}
