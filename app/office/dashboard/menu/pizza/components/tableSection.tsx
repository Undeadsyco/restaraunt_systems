// Dependencies
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
// Components
import { IconBtn } from "@/app/office/components";
// Icons
import { Pen, Trash } from "lucide-react";
// Types
import { ModalProps } from ".";

type TableSectionProps = {
  section: DataBase.Menu.ISection;
  dough: DataBase.Menu.IDough[];
  pizzas: DataBase.Menu.IPizza[];
  setModalProps: Dispatch<SetStateAction<ModalProps>>;
}

const TableSection = ({ section, dough, pizzas, setModalProps }: TableSectionProps) => {
  const router = useRouter();

  return (
    <>
      <tr className="h-12">
        <td className="bordered text-lg font-bold " colSpan={4}>
          <span className="bg-white bordered px-6 border-green-800">{section.name}</span>
        </td>
      </tr>
      <tr className="h-8">
        <td></td>
        <td></td>
        <td>
          <span className="w-[95%] inline-flex justify-between">
            {dough.map(d => (
              <span key={d.abbreviation} className="bg-white bordered px-2 border-green-800 w-20">
                {d.abbreviation}
              </span>
            ))}
          </span>
        </td>
        <td></td>
      </tr>
      {pizzas.map(pizza => (
        <tr key={pizza._id} className="bordered first:border-t-0 last:border-b-0 h-[50px]">
          <td className="border-black">
            <span className="bg-white bordered px-6 border-green-800">{pizza.name}</span>
          </td>
          <td>
            <span className="bg-white bordered px-6 border-green-800">{pizza.toppings.length}</span>
          </td>
          <td>
            <span className="inline-flex w-[95%] justify-between">
              {dough.map((d) => (
                <span key={d._id} className="bg-white flex flex-col justify-center py-1 px-2 bordered leading-none w-20">
                  ${pizza.prices.find(p => p.size === d._id)?.cost ?? "-"}
                </span>
              ))}
            </span>
          </td>
          <td>
            <span className="inline-flex w-2/3 justify-around items-center bg-white px-2 p-1 bordered border-green-800">
              <IconBtn {...{
                className: "text-green-500 hover:bg-green-400 hover:text-white",
                onClick: () => router.push(`pizza/${pizza._id}`),
                Icon: Pen
              }} />
              <IconBtn {...{
                className: "text-green-500 hover:bg-green-400 hover:text-white",
                onClick: () => setModalProps({ display: true, id: pizza._id }),
                Icon: Trash
              }} />
            </span>
          </td>
        </tr>
      ))}
    </>
  );
}

export default TableSection;
