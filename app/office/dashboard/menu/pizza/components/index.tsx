"use client"
// Dependencies
import axios from "axios";
import { useEffect, useState } from "react";
// Components
import TableSection from "./tableSection";
import TableFilters from "./filters";
// Types
import { PizzaTableProps } from "../page";
import { DeleteModal } from "@/app/office/components";
import { useRouter, useSearchParams } from "next/navigation";
import { Btn } from "@/app/components";

export type Filters = {
  section: string;
  pizzas: ("" | "topping #" | "name");
  order: ("asc" | "dsc");
}

export type ModalProps = {
  display: boolean;
  id: string;
}

export default function PizzaTable({ sections, dough, pizzas }: PizzaTableProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [sectionList, setSectionList] = useState(sections);
  const [pizzaList, setPizzaList] = useState(pizzas);
  const [filters, setFilters] = useState<Filters>({ section: params.get("section") ?? "", pizzas: "", order: "asc" });
  const [{ display, id }, setModalProps] = useState<ModalProps>({ display: false, id: "" });

  useEffect(() => {
    setSectionList(sections.filter(s => filters.section ? s.name === filters.section : true));
    if (filters.pizzas === "name") {
      setPizzaList(pizzas.toSorted((a, b) => filters.order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
    } else if (filters.pizzas === "topping #") {
      setPizzaList(pizzas.toSorted((a, b) => (
        filters.order === "asc"
          ? a.toppings.reduce(prev => prev + 1, 0) - b.toppings.reduce(prev => prev + 1, 0)
          : b.toppings.reduce(prev => prev + 1, 0) - a.toppings.reduce(prev => prev + 1, 0)
      )))
    } else {
      setPizzaList(pizzas);
    }
  }, [sections, pizzas, filters]);

  const onDelete = async () => {
    try {
      const res = await axios.delete(`/office/api/pizza?id=${id}`);
      const data = await res.data;
      if (res.status !== 200) throw new Error();

      setPizzaList(prev => {
        const index = prev.findIndex(p => p._id === data.id);
        if (index === -1) return prev;
        return prev.toSpliced(index, 1);
      });
      setModalProps({ display: false, id: "" });
      alert("Pizza was deleted successfully");
    } catch (error) {
      alert("error occured when deleting pizza! please try again or contact support");
    }
  }

  const clearFilters = () => {
    setFilters({ section: "", pizzas: "", order: "asc" })
  }

  return (
    <>
      {display && (
        <DeleteModal {...{ onDelete, onClose: () => setModalProps({ display: false, id: "" }) }} />
      )}
      <TableFilters {...{ sections, filters, setFilters, clearFilters }} />
      <div className="col-span-full row-start-2 row-span-10 overflow-y-scroll pl-3">
        <table className=" text-black w-full h-auto text-center content-center bg-green-400">
          <colgroup>
            <col className="bordered w-[20%]" />
            <col className="bordered w-[15%]" />
            <col className="bordered w-[50%]" />
            <col className="bordered w-[15%]" />
          </colgroup>
          <thead>
            <tr className="text-xl font-bold h-16">
              <th>
                <span className="bg-white bordered px-6 border-green-800">Name</span>
              </th>
              <th>
                <span className="bg-white bordered px-6 border-green-800">Topping #</span>
              </th>
              <th>
                <span className="bg-white bordered px-6 border-green-800">Sizes</span>
              </th>
              <th>
                <span className="bg-white bordered px-6 border-green-800">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sectionList.map(section => {
              const list = pizzaList.filter(p => p.section === section._id);
              return list.length > 0 && (
                <TableSection key={section._id} {...{ section, dough, pizzas: list, setModalProps }} />
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center row-start-12 col-span-full px-6 bg-green-400 rounded-md border-2 border-green-800">
        <span className="flex justify-between items-center w-1/2">
          <Btn {...{ className: "bordered p-1 px-6 bg-white", text: "Back", onClick: () => router.back() }} />
          <Btn {...{ className: "bordered p-1 px-6 bg-white", text: "New", onClick: () => router.push("pizza/new") }} />
        </span>
      </div>
    </>
  )
}