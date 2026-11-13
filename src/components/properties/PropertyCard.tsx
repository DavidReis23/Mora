import type { Property } from "@/types/property";
import styles from "./PropertyCard.module.css";

type PropertyCardProps = {
  property: Property;
};

/* NOMES DOS TIPOS DE IMÓVEIS */

const typeLabels: Record<Property["type"], string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  terreno: "Terreno",
  chacara: "Chácara",
  espaco_eventos: "Espaço para eventos",
};

/* FINALIDADES DOS IMÓVEIS */

const purposeLabels: Record<Property["purpose"], string> = {
  venda: "Venda",
  aluguel: "Aluguel",
  evento: "Locação para eventos",
};

/* FOTOGRAFIAS ILUSTRATIVAS */

const propertyImages: Record<Property["type"], string> = {
  casa: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",

  apartamento:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",

  terreno:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85",

  chacara:
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",

  espaco_eventos:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85",
};

/* FORMATAÇÃO DOS PREÇOS */

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);
}

/* COMPONENTE DO CARTÃO */

export default function PropertyCard({ property }: PropertyCardProps) {
  const priceSuffix =
    property.priceUnit === "mes"
      ? "/mês"
      : property.priceUnit === "diaria"
        ? "/diária"
        : "";

  const imageUrl = propertyImages[property.type];

  return (
    <article className={styles.card}>
      {/* FOTO DO IMÓVEL */}
      <div className={styles.imageArea}>
        <div
          role="img"
          aria-label={`Foto ilustrativa de ${typeLabels[property.type]}`}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${imageUrl}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <span className={styles.purpose}>
          {purposeLabels[property.purpose]}
        </span>

        <span className={styles.imageLabel}>Imagem ilustrativa</span>
      </div>

      {/* INFORMAÇÕES DO IMÓVEL */}
      <div className={styles.content}>
        <span className={styles.type}>{typeLabels[property.type]}</span>

        <h2 className={styles.title}>{property.title}</h2>

        <p className={styles.location}>
          {property.neighborhood} · {property.city} - {property.state}
        </p>

        {/* CARACTERÍSTICAS */}
        <div className={styles.details}>
          <span>{property.area} m²</span>

          {property.bedrooms !== undefined && (
            <span>{property.bedrooms} quartos</span>
          )}

          {property.bathrooms !== undefined && (
            <span>{property.bathrooms} banheiros</span>
          )}
        </div>

        {/* PREÇO */}
        <div className={styles.price}>
          <strong>{formatPrice(property.price)}</strong>

          <span>{priceSuffix}</span>
        </div>
      </div>
    </article>
  );
}
