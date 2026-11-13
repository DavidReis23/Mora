"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import Logo from "@/components/brand/Logo";
import styles from "./Header.module.css";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* LOGO */}
        <Link
          href="/#inicio"
          className={styles.brand}
          aria-label="Mora - Página inicial"
          onClick={fecharMenu}
        >
          <Logo size={44} plain />
          <span>Mora</span>
        </Link>

        {/* BOTÃO DO MENU MOBILE */}
        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
        >
          {menuAberto ? (
            <X size={26} aria-hidden="true" />
          ) : (
            <Menu size={26} aria-hidden="true" />
          )}
        </button>

        {/* NAVEGAÇÃO */}
        <nav
          id="menu-principal"
          className={`${styles.navigation} ${
            menuAberto ? styles.navigationOpen : ""
          }`}
          aria-label="Navegação principal"
        >
          <Link href="/#inicio" className={styles.explore} onClick={fecharMenu}>
            Início
          </Link>

          <Link
            href="/#imoveis"
            className={styles.explore}
            onClick={fecharMenu}
          >
            Imóveis
          </Link>

          <Link
            href="/#anunciar"
            className={styles.explore}
            onClick={fecharMenu}
          >
            Anunciar
          </Link>

          <Link href="/#sobre" className={styles.explore} onClick={fecharMenu}>
            Sobre
          </Link>

          <Link href="/login" className={styles.login} onClick={fecharMenu}>
            Entrar
          </Link>

          <Link href="/cadastro" className={styles.signup} onClick={fecharMenu}>
            Criar conta
          </Link>
        </nav>
      </div>
    </header>
  );
}
