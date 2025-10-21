"use server"
import axios from "axios";
import EmployeeForm from "./components/form";

const EmployeePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  let employee;
  if (id === "new") {
    employee = {
      name: "",
      age: 0,
      number: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: ""
      },
      ssn: "",
      emergency_contacts: [],
      birthdate: new Date().toISOString().slice(0, 10),
      employment: {
        pay_rate: 10,
        position: "Crew Member"
      },
      office_info: {
        access: false,
      }
    }
  } else {
    employee = (await (await axios.get(`http://localhost:3000/office/api/employees/${id}`)).data).employee;
  }

  return <EmployeeForm employee={employee} />
}

export default EmployeePage;
