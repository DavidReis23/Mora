import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.legal}>
          <p>© 2026 Mora. Todos os direitos reservados.</p>

          <p>Mora — Mercado de Oportunidades Residenciais e Aluguéis.</p>
        </div>
      </div>
    </footer>
  );
}
