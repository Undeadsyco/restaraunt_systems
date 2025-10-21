import { Field } from "formik";

type FieldProps = { form?: string; className?: string; disabled?: boolean }

export const NameField = ({ form, className, disabled = false }: FieldProps) => (
  <Field
    form={form}
    className={`bordered border-y-0 focus:outline-none text-center bg-white ${className}`}
    name="name"
    id="name"
    placeholder="Name"
    disabled={disabled}
  />
);

export const TypeField = ({ form, className, disabled = false }: FieldProps) => (
  <Field
    className={`bordered border-y-0 focus:outline-none py-1 px-2 bg-white disabled:opacity-100 ${className}`}
    form={form}
    as="select"
    name="type"
    disabled={disabled}
  >
    <option value="" hidden disabled>Select A Type</option>
    <option value="sauce">Sauce</option>
    <option value="meat">Meat</option>
    <option value="produce">Produce</option>
    <option value="seasoning">Seasoning</option>
    <option value="dessert">Dessert</option>
  </Field>
);

export const MeasurementField = ({ form, className, disabled = false }: FieldProps) => (
  <Field
    className={`bordered border-y-0 focus:outline-none py-1 px-2 bg-white disabled:opacity-100 ${className}`}
    form={form}
    as="select"
    name="measurement"
    disabled={disabled}
  >
    <option value="" hidden disabled>Select A Measurement</option>
    <option value="OZ">OZ</option>
    <option value="CUPS">CUPS</option>
    <option value="SLICES">SLICES</option>
    <option value="TBS">TBS</option>
  </Field>
);

export const PriceField = ({ form, className, disabled = false }: FieldProps) => (
  <Field
    className={`bordered border-y-0 focus:outline-none text-center w-16 bg-white ${className}`}
    form={form}
    type="number"
    name="price"
    id="price"
    placeholder="Price"
    disabled={disabled}
  />
)
