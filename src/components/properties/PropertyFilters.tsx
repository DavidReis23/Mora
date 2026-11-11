import type { PropertyFilterValues } from "@/types/propertyFilter";
import FilterSelect from "./FilterSelect";
import CurrencyInput from "./CurrencyInput";

import styles from "./PropertyFilters.module.css";

type PropertyFiltersProps = {
  filters: PropertyFilterValues;
  cities: string[];
  neighborhoods: string[];
  onChange: (values: Partial<PropertyFilterValues>) => void;
  onClear: () => void;
  invalidPriceRange: boolean;
};

const purposeOptions = [
  { value: "venda", label: "Comprar" },
  { value: "aluguel", label: "Alugar" },
  { value: "evento", label: "Locação para eventos" },
];

const typeOptions = [
  { value: "casa", label: "Casa" },
  { value: "apartamento", label: "Apartamento" },
  { value: "terreno", label: "Terreno" },
  { value: "chacara", label: "Chácara" },
  { value: "espaco_eventos", label: "Espaço para eventos" },
];

export default function PropertyFilters({
  filters,
  cities,
  neighborhoods,
  onChange,
  onClear,
  invalidPriceRange,
}: PropertyFiltersProps) {
  return (
    <section className={styles.panel} aria-labelledby="filters-title">
      <div className={styles.heading}>
        <div>
          <h2 id="filters-title">Encontre seu imóvel</h2>
          <p>
            Utilize os filtros para encontrar oportunidades que combinam com
            você.
          </p>
        </div>

        <button type="button" className={styles.clearButton} onClick={onClear}>
          Limpar filtros
        </button>
      </div>

      <div className={styles.fields}>
        <div className={`${styles.field} ${styles.searchField}`}>
          <label htmlFor="propertySearch">O que você procura?</label>

          <input
            id="propertySearch"
            type="search"
            placeholder="Ex.: casa no Centro"
            value={filters.search}
            onChange={(event) => onChange({ search: event.target.value })}
          />
        </div>

        <div className={styles.field}>
          <FilterSelect
            id="propertyCity"
            label="Cidade"
            value={filters.city}
            allLabel="Todas as cidades"
            options={cities.map((city) => ({
              value: city,
              label: city,
            }))}
            onChange={(city) =>
              onChange({
                city,
                neighborhood: "",
                includeNearby: false,
              })
            }
          />
        </div>

        <div className={styles.field}>
          <FilterSelect
            id="propertyNeighborhood"
            label="Bairro"
            value={filters.neighborhood}
            allLabel="Todos os bairros"
            options={neighborhoods.map((neighborhood) => ({
              value: neighborhood,
              label: neighborhood,
            }))}
            onChange={(neighborhood) => onChange({ neighborhood })}
          />
        </div>

        <div className={styles.field}>
          <FilterSelect
            id="propertyPurpose"
            label="Finalidade"
            value={filters.purpose}
            allLabel="Todas as finalidades"
            options={purposeOptions}
            onChange={(purpose) =>
              onChange({
                purpose: purpose as PropertyFilterValues["purpose"],
              })
            }
          />
        </div>

        <div className={styles.field}>
          <FilterSelect
            id="propertyType"
            label="Tipo de imóvel"
            value={filters.type}
            allLabel="Todos os tipos"
            options={typeOptions}
            onChange={(type) =>
              onChange({
                type: type as PropertyFilterValues["type"],
              })
            }
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="minPrice">Preço mínimo</label>

          <CurrencyInput
            id="minPrice"
            value={filters.minPrice}
            onChange={(minPrice) => onChange({ minPrice })}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="maxPrice">Preço máximo</label>

          <CurrencyInput
            id="maxPrice"
            value={filters.maxPrice}
            onChange={(maxPrice) => onChange({ maxPrice })}
          />
        </div>
      </div>

      <p className={styles.priceHint}>
        Valores de venda são totais; aluguéis residenciais são mensais e
        locações para eventos são por diária.
      </p>

      <div className={styles.footer}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={filters.includeNearby}
            disabled={!filters.city}
            onChange={(event) =>
              onChange({
                includeNearby: event.target.checked,
                neighborhood: "",
              })
            }
          />

          <span>Incluir imóveis de cidades próximas</span>
        </label>

        {!filters.city && (
          <span className={styles.hint}>
            Selecione uma cidade para ativar essa opção.
          </span>
        )}
      </div>

      {invalidPriceRange && (
        <p className={styles.error} role="alert">
          O preço mínimo não pode ser maior que o máximo.
        </p>
      )}
    </section>
  );
}
