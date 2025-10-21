// Dependencies
import { Dispatch, SetStateAction } from "react";
// Components
import { Btn } from "@/app/components";
import type { Filters } from ".";

type FiltersProps = {
  sections: DataBase.Menu.ISection[];
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>
  clearFilters: () => void;
}

const TableFilters = ({ sections, filters, setFilters, clearFilters }: FiltersProps) => (
  <div className="col-span-full row-start-1 flex justify-around items-center text-black bordered rounded-md bg-green-400 border-green-800">
    <select
      name="sections"
      id="sections"
      className="bordered p-1 px-6"
      value={filters.section}
      onChange={e => setFilters({ ...filters, section: e.target.value })}
    >
      <option value="" disabled hidden>Select A Section</option>
      {sections.map(section => <option key={section._id} value={section.name}>{section.name}</option>)}
    </select>

    <div className="bg-white w-1/5 p-1 px-6 rounded-full bordered flex justify-between items-center">
      <span className="inline-flex items-center">
        Name:
        <input
          className="inline-block ml-1"
          type="radio"
          name="sortBy"
          id="name"
          onChange={() => setFilters({ ...filters, pizzas: "name" })}
          checked={filters.pizzas === "name"}
        />
      </span>
      <span className="inline-flex items-center">
        Topping #:
        <input
          className="inline-block ml-1"
          type="radio"
          name="sortBy"
          id="topping #"
          onChange={() => setFilters({ ...filters, pizzas: "topping #" })}
          checked={filters.pizzas === "topping #"}
        />
      </span>
    </div>

    <div className="bg-white w-1/4 p-1 px-6 bordered flex justify-between items-center">
      <span className="inline-flex items-center">
        Ascending:
        <input
          className="inline-block ml-1"
          type="radio"
          name="sortingOrder"
          id="ascending"
          onChange={() => setFilters({ ...filters, order: "asc" })}
          checked={filters.order === "asc"}
        />
      </span>
      <span className="inline-flex items-center">
        Descinding:
        <input
          className="inline-block ml-1"
          type="radio"
          name="sortingOrder"
          id="descending"
          onChange={() => setFilters({ ...filters, order: "dsc" })}
          checked={filters.order === "dsc"}
        />
      </span>
    </div>

    <Btn {...{ className: "bordered rounded-2xl p-1 px-6 bg-white", text: "Clear", onClick: clearFilters }} />
  </div>
);

export default TableFilters;
