import Link from "next/link";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>
            Encontre o lugar ideal
            <br />
            para chamar de seu.
          </h1>

          <p className={styles.description}>
            Encontre casas, apartamentos, terrenos e outras oportunidades para
            comprar ou alugar. Seu próximo lugar começa no Mora.
          </p>

          <div className={styles.actions}>
            <Link href="/imoveis" className={styles.primary}>
              Explorar imóveis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
