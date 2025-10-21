import { Field, Form, Formik } from "formik"
import { MeasurementField, NameField, PriceField, TypeField } from "./fields"
import { Dispatch, SetStateAction } from "react"
import { Filters } from "."
import { IconBtn } from "@/app/office/components"
import { Check, Undo } from "lucide-react"

type Props = {
  setFilters: Dispatch<SetStateAction<Filters | undefined>>
}

const ToppingFiltersForm = ({ setFilters }: Props) => (
  <Formik
    initialValues={{ name: "", type: "", measurement: "", price: -1, sortBy: "type", order: "asc" }}
    onSubmit={(values) => setFilters(values)}
    onReset={() => setFilters(undefined)}
  >
    {({ handleReset, handleSubmit }) => (
      <Form className="col-span-full bordered rounded-t-lg flex items-center justify-between bg-green-400 px-2">
        <NameField />
        <TypeField />
        <MeasurementField />
        <label htmlFor="price" className="inline-block h-7 bordered pl-4 bg-white">
          <span>Price: </span>
          <PriceField />
        </label>
        <label htmlFor="sortBy">
          <Field as="select" name="sortBy" className="inline-block h-7 bordered border-y-0 focus:outline-none px-2">
            <option value="name">Name</option>
            <option value="type">Type</option>
            <option value="measurement">Measurement</option>
            <option value="price">Price</option>
          </Field>
        </label>
        <label htmlFor="order" className="inline-flex w-32 h-7 justify-between bg-white bordered px-2">
          <label htmlFor="asc">
            <span>Asc: </span>
            <Field type="radio" className="" name="order" value="asc" />
          </label>
          <label htmlFor="dsc">
            <span>Dsc: </span>
            <Field type="radio" className="" name="order" value="dsc" />
          </label>
        </label>
        <div className="w-20 flex justify-around bg-white bordered">
          <IconBtn {...{ onClick: handleReset, Icon: Undo, }} />
          <IconBtn {...{ onClick: handleSubmit, Icon: Check }} />
        </div>
      </Form>
    )}
  </Formik>
)

export default ToppingFiltersForm;
