import Link from "next/link";

import Logo from "@/components/brand/Logo";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Identidade do Mora */}
        <Link
          href="/#inicio"
          className={styles.brand}
          aria-label="Mora - Voltar ao início"
        >
          <Logo size={44} plain />
          <span>Mora</span>
        </Link>

        {/* Menu principal */}
        <nav className={styles.navigation} aria-label="Navegação principal">
          <Link href="/#inicio" className={styles.explore}>
            Início
          </Link>

          <Link href="/#imoveis" className={styles.explore}>
            Imóveis
          </Link>

          <Link href="/#anunciar" className={styles.explore}>
            Anunciar
          </Link>

          <Link href="/#sobre" className={styles.explore}>
            Sobre
          </Link>

          {/* Acesso à conta */}
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
