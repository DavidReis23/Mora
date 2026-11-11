"use client";

import { useState } from "react";

type CurrencyInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function CurrencyInput({
  id,
  value,
  onChange,
}: CurrencyInputProps) {
  const [focused, setFocused] = useState(false);

  const displayValue = focused
    ? value
    : value
      ? currencyFormatter.format(Number(value))
      : "";

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      placeholder="R$ 0,00"
      value={displayValue}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={(event) => {
        const digits = event.target.value.replace(/\D/g, "");
        onChange(digits);
      }}
    />
  );
}
