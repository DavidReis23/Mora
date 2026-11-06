import Link from "next/link";
import Logo from "@/components/brand/Logo";
import LoginForm from "@/components/auth/LoginForm";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.layout}>
      <section className={styles.presentation}>
        <Link href="/" className={styles.brand}>
          <Logo size={52} />
          <span>Mora</span>
        </Link>

        <div className={styles.content}>
          <span className={styles.label}>SEU PRÓXIMO LUGAR COMEÇA AQUI</span>

          <h1>Encontre um lugar para chamar de seu.</h1>

          <p>
            Casas, apartamentos, terrenos, chácaras e outras oportunidades em um
            só lugar. Encontre, anuncie e conecte-se pelo Mora.
          </p>

          <div className={styles.categories}>
            <span>Venda</span>
            <span>Aluguel</span>
            <span>Chácaras</span>
            <span>Reservas</span>
          </div>
        </div>

        <p className={styles.footer}>
          Mora — Mercado de Oportunidades Residenciais e Aluguéis
        </p>
      </section>

      <section className={styles.formArea} aria-label="Acesso à conta">
        <LoginForm />
      </section>
    </main>
  );
}
