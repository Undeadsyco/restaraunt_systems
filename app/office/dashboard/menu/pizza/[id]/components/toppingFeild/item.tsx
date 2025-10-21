// Dependencies
import { v4 } from "uuid";
// Components
import { IconBtn } from "@/app/office/components";
// Icons
import { ArrowDown, ArrowUp, Pen, Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type ToppingItemProps = {
  topping: DataBase.Menu.ITopping;
  dough: DataBase.Menu.IDough[];
  portions: DataBase.Menu.IPortion[];
}

const Topping = ({ topping: { name, measurement, type }, dough, portions }: ToppingItemProps) => (
  <>
    <div className="col-span-2 bg-white w-3/4 px-2 bordered border-y-0 text-center">{name}</div>
    <div className="bg-white w-full bordered border-y-0 text-center">{type}</div>
    <div className="col-span-7 w-full flex justify-around items-center text-sm">
      {portions.map(p => (
        <span key={v4()} className="bg-white first:w-[30%] w-[30%] last:w-[20%] pl-4 bordered border-y-0 h-full flex items-center">
          {p.sizes.map((s, i) => (
            i === 0
              ? <span key={s as string}>{dough.find(d => d._id === s)?.abbreviation}</span>
              : <span key={s as string}>/{dough.find(d => d._id === s)?.abbreviation}</span>
          ))}
          <span> - {p.portion} {measurement}</span>
        </span>
      ))}
    </div>
  </>
)

export default Topping;
