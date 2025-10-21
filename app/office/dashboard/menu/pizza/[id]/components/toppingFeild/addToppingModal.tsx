// Dependencies
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
// Components
import { Field } from "formik";
import { IconBtn } from "@/app/office/components";
// Icons
import { Pen, Plus, Trash } from "lucide-react";
import { Btn, Modal } from "@/app/components";
import { v4 } from "uuid";
import { IToppingItem, SetToppingItem } from ".";

type IPortion = DataBase.Menu.IPortion & { index?: number }

type ModalProps = {
  dough: DataBase.Menu.IDough[];
  toppings: DataBase.Menu.ITopping[];
  toppingItem: IToppingItem;
  setToppingItem: SetToppingItem;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  submit: (item: IToppingItem) => void;
}

const AddToppingsModal = ({ dough, toppings, toppingItem, setToppingItem, setModalVisible, submit }: ModalProps) => {
  const [portion, setPortion] = useState<IPortion>({ sizes: [], portion: 0 });

  const resetModal = () => {
    setPortion({ sizes: [], portion: 0 });
    setToppingItem({ index: "", item: "", portions: [] });
  }

  const addSize = (size: string) => {
    if (size) setPortion(prev => ({ ...prev, sizes: [...prev.sizes, size] }));
  }

  const addPortion = () => {
    if (portion.sizes.length > 0 && portion.portion > 0) {
      if (portion.index === undefined) {
        setToppingItem(prev => ({ ...prev, portions: [...prev.portions, portion] }));
      } else {
        setToppingItem(prev => ({ ...prev, portions: prev.portions.toSpliced(portion.index!, 1, portion) }))
      }
      setPortion({ sizes: [], portion: 0 });
    }
  }

  const addItem = () => {
    if (toppingItem.item && toppingItem.portions.length > 0) {
      submit(toppingItem);
      resetModal();
    }
  }

  const closeModal = () => {
    resetModal();
    setModalVisible(false);
  }

  return (
    <Modal >
      <div className="w-1/2 h-2/3 bg-white bordered p-2 flex flex-col justify-between items-center">
        <h3 className="w-full text-center bordered h-[10%]">Add Topping</h3>
        {/* Topping Select */}
        <div className="w-full h-[10%] bordered flex justify-around">
          <p>Topping:</p>
          <select {...{
            className: "bordered border-y-0 focus:outline-none",
            name: "topping",
            value: toppingItem.item as string,
            onChange: (e: ChangeEvent<HTMLSelectElement>) => setToppingItem(prev => ({ ...prev, item: e.target.value })),
          }}>
            <option value="" hidden disabled>Select A Topping</option>
            {toppings.map(t => (
              <option key={t._id} value={t._id}>{t.name}</option>
            ))}
          </select>
        </div>
        {/* size and portioning */}
        <div className="w-full bordered h-[60%]">
          {/* Select Size */}
          <div className="h-[15%] flex justify-around border-b-2 border-black">
            <h3>Set Portions</h3>
            <span className="inline-flex w-[35%] justify-between">
              <select
                className="bordered border-y-0 focus:outline-none"
                name="size"
                id="size"
                onChange={(e) => addSize(e.target.value)}
              >
                <option value="">Select Size</option>
                {dough.map(d => (
                  <option key={d._id} value={d._id}>{d.name}</option>
                ))}
              </select>
            </span>
          </div>
          {/* List selected sizes and add portion */}
          <div className="h-[15%] border-b-2 border-black grid grid-cols-4 px-2 text-center content-center justify-items-center">
            <span className="col-span-2">
              {portion.sizes.map((s, i) => (
                <span key={s as string}>
                  {i === 0
                    ? <span key={s as string}>{dough.find(d => d._id === s)?.abbreviation} </span>
                    : <span key={s as string}> / {dough.find(d => d._id === s)?.abbreviation} </span>
                  }
                  <IconBtn onClick={() => setPortion(prev => ({ ...prev, sizes: prev.sizes.toSpliced(i, 1) }))} Icon={Trash} />
                </span>
              ))}
            </span>
            {portion.sizes.length > 0 && (
              <span className="col-span-1">
                <span>Amount: </span>
                <input
                  className="inline-block w-20 text-center bordered focus:outline-none"
                  type="number"
                  name="cost"
                  id="cost"
                  value={portion.portion}
                  onChange={(e) => setPortion(prev => ({ ...prev, portion: parseFloat(e.target.value) }))}
                />
              </span>
            )}
            {(portion.sizes.length > 0 && portion.portion > 0) && (
              <IconBtn className="w-fit" onClick={addPortion} Icon={Plus} />
            )}
          </div>
          {/* display porion sizes and amount */}
          <div className="h-[70%] grid grid-cols-3 w-full p-2 gap-2">
            {toppingItem.portions.map((p, i) => (
              <span key={v4()} className="bordered inline-flex flex-col justify-between items-center">
                <div className="h-3/4 flex flex-col items-center">
                  {p.sizes.map(s => (
                    <div key={s as string}>{dough.find(d => d._id === s)?.abbreviation}</div>
                  ))}
                </div>
                <div>{p.portion} {toppings.find(t => t._id === toppingItem.item)?.measurement}</div>
                <span>
                  <IconBtn Icon={Pen} onClick={() => setPortion({ index: i, ...p })} />
                  <IconBtn Icon={Trash} onClick={() => setToppingItem(prev => ({ ...prev, portions: prev.portions.toSpliced(i, 1) }))} />
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="w-1/3 h-[10%] flex justify-between px-2">
          <Btn {...{ className: "bordered w-2/5 px-2", text: "Cancel", onClick: closeModal }} />
          <Btn {...{ className: "bordered w-2/5 px-2", text: "Add", onClick: addItem }} />
        </div>
      </div>
    </Modal>
  );
}

export default AddToppingsModal;
