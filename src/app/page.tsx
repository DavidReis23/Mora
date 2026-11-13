import Link from "next/link";

import { House, KeyRound, Megaphone } from "lucide-react";

import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/properties/PropertyCard";

import { properties } from "@/constants/properties";

import styles from "./page.module.css";

export default function HomePage() {
  const featuredProperties = properties.slice(0, 3);

  return (
    <>
      <Header />

      <main className={styles.main}>
        {/* 1. INÍCIO */}
        <Hero />

        {/* 2. IMÓVEIS EM DESTAQUE */}
        <section
          id="imoveis"
          className={styles.section}
          aria-labelledby="featured-title"
        >
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.eyebrow}>
                  ENCONTRE SEU PRÓXIMO LUGAR
                </span>

                <h2 id="featured-title" className={styles.sectionTitle}>
                  Imóveis em destaque
                </h2>
              </div>

              <Link href="/imoveis" className={styles.moreLink}>
                Ver todos os imóveis →
              </Link>
            </div>

            <div className={styles.propertyGrid}>
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. ANUNCIAR */}
        <section
          id="anunciar"
          className={styles.announceSection}
          aria-labelledby="announce-title"
        >
          <div className={styles.container}>
            <div className={styles.announceContent}>
              <span className={styles.eyebrow}>PARA QUEM DESEJA ANUNCIAR</span>

              <h2 id="announce-title" className={styles.announceTitle}>
                Seu imóvel merece ser encontrado.
              </h2>

              <p className={styles.announceDescription}>
                Divulgue seu imóvel no Mora e conecte-se com pessoas
                interessadas em comprar ou alugar. Tudo em um só lugar.
              </p>

              <Link href="/cadastro" className={styles.announceButton}>
                Anunciar meu imóvel
              </Link>

              <p className={styles.announceNote}>
                Para anunciar, é necessário ter uma conta de proprietário.
              </p>
            </div>
          </div>
        </section>

        {/* 4. SOBRE O MORA */}
        <section
          id="sobre"
          className={styles.aboutSection}
          aria-labelledby="about-title"
        >
          <div className={styles.container}>
            <div className={styles.aboutIntro}>
              <div>
                <span className={styles.eyebrow}>SOBRE O MORA</span>

                <h2 id="about-title" className={styles.aboutTitle}>
                  O seu lugar no
                  <br />
                  mercado imobiliário.
                </h2>
              </div>

              <p className={styles.aboutDescription}>
                O Mora é uma plataforma para quem deseja comprar, alugar ou
                anunciar imóveis. Nosso objetivo é conectar pessoas a
                oportunidades, com praticidade e uma experiência simples.
              </p>
            </div>

            <div className={styles.benefits}>
              <div className={styles.benefitsIntro}>
                <h3>Por que escolher o Mora?</h3>

                <p>
                  Mais facilidade para encontrar oportunidades e divulgar
                  imóveis.
                </p>
              </div>

              {/* COMPRA */}
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>
                  <House size={24} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h4>Compra</h4>
                <p>Explore imóveis disponíveis para venda.</p>
              </div>

              {/* ALUGUEL */}
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>
                  <KeyRound size={24} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h4>Aluguel</h4>
                <p>Encontre opções para morar ou alugar.</p>
              </div>

              {/* ANÚNCIOS */}
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>
                  <Megaphone size={24} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h4>Anúncios</h4>
                <p>Um espaço para proprietários divulgarem seus imóveis.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
