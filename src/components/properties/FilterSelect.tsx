"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./FilterSelect.module.css";

type Option = {
  value: string;
  label: string;
};

type FilterSelectProps = {
  id: string;
  label: string;
  value: string;
  allLabel: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function FilterSelect({
  id,
  label,
  value,
  allLabel,
  options,
  onChange,
}: FilterSelectProps) {
  const selectedValue = value || "__all__";

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? allLabel;

  function handleChange(selected: string) {
    onChange(selected === "__all__" ? "" : selected);
  }

  return (
    <>
      <label htmlFor={id} id={`${id}-label`}>
        {label}
      </label>

      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger
          id={id}
          type="button"
          className={styles.trigger}
          aria-labelledby={`${id}-label ${id}-value`}
        >
          <span id={`${id}-value`}>{selectedLabel}</span>

          <span className={styles.icon} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              className={styles.iconSvg}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.content}
            side="bottom"
            align="start"
            sideOffset={6}
          >
            <DropdownMenu.RadioGroup
              value={selectedValue}
              onValueChange={handleChange}
            >
              <DropdownMenu.RadioItem value="__all__" className={styles.item}>
                {allLabel}

                <DropdownMenu.ItemIndicator className={styles.indicator}>
                  ✓
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>

              {options.map((option) => (
                <DropdownMenu.RadioItem
                  key={option.value}
                  value={option.value}
                  className={styles.item}
                >
                  {option.label}

                  <DropdownMenu.ItemIndicator className={styles.indicator}>
                    ✓
                  </DropdownMenu.ItemIndicator>
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
}
