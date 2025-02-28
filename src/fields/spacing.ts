import { type Field, deepMerge } from "payload";

type SpacingField = (overrides?: Partial<Field>) => Field;

export const SpacingList = [
  { label: "xxs", value: "py-4" },
  { label: "xs", value: "py-8" },
  { label: "sm", value: "py-16" },
  { label: "base", value: "py-24" },
  { label: "lg", value: "py-32" },
  { label: "xl", value: "py-48" },
  { label: "xxl", value: "py-64" },
  { label: "none", value: "" },
];

export const spacingField: SpacingField = (overrides = {}) =>
  deepMerge(
    {
      name: "spacing",
      label: "Spacing",
      type: "select",
      interfaceName: "SpacingType",
      options: SpacingList,
      defaultValue: "py-4",
      required: true,
    },
    overrides,
  );
