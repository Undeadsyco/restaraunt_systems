// Dependencies
import { Dispatch, SetStateAction, useState } from "react";
// Components
import { FieldArray } from "formik";
import { IconBtn } from "@/app/office/components";
import AddToppingsModal from "./addToppingModal";
import Topping from "./item";
// Icons
import { ArrowDown, ArrowUp, Pen, Plus, Trash } from "lucide-react";

export type IToppingItem = DataBase.Menu.IToppingItem & { index: string }
export type SetToppingItem = Dispatch<SetStateAction<IToppingItem>>

type Props = {
  values: DataBase.Menu.IPizza;
  dough: DataBase.Menu.IDough[];
  toppings: DataBase.Menu.ITopping[];
  editing: boolean;
}

const ToppingField = ({ values, dough, toppings, editing }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [toppingItem, setToppingItem] = useState<IToppingItem>({ index: "", item: "", portions: [] });

  const onEdit = (item: IToppingItem) => {
    setToppingItem(item);
    setModalVisible(true);
  }

  return (
    <div className="bordered w-full h-[50%] p-2 bg-white">
      <FieldArray name="toppings">
        {({ push, remove, replace, move }) => (
          <span className="h-full">
            {modalVisible && (
              <AddToppingsModal {...{
                dough,
                toppings,
                toppingItem,
                setToppingItem,
                setModalVisible,
                submit: item => item.index ? replace(parseInt(item.index), { item: item.item, portions: item.portions }) : push(item)
              }} />
            )}
            <div className="flex justify-between items-center h-[15%] bg-green-400 rounded-t-lg px-6 border-2 border-b-0 border-black">
              <span className="bg-white px-6 rounded-full">Toppings:</span>
              {editing && (
                <IconBtn className="bg-white w-fit h-fit" onClick={() => setModalVisible(true)} Icon={Plus} />
              )}
            </div>
            <div className="grid grid-rows-[32px] gap-2 w-full max-h-[85%] border-black border-2 overflow-y-auto rounded-b-lg py-2">
              {values.toppings.map(({ item, portions }, index, list) => (
                <div key={item as string} className="grid grid-cols-12 h-8 justify-items-center bg-green-400 border-y-2 border-black">
                  <Topping {...{
                    topping: toppings.filter(t => t._id === item)[0],
                    dough,
                    portions,
                  }} />
                  {editing && (
                    <div className="col-span-2 grid grid-cols-4 w-4/5 content-center justify-items-center bg-white bordered border-y-0">
                      {index > 0 && (
                        <IconBtn Icon={ArrowUp} className="col-start-1" onClick={() => move(index, index - 1)} />
                      )}
                      {index < list.length - 1 && (
                        <IconBtn Icon={ArrowDown} className="col-start-2" onClick={() => move(index, index + 1)} />
                      )}
                      <IconBtn Icon={Pen} className="col-start-3" onClick={() => onEdit({ index: index.toString(), item, portions })} />
                      <IconBtn Icon={Trash} className="col-start-4" onClick={() => remove(index)} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </span>
        )}
      </FieldArray>
    </div>
  )
}

export default ToppingField;
