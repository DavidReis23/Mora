import type { Property } from "@/types/property";
import styles from "./PropertyCard.module.css";
import Logo from "@/components/brand/Logo";

type PropertyCardProps = {
  property: Property;
};

const typeLabels: Record<Property["type"], string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  terreno: "Terreno",
  chacara: "Chácara",
  espaco_eventos: "Espaço para eventos",
};

const purposeLabels: Record<Property["purpose"], string> = {
  venda: "Venda",
  aluguel: "Aluguel",
  evento: "Locação para eventos",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const priceSuffix =
    property.priceUnit === "mes"
      ? "/mês"
      : property.priceUnit === "diaria"
        ? "/diária"
        : "";

  return (
    <article className={styles.card}>
      <div className={styles.imageArea}>
        <span className={styles.purpose}>
          {purposeLabels[property.purpose]}
        </span>

        <Logo size={52} />

        <span className={styles.imageLabel}>Foto em breve</span>

        <span className={styles.imageLabel}>Imagem demonstrativa</span>
      </div>

      <div className={styles.content}>
        <span className={styles.type}>{typeLabels[property.type]}</span>

        <h2 className={styles.title}>{property.title}</h2>

        <p className={styles.location}>
          {property.neighborhood} · {property.city} - {property.state}
        </p>

        <div className={styles.details}>
          <span>{property.area} m²</span>

          {property.bedrooms !== undefined && (
            <span>{property.bedrooms} quartos</span>
          )}

          {property.bathrooms !== undefined && (
            <span>{property.bathrooms} banheiros</span>
          )}
        </div>

        <div className={styles.price}>
          <strong>{formatPrice(property.price)}</strong>
          <span>{priceSuffix}</span>
        </div>
      </div>
    </article>
  );
}
