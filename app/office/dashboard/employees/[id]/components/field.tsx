import { Field } from "formik";

type FieldProps = {
  children?: React.ReactNode[];
  className?: string;
  id: string;
  type?: string;
  text: string;
  data: any;
  placeholder?: string;
  editing: boolean;
}

const TextField = ({ className, id, text, data, editing, placeholder, }: FieldProps) => (
  <Field
    className={`w-3/5 text-center ${className}`}
    id={id}
    name={id}
    value={data}
    placeholder={placeholder}
    disabled={!editing || text.includes("Password")}
  />
);

const DateField = ({ className, id, data, editing, }: FieldProps) => (
  <Field
    className={`w-3/5 text-center ${className}`}
    type={"date"}
    id={id}
    name={id}
    value={data}
    disabled={!editing}
  />
);

const CheckboxField = ({ className, id, data, editing, }: FieldProps) => (
  <Field
    className={`w-1/5 text-center ${className}`}
    type={"checkbox"}
    id={id}
    name={id}
    disabled={!editing}
    checked={data}
  />
);

const SelectField = ({ className, id, data, editing, children }: FieldProps) => (
  <Field {...{
    className: `w-3/4 text-center ${className}`,
    as: "select",
    id: id,
    name: id,
    value: data,
    disabled: !editing
  }} >
    {children}
  </Field>
)

const SelectFieldType = (props: FieldProps) => {
  switch (props.type) {
    case "checkbox": return <CheckboxField {...props} />
    case "date": return <DateField {...props} />
    case "select": return <SelectField {...props} />
    default: return <TextField {...props} />
  }
}

const CustomField = (props: FieldProps) => (
  <label className={`px-2 border border-black rounded-full ${props.className} flex justify-around items-center h-full`} htmlFor={props.id}>
    <span className="text-lg font-semibold">{props.text}: </span>
    <SelectFieldType {...{
      ...props,
      className: `${props.className} border-black rounded-full px-4 focus:outline-none focus:border-x-2`
    }} />
  </label>
);

export default CustomField;
