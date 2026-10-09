import { useState, type ChangeEvent } from "react";
import { cn } from "../../utils/cn";
import { GroupButton } from "../Field/GroupButton";
import { SelectField } from "../Field/SelectField";
import { TextareaField } from "../Field/TextareaField";
import { TextField } from "../Field/TextField";
import { ToggleField } from "../Field/ToggleField";
import type { FieldSize, FieldVariant } from "../Field/_base";

export type SchemaFieldDefinition = {
  type?: string | string[];
  title?: string;
  description?: string;
  format?: string;
  enum?: unknown[];
  const?: unknown;
  oneOf?: SchemaFieldDefinition[];
  anyOf?: SchemaFieldDefinition[];
  any_of?: SchemaFieldDefinition[];
  variants?: SchemaFieldDefinition[];
  default?: unknown;
  required?: boolean | string[];
  minimum?: number;
  properties?: Record<string, SchemaFieldDefinition>;
};

export type SchemaFieldsDefinition = {
  properties?: Record<string, SchemaFieldDefinition>;
  required?: string[];
  oneOf?: SchemaFieldDefinition[];
  anyOf?: SchemaFieldDefinition[];
  any_of?: SchemaFieldDefinition[];
  variants?: SchemaFieldDefinition[];
};

export type SchemaFieldValue =
  | string
  | boolean
  | number
  | null
  | Record<string, unknown>
  | unknown[];

export type SchemaFieldsProps = {
  schema: SchemaFieldsDefinition;
  values: Record<string, SchemaFieldValue>;
  onChange: (name: string, value: SchemaFieldValue, selectedVariantType?: string) => void;
  fieldSize?: FieldSize;
  inputVariant?: FieldVariant;
  idPrefix?: string;
  disabled?: boolean;
  className?: string;
};

function fieldType(field: SchemaFieldDefinition) {
  if (Array.isArray(field.type)) {
    return field.type.find((candidate) => candidate !== "null") ?? "string";
  }
  return field.type ?? "string";
}

