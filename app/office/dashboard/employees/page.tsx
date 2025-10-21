
import axios from "axios";
// Components
import { LinkBtn } from "@/app/components";
import ComponentMapper from "@/app/components/componentMaper";

const EmployeeRow = (employee: DataBase.People.IEmployee) => {
  const { _id, name, employment, pos_info, office_info } = employee
  return (
    <tr className="first:border-t-2 border-b-2 border-black truncate">
      <td>{name}</td>
      <td>{employment.position}</td>
      <td>{`$${employment.pay_rate.toFixed(2)}`}</td>
      <td>{employment.id}</td>
      <td>{new Date(employment.start_date).toUTCString().slice(5, 16)}</td>
      <td>{pos_info.access.toString()}</td>
      <td>{office_info?.access ? "yes" : "no"}</td>
      <td className="flex justify-around items-center">
        <LinkBtn
          className="border-x-2 border-black px-2 rounded-full"
          href={`/office/dashboard/employees/${_id}`}
          text="Details"
        />
      </td>
    </tr>
  )
}

const getEmployees = async () => {
  const res = await axios.get("http://localhost:3000/office/api/employees");
  if (res.status !== 200) throw new Error("Unable to fetch employees");

  return (await res.data).employees;
}

export default async function EmployeesPage() {
  const employees = await getEmployees();

  return (
    <div className="col-span-full row-span-full text-black p-4 relative">
      <table className="bg-blue-300 text-center w-full">
        <colgroup span={1}>
          <col className="border-2 border-black border-b-0" />
          <col className="border-2 border-black border-b-0" />
          <col className="border-2 border-black border-b-0" />
          <col className="border-2 border-black border-b-0" />
          <col className="border-2 border-black border-b-0" />
          <col className="border-2 border-black border-b-0" />
          <col className="border-2 border-black border-b-0" />
          <col className="border-2 border-black border-b-0" />
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Pay Rate</th>
            <th>Emp ID</th>
            <th>Start Date</th>
            <th>POS Access</th>
            <th>Office Access</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <ComponentMapper Component={EmployeeRow} data={employees} />
        </tbody>
      </table>

      <div className="bottom-2 absolute left-[37.5%] w-1/4 grid grid-cols-2 gap-6 px-6">
        <LinkBtn
          className="border-2 border-green-800 py-2 px-4 rounded-full text-white bg-green-600"
          href="/office/dashboard"
          text="Back"
        />
        <LinkBtn
          className="border-2 border-green-800 py-2 px-4 rounded-full text-white bg-green-600"
          href={`/office/dashboard/employees/new`}
          text="Add New"
        />
      </div>
    </div>
  )
}
