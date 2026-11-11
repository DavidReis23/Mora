"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/brand/Logo";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isPropertiesPage =
    pathname === "/imoveis" || pathname.startsWith("/imoveis/");

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          <Logo size={44} />
          <span>Mora</span>
        </Link>

        <nav className={styles.navigation} aria-label="Menu principal">
          {!isPropertiesPage && (
            <Link href="/imoveis" className={styles.explore}>
              Explorar imóveis
            </Link>
          )}

          <Link href="/login" className={styles.login}>
            Entrar
          </Link>

          <Link href="/cadastro" className={styles.signup}>
            Criar conta
          </Link>
        </nav>
      </div>
    </header>
  );
}