function humanizeFieldName(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function fieldLabel(name: string, field: SchemaFieldDefinition, required: boolean) {
  return `${field.title ?? humanizeFieldName(name)}${required ? " *" : ""}`;
}

function displayValue(value: unknown) {
  return typeof value === "string" ? value : JSON.stringify(value);
}

function enumEntry(entry: unknown, fallbackLabel?: string) {
  if (typeof entry === "object" && entry !== null && "value" in entry) {
    const value = (entry as { value: unknown }).value;
    const label = "label" in entry && typeof entry.label === "string" ? entry.label : fallbackLabel;
    return { value, label: label ?? String(value) };
  }
  return { value: entry, label: fallbackLabel ?? String(entry) };
}

function fieldChoices(field: SchemaFieldDefinition) {
  const choices: Array<{ value: unknown; label: string }> = [];
  const addEnum = (values: unknown[], fallbackLabel?: string) => {
    values.forEach((entry) => choices.push(enumEntry(entry, fallbackLabel)));
  };

  if (field.enum?.length) addEnum(field.enum);
  const variants = fieldVariants(field);
  variants?.forEach((variant) => {
    if (variant.enum?.length) {
      addEnum(variant.enum);
    } else if (Object.prototype.hasOwnProperty.call(variant, "const")) {
      choices.push({
        value: variant.const,
        label: variant.title ?? String(variant.const),
      });
    }
  });
  return choices;
}

function fieldVariants(field: SchemaFieldDefinition) {
  return field.oneOf ?? field.anyOf ?? field.any_of ?? field.variants ?? [];
}

function schemaProperties(field: SchemaFieldDefinition) {
  if (field.properties) return field.properties;
  return fieldVariants(field).find((variant) => variant.type === "object")?.properties;
}

function variantLabel(field: SchemaFieldDefinition) {
  if (field.title) return field.title;
  if (Object.prototype.hasOwnProperty.call(field, "const")) return String(field.const);
  if (field.enum?.length === 1) return String(enumEntry(field.enum[0]).label);
  const type = fieldType(field);
  return type === "string"
    ? "Text"
    : type.replaceAll("_", " ").replace(/^\w/, (c) => c.toUpperCase());
}

function matchesVariant(field: SchemaFieldDefinition, value: unknown) {
  if (Object.prototype.hasOwnProperty.call(field, "const")) return Object.is(field.const, value);
  if (field.enum) return field.enum.some((entry) => Object.is(enumEntry(entry).value, value));
  const type = fieldType(field);
  if (type === "number") return typeof value === "number";
  if (type === "integer") return typeof value === "number" && Number.isInteger(value);
  if (type === "string") return typeof value === "string";
  if (type === "boolean") return typeof value === "boolean";
  if (type === "object")
    return value !== null && typeof value === "object" && !Array.isArray(value);
  if (type === "array") return Array.isArray(value);
  return false;
}

function variantDefault(field: SchemaFieldDefinition): SchemaFieldValue {
  if (field.default !== undefined) return field.default as SchemaFieldValue;
  if (Object.prototype.hasOwnProperty.call(field, "const")) return field.const as SchemaFieldValue;
  if (field.enum?.length === 1) return enumEntry(field.enum[0]).value as SchemaFieldValue;
  const type = fieldType(field);
  if (type === "number" || type === "integer") return field.minimum ?? 0;
  if (type === "boolean") return false;
  if (type === "object") return {};
  if (type === "array") return [];
  return "";
}

function eventValue(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
) {
  return event.currentTarget.value;
}

/** Render JSON Schema properties using the shared lead/workflow field behavior. */
export function SchemaFields({
  schema,
  values,
  onChange,
  fieldSize = "sm",
  idPrefix = "schema-field",
  disabled = false,
  inputVariant = "default",
  className,
}: SchemaFieldsProps) {
  const [pendingVariantIndices, setPendingVariantIndices] = useState<Record<string, number>>({});
  const rootSchema = schema.properties
    ? schema
    : (fieldVariants(schema).find((variant) => variant.type === "object") ?? schema);
  return (
    <div className={cn("space-y-3", className)}>
      {Object.entries(rootSchema.properties ?? {}).map(([name, field]) => {
        const type = fieldType(field);
        const required =
          (Array.isArray(rootSchema.required) && rootSchema.required.includes(name)) ||
          field.required === true;
        const label = fieldLabel(name, field, required);
        const id = `${idPrefix}-${name}`;
        const value = values[name] ?? (type === "boolean" ? false : "");
        const variants = fieldVariants(field);
        const choices = fieldChoices(field);
        if (Object.prototype.hasOwnProperty.call(field, "const")) {
          return (
            <TextField
              key={name}
              id={id}
              label={label}
              hint={field.description}
              fieldSize={fieldSize}
              variant={inputVariant}
              value={String(field.const)}
              disabled
            />
          );
        }

        if (variants.length > 1) {
          const currentValue = values[name];
          const matchedIndex = variants.findIndex((variant) =>
            matchesVariant(variant, currentValue),
          );
          const pendingIndex = pendingVariantIndices[name];
          const variantIndex = pendingIndex ?? matchedIndex;
          const variant = variantIndex >= 0 ? variants[variantIndex] : undefined;
          const selectedValue = (currentValue ??
            (variant ? variantDefault(variant) : "")) as SchemaFieldValue;
          const variantType = variant ? fieldType(variant) : "string";
          const setVariant = (nextValue: string) => {
            const nextIndex = Number(nextValue);
            const nextVariant = variants[nextIndex];
            if (!nextVariant) return;
            setPendingVariantIndices((current) => ({ ...current, [name]: nextIndex }));
            onChange(name, variantDefault(nextVariant), fieldType(nextVariant));
          };
          const setVariantValue = (nextValue: SchemaFieldValue) =>
            onChange(name, nextValue, variantType);
          const nestedProperties = variant ? schemaProperties(variant) : undefined;
          const nestedValues =
            typeof selectedValue === "object" &&
            selectedValue !== null &&
            !Array.isArray(selectedValue)
              ? (selectedValue as Record<string, SchemaFieldValue>)
              : {};

          return (
            <div key={name} className="space-y-1.5">
              <span className="block text-xs font-medium text-gray-200">{label}</span>
              <div className="flex flex-col overflow-hidden border border-gray-700 bg-black focus-within:border-emerald-400">
                <div className="flex flex-wrap items-center border-b border-gray-700 bg-gray-950 px-0">
                  <GroupButton
                    options={variants.map((item, index) => ({
                      value: String(index),
                      label: variantLabel(item),
                    }))}
                    value={variantIndex < 0 ? "" : String(variantIndex)}
                    onChange={setVariant}
                    appearance="compact"
                    size="xs"
                    bordered={false}
                    ariaLabel={label}
                    disabled={disabled}
                  />
                </div>
                {variant ? (
                  <div className="space-y-2">
                    {nestedProperties && Object.keys(nestedProperties).length > 0 ? (
                      <SchemaFields
                        schema={{
                          properties: nestedProperties,
                          required: Array.isArray(variant.required) ? variant.required : [],
                        }}
                        values={nestedValues}
                        fieldSize={fieldSize}
                        inputVariant={inputVariant}
                        idPrefix={`${id}-variant`}
                        disabled={disabled}
                        onChange={(childName, childValue) =>
                          setVariantValue({ ...nestedValues, [childName]: childValue })
                        }
                      />
                    ) : Object.prototype.hasOwnProperty.call(variant, "const") ? (
                      <TextField
                        id={`${id}-variant-value`}
                        hint={variant.description}
                        fieldSize={fieldSize}
                        variant={inputVariant}
                        value={String(variant.const)}
                        disabled
                      />
                    ) : variantType === "boolean" ? (
                      <ToggleField
                        label={<span className="sr-only">{label}</span>}
                        description={variant.description}
                        checked={Boolean(selectedValue)}
                        onChange={(event) => setVariantValue(event.currentTarget.checked)}
                        disabled={disabled}
                        className="border-0 py-1"
                      />
                    ) : variantType === "object" || variantType === "array" ? (
                      <TextareaField
                        id={`${id}-variant-value`}
                        hint={variant.description}
                        fieldSize={fieldSize}
                        variant={inputVariant}
                        resize="vertical"
                        monospace
                        rows={3}
                        value={
                          typeof selectedValue === "string"
                            ? selectedValue
                            : JSON.stringify(selectedValue, null, 2)
                        }
                        onChange={(event) => setVariantValue(event.currentTarget.value)}
                        disabled={disabled}
                        placeholder={variantType === "array" ? "[]" : "{}"}
                      />
                    ) : (
                      <TextField
                        id={`${id}-variant-value`}
                        hint={variant.description}
                        fieldSize={fieldSize}
                        variant={inputVariant}
                        type={
                          variantType === "integer" || variantType === "number" ? "number" : "text"
                        }
                        step={
                          variantType === "integer"
                            ? "1"
                            : variantType === "number"
                              ? "any"
                              : undefined
                        }
                        value={
                          typeof selectedValue === "string" || typeof selectedValue === "number"
                            ? String(selectedValue)
                            : ""
                        }
                        onChange={(event) => setVariantValue(event.currentTarget.value)}
                        disabled={disabled}
                      />
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          );
        }

        if (
          variants.length === 0 &&
          schemaProperties(field) &&
          Object.keys(schemaProperties(field) ?? {}).length > 0
        ) {
          const nestedProperties = schemaProperties(field) ?? {};
          const nestedValue =
            typeof value === "object" && value !== null && !Array.isArray(value)
              ? (value as Record<string, SchemaFieldValue>)
              : {};
          return (
            <fieldset key={name} className="space-y-3 border-0 border-t border-gray-800 pt-3">
              <legend className="text-xs font-medium text-gray-200">{label}</legend>
              {field.description ? (
                <p className="text-xs text-gray-400">{field.description}</p>
              ) : null}
              <SchemaFields
                schema={{
                  properties: nestedProperties,
                  required: Array.isArray(field.required) ? field.required : [],
                }}
                values={nestedValue}
                fieldSize={fieldSize}
                inputVariant={inputVariant}
                idPrefix={`${id}-nested`}
                disabled={disabled}
                onChange={(childName, childValue) =>
                  onChange(name, { ...nestedValue, [childName]: childValue })
                }
              />
            </fieldset>
          );
        }

        if (choices.length) {
          const selectedIndex = choices.findIndex(
            (choice) => JSON.stringify(choice.value) === JSON.stringify(value),
          );
          return (
            <SelectField
              key={name}
              id={id}
              label={label}
              hint={field.description}
              fieldSize={fieldSize}
              value={selectedIndex >= 0 ? String(selectedIndex) : ""}
              onChange={(event) => {
                const choice = choices[Number(eventValue(event))];
                if (choice) onChange(name, choice.value as SchemaFieldValue);
              }}
              disabled={disabled}
              variant={inputVariant}
              options={[
                {
                  value: "",
                  label: required ? "Select…" : "Optional",
                  disabled: required,
                },
                ...choices.map((choice, index) => ({
                  value: String(index),
                  label: choice.label,
                })),
              ]}
            />
          );
        }

        if (variants.length) {
          const variantIndex = 0;
          const variant = variants[variantIndex];
          const variantType = fieldType(variant);
          const variantValue = values[name] ?? variantDefault(variant);
          const setVariantValue = (nextValue: SchemaFieldValue) =>
            onChange(name, nextValue, variantType);

          return (
            <div key={name} className="space-y-2">
              <SelectField
                id={`${id}-variant`}
                label={label}
                hint={field.description}
                fieldSize={fieldSize}
                value={String(variantIndex)}
                onChange={() => onChange(name, variantDefault(variant), variantType)}
                disabled={disabled}
                variant={inputVariant}
                options={variants.map((item, index) => ({
                  value: String(index),
                  label: item.title ?? item.description ?? fieldType(item).replaceAll("_", " "),
                }))}
              />
              {variantType === "boolean" ? (
                <ToggleField
                  label={variant.title ?? "Value"}
                  description={variant.description}
                  checked={Boolean(variantValue)}
                  onChange={(event) => setVariantValue(event.currentTarget.checked)}
                  disabled={disabled}
                  className="border-gray-800 py-2"
                />
              ) : variantType === "object" || variantType === "array" ? (
                <TextareaField
                  id={`${id}-value`}
                  label={variant.title ?? "Value"}
                  hint={variant.description}
                  fieldSize={fieldSize}
                  variant={inputVariant}
                  resize="vertical"
                  rows={3}
                  value={String(variantValue)}
                  onChange={(event) => setVariantValue(event.currentTarget.value)}
                  disabled={disabled}
                  placeholder={variantType === "array" ? "[]" : "{}"}
                />
              ) : (
                <TextField
                  id={`${id}-value`}
                  label={variant.title ?? "Value"}
                  hint={variant.description}
                  fieldSize={fieldSize}
                  variant={inputVariant}
                  type={variantType === "integer" || variantType === "number" ? "number" : "text"}
                  step={
                    variantType === "integer" ? "1" : variantType === "number" ? "any" : undefined
                  }
                  value={String(variantValue)}
                  onChange={(event) => setVariantValue(event.currentTarget.value)}
                  disabled={disabled}
                />
              )}
            </div>
          );
        }

        if (type === "boolean") {
          return (
            <ToggleField
              key={name}
              label={label}
              description={field.description}
              checked={Boolean(value)}
              onChange={(event) => onChange(name, event.currentTarget.checked)}
              disabled={disabled}
              className="border-gray-800 py-2"
            />
          );
        }

        if (type === "object" || type === "array" || field.format === "textarea") {
          return (
            <TextareaField
              key={name}
              id={id}
              label={label}
              hint={
                field.description ??
                (type === "array"
                  ? "Enter a JSON array."
                  : type === "object"
                    ? "Enter a JSON object."
                    : undefined)
              }
              fieldSize={fieldSize}
              variant={inputVariant}
              resize="vertical"
              monospace
              rows={type === "object" || type === "array" ? 3 : 2}
              value={typeof value === "string" ? value : displayValue(value)}
              onChange={(event) => onChange(name, event.currentTarget.value)}
              disabled={disabled}
              placeholder={type === "array" ? "[]" : type === "object" ? "{}" : undefined}
            />
          );
        }

        const inputType = type === "integer" || type === "number" ? "number" : "text";
        return (
          <TextField
            key={name}
            id={id}
            label={label}
            hint={field.description}
            fieldSize={fieldSize}
            variant={inputVariant}
            type={inputType}
            step={type === "integer" ? "1" : type === "number" ? "any" : undefined}
            value={typeof value === "string" ? value : displayValue(value)}
            onChange={(event) => onChange(name, event.currentTarget.value)}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
}
