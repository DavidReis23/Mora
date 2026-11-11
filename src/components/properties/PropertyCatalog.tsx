"use client";

import { useMemo, useState } from "react";

import type { Property } from "@/types/property";
import type { PropertyFilterValues } from "@/types/propertyFilter";
import { nearbyCities } from "@/constants/nearbyCities";

import PropertyCard from "./PropertyCard";
import PropertyFilters from "./PropertyFilters";

import styles from "../properties/PropertyCatalog.module.css";

type PropertyCatalogProps = {
  properties: Property[];
};

const initialFilters: PropertyFilterValues = {
  search: "",
  city: "",
  neighborhood: "",
  type: "",
  purpose: "",
  minPrice: "",
  maxPrice: "",
  includeNearby: false,
};

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function PropertyCatalog({ properties }: PropertyCatalogProps) {
  const [filters, setFilters] = useState<PropertyFilterValues>(initialFilters);

  function updateFilters(values: Partial<PropertyFilterValues>) {
    setFilters((previous) => ({
      ...previous,
      ...values,
    }));
  }

  function clearFilters() {
    setFilters(initialFilters);
  }

  const cities = useMemo(() => {
    return [...new Set(properties.map((item) => item.city))].sort((a, b) =>
      a.localeCompare(b, "pt-BR"),
    );
  }, [properties]);

  const nearby = useMemo(() => {
    if (!filters.includeNearby || !filters.city) {
      return [];
    }

    return nearbyCities[filters.city] ?? [];
  }, [filters.includeNearby, filters.city]);

  const neighborhoods = useMemo(() => {
    return [
      ...new Set(
        properties
          .filter(
            (item) =>
              !filters.city ||
              item.city === filters.city ||
              nearby.includes(item.city),
          )
          .map((item) => item.neighborhood),
      ),
    ].sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [properties, filters.city, nearby]);

  const invalidPriceRange =
    filters.minPrice !== "" &&
    filters.maxPrice !== "" &&
    Number(filters.minPrice) > Number(filters.maxPrice);

  const filteredProperties = useMemo(() => {
    if (invalidPriceRange) {
      return [];
    }

    const search = normalizeText(filters.search.trim());

    return properties.filter((property) => {
      // Busca por nome ou localização
      const searchableText = normalizeText(
        [property.title, property.city, property.neighborhood].join(" "),
      );

      if (search && !searchableText.includes(search)) {
        return false;
      }

      // Cidade selecionada ou municípios próximos
      if (
        filters.city &&
        property.city !== filters.city &&
        !nearby.includes(property.city)
      ) {
        return false;
      }

      // Bairro
      if (
        filters.neighborhood &&
        property.neighborhood !== filters.neighborhood
      ) {
        return false;
      }

      // Tipo de imóvel
      if (filters.type && property.type !== filters.type) {
        return false;
      }

      // Finalidade
      if (filters.purpose && property.purpose !== filters.purpose) {
        return false;
      }

      // Preço mínimo
      if (
        filters.minPrice !== "" &&
        property.price < Number(filters.minPrice)
      ) {
        return false;
      }

      // Preço máximo
      if (
        filters.maxPrice !== "" &&
        property.price > Number(filters.maxPrice)
      ) {
        return false;
      }

      return true;
    });
  }, [properties, filters, nearby, invalidPriceRange]);

  return (
    <div>
      <PropertyFilters
        filters={filters}
        cities={cities}
        neighborhoods={neighborhoods}
        onChange={updateFilters}
        onClear={clearFilters}
        invalidPriceRange={invalidPriceRange}
      />

      <div className={styles.results}>
        <h2>Imóveis encontrados</h2>

        <span>
          {filteredProperties.length}{" "}
          {filteredProperties.length === 1
            ? "anúncio demonstrativo"
            : "anúncios demonstrativos"}
        </span>
      </div>

      {filteredProperties.length > 0 ? (
        <section className={styles.grid} aria-label="Resultados da busca">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </section>
      ) : (
        <div className={styles.emptyState}>
          <h3>Nenhum imóvel encontrado</h3>

          <p>
            {invalidPriceRange
              ? "Corrija os valores de preço para continuar."
              : "Tente alterar os filtros ou ampliar sua pesquisa."}
          </p>

          <button type="button" onClick={clearFilters}>
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
