// Dependencies
import { ChangeEvent, useState } from "react";
// Components
import { Field, FieldArray } from "formik";
import { IconBtn } from "@/app/office/components";
// Icons
import { ArrowLeft, ArrowRight, Icon, Pen, Plus, Trash } from "lucide-react";

type Props = {
  values: DataBase.Menu.IPizza;
  dough: DataBase.Menu.IDough[];
  editing: boolean;
}

const PricesField = ({ values, dough, editing }: Props) => {
  const [{ index, size, cost }, setPrice] = useState<{ index?: number } & DataBase.Menu.IPrice>({ size: "", cost: 0 });

  const addPrice = (push: <X = any>(obj: X) => void, replace: <X = any>(index: number, value: X) => void) => {
    if (index !== undefined) {
      replace(index, { size, cost });
    } else {
      push({ size, cost });
    }
    setPrice({ size: "", cost: 0 });
  }

  const onEdit = ({ index, size, cost }: { index: number } & DataBase.Menu.IPrice) => {
    setPrice({ index, size, cost })
  }

  return (
    <div className="bordered w-full h-[35%]">
      <FieldArray name="prices">
        {({ push, remove, move, replace }) => (
          <label htmlFor="prices">
            <div className="flex justify-between items-center h-[20%] px-6 rounded-t-xl">
              <span className="bg-white px-6 bordered">Prices:</span>
              {editing && (
                <div className="grid grid-cols-6 w-1/3 justify-items-center">
                  <Field
                    className="col-span-3 bordered px-2"
                    as="select"
                    name="dough"
                    value={size}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setPrice(prev => ({ ...prev, size: e.target.value }))}
                  >
                    <option value="" hidden disabled>Select A Size</option>
                    {dough.map(d => (
                      <option key={d._id} value={d._id}>{d.name}</option>
                    ))}
                  </Field>
                  {size && (
                    <Field
                      className="col-span-2 text-center w-2/3 bordered"
                      type="number"
                      name="cost"
                      value={cost}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(prev => ({ ...prev, cost: parseFloat(e.target.value) }))}
                      placeholder="Cost"
                    />
                  )}
                  {(size && cost > 0) && (
                    <IconBtn className="w-fit place-self-center bg-white" onClick={() => addPrice(push, replace)} Icon={Plus} />
                  )}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 grid-rows-2 h-[80%] p-2 gap-2 gap-x-6 bg-white rounded-xl border-t-2 border-black">
              {values.prices.map((p, i, list) => (
                <div key={p.size as string} className="inline-flex flex-wrap justify-between items-center bordered px-2 bg-green-400">
                  <div>
                    <span className="bg-white px-6 py-1 bordered text-xs">{dough.filter(d => d._id === p.size)[0]?.name}</span>
                  </div>
                  <div>
                    <span className="bg-white px-6 py-1 bordered text-xs">{p.cost.toFixed(2)}</span>
                  </div>
                  {editing && (
                    <div className="w-2/3 grid grid-cols-4 content-center justify-items-center bg-white bordered">
                      <IconBtn {...{ Icon: Pen, className: "col-start-1", onClick: () => onEdit({ index: i, ...p }) }} />
                      <IconBtn {...{ Icon: Trash, className: "col-start-2", onClick: () => remove(i) }} />
                      {i > 0 && (
                        <IconBtn Icon={ArrowLeft} className="col-start-3" onClick={() => move(i, i - 1)} />
                      )}
                      {i < list.length - 1 && (
                        <IconBtn Icon={ArrowRight} className="col-start-4" onClick={() => move(i, i + 1)} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </label>
        )}
      </FieldArray>
    </div>
  )
}

export default PricesField;
