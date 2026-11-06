import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <main className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.label}>Seu próximo lugar começa aqui</span>

          <h1>
            Encontre o lugar ideal para
            <span> chamar de seu.</span>
          </h1>

          <p>
            O Mora conecta quem procura um imóvel a quem deseja vender ou
            alugar. Encontre casas, apartamentos, terrenos e outras
            oportunidades em um só lugar.
          </p>

          <div className={styles.actions}>
            <Link href="/imoveis" className={styles.primary}>
              Explorar imóveis
            </Link>

            <Link href="/cadastro" className={styles.secondary}>
              Anunciar um imóvel
            </Link>
          </div>
        </div>

        <div className={styles.information}>
          <span className={styles.informationLabel}>Conheça o Mora</span>

          <h2>Mais facilidade para encontrar imóveis.</h2>

          <p>
            Pesquise oportunidades por localização, tipo de imóvel e faixa de
            preço.
          </p>

          <div className={styles.features}>
            <span>Casas e apartamentos</span>
            <span>Terrenos e chácaras</span>
            <span>Venda e aluguel</span>
          </div>
        </div>
      </div>
    </main>
  );
}
