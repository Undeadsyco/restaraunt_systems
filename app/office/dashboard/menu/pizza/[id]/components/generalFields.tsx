import { Field } from "formik";

type Props = {
  sections: DataBase.Menu.ISection[];
  editing: boolean;
}

const GeneralFields = ({ sections, editing }: Props) => (
  <div className="flex justify-around pt-2">
    <label htmlFor="name" className="w-2/5 inline-flex justify-between items-center pl-6">
      <span className="bg-white px-6 bordered">Name:</span>
      <Field {...{
        form: "pizza",
        className: "w-2/3 bg-white bordered text-center focus:outline-none focus:border-x-2",
        name: "name",
        id: "name",
        disabled: !editing
      }} />
    </label>
    <label htmlFor="section" className="w-2/5 inline-flex justify-between items-center pl-2">
      <span className="bg-white px-6 bordered ">Section:</span>
      <Field {...{
        form: "pizza",
        className: "w-2/3 bg-white bordered text-center focus:outline-none focus:border-x-2 disabled:opacity-100 h-7",
        as: "select",
        name: "section",
        id: "section",
        disabled: !editing
      }}>
        <option value="" hidden disabled>Select A Section</option>
        {sections.map(s => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </Field>
    </label>
  </div>
)

export default GeneralFields;
