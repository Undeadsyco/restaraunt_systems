"use client"
// Dependencies
import axios from "axios";
import { useEffect, useState } from "react";
// Components
import EditToppingForm from "./editForm";
import AddToppingForm from "./addForm";
import ToppingFiltersForm from "./filtersForm";
import { DeleteModal } from "@/app/office/components";
// Utils
import {
  sortByMeasurementAsc,
  sortByMeasurementDsc,
  sortByNameAsc,
  sortByNameDsc,
  sortByPriceAsc,
  sortByPriceDsc,
  sortByTypeAsc,
  sortByTypeDsc
} from "@/utils";
import { LinkBtn } from "@/app/components";

export type Filters = Omit<DataBase.Menu.ITopping, "_id"> & {
  sortBy: string;
  order: string;
}

export type ModalProps = { display: boolean, id: string }

const ToppingPage = ({ toppings }: { toppings: DataBase.Menu.ITopping[] }) => {
  const [list, setList] = useState(toppings);
  const [filters, setFilters] = useState<Filters | undefined>(undefined);
  const [{ display, id }, setModalProps] = useState<ModalProps>({ display: false, id: "" });

  useEffect(() => {
    if (filters) {
      const { name, type, measurement, price, sortBy, order } = filters;
      if (name) setList(prev => prev.filter(t => t.name.toLowerCase().includes(name)));
      if (type) setList(prev => prev.filter(t => t.type === type));
      if (measurement) setList(prev => prev.filter(t => t.measurement === measurement));
      if (price >= 0) setList(prev => prev.filter(t => t.price === price));
      switch (sortBy) {
        case "name":
          setList(prev => order === "asc" ? sortByNameAsc(prev) : sortByNameDsc(prev));
          break;
        case "type":
          setList(prev => order === "asc" ? sortByTypeAsc(prev) : sortByTypeDsc(prev));
          break;
        case "measurement":
          setList(prev => order === "asc" ? sortByMeasurementAsc(prev) : sortByMeasurementDsc(prev));
          break;
        case "price":
          setList(prev => order === "asc" ? sortByPriceAsc(prev) : sortByPriceDsc(prev));
          break;
      }
    } else {
      setList(toppings);
    }
  }, [toppings, filters]);

  const onDelete = async () => {
    const req = await axios.delete(`/office/api/topping?id=${id}`);
    const res = await req.data;
    if (req.status !== 200) alert("Was unable to delete topping");
    setList(prev => {
      const i = prev.findIndex(t => t._id === res.id);
      if (i < 0) return prev;
      return prev.toSpliced(i, 1);
    });
    setModalProps({ display: false, id: "" });
    alert("Topping was deleted successfully");
  }

  return (
    <>
      {display && (
        <DeleteModal {...{
          onDelete,
          onClose: () => setModalProps({ display: false, id: "" }),
        }} />
      )}
      <ToppingFiltersForm {...{ setFilters }} />
      <div className="col-span-full row-span-8 overflow-x-auto ml-4">
        <table className="bordered w-full text-center content-center">
          <colgroup>
            <col className="bordered" />
            <col className="bordered" />
            <col className="bordered" />
            <col className="bordered" />
          </colgroup>
          <thead>
            <tr className="text-2xl font-bold h-8">
              <th>Name</th>
              <th>Type</th>
              <th>Measurement</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(topping => (
              <EditToppingForm key={topping._id} {...{ topping, setList, setModalProps }} />
            ))}
          </tbody>
        </table>
      </div>
      <AddToppingForm {...{ setList }} />
      <div className="bordered rounded-b-lg rounded-t-none col-span-full p-2 py-1">
        <div className="flex items-center bg-green-400 h-full bordered">
          <LinkBtn {...{ className: "bordered w-[80px] mx-auto bg-white", text: "Back", href: "/office/dashboard/menu" }} />
          {/* <LinkBtn {...{ className: "bordered w-[80px] mx-auto", text: "Back", href: "/office/bashboard/menu"}} /> */}
          {/* <LinkBtn {...{ className: "bordered w-[80px] mx-auto", text: "Back", href: "/office/bashboard/menu"}} /> */}
        </div>
      </div>
    </>
  )
}

export default ToppingPage;
