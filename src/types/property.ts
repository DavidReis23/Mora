export type PropertyType =
  | "casa"
  | "apartamento"
  | "terreno"
  | "chacara"
  | "espaco_eventos";

export type PropertyPurpose = "venda" | "aluguel" | "evento";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  purpose: PropertyPurpose;

  city: string;
  state: string;
  neighborhood: string;

  price: number;
  priceUnit?: "mes" | "diaria";

  area: number;
  bedrooms?: number;
  bathrooms?: number;
}
