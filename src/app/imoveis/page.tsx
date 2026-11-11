import Header from "@/components/layout/Header";
import PropertyCatalog from "@/components/properties/PropertyCatalog";

import { properties } from "@/constants/properties";
import styles from "./page.module.css";

export default function ImoveisPage() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>EXPLORE O MORA</span>

            <h1>Encontre seu próximo imóvel</h1>

            <p>
              Explore oportunidades de venda e aluguel em Tauá e outras cidades
              da região.
            </p>
          </div>

          <PropertyCatalog properties={properties} />
        </div>
      </main>
    </>
  );
}
