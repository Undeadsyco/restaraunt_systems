import { ReactNode } from "react";
import { ErrorMessage, Field } from "formik";

type FieldProps = { 
  name: string; 
  id: string; 
  type?: string; 
  placeholder: string; 
  children?: ReactNode | ReactNode[];
}

const CustomField = ({ name, id, type, placeholder, children }: FieldProps) => (
  <label
    className="border-2 border-black inline-black w-4/5 font-semibold text-lg flex justify-between items-center bg-white rounded-full pl-2 relative"
    htmlFor={id}
  >
    <h3 className="text-2xl">{name}:</h3>
    <Field
      className="w-3/4 rounded-full h-10 text-center focus:outline-none focus:border-x-2 border-black"
      type={type ?? "text"}
      name={id}
      id={id}
      placeholder={placeholder}
      spellCheck={false}
    />
    {/* <ErrorMessage name={id} className="text-red-500" /> */}
    {children}
  </label>

);

export default CustomField;
