import { icons } from "@phosphor-icons/core";
import { type Field, deepMerge } from "payload";

type IconField = (overrides?: Partial<Field>) => Field;

const iconField: IconField = (overrides = {}) =>
  deepMerge(
    {
      name: "icon",
      label: "Icon",
      type: "select",
      interfaceName: "Icons",
      options: icons.map((icon) => icon.pascal_name),
      required: true,
    },
    overrides,
  );

export { iconField };
