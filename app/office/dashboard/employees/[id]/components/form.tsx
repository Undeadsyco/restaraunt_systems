"use client"

import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikProps, Field } from "formik";
import * as Yup from "yup";

import { Btn, LinkBtn } from "@/app/components";
import { OfficeInfoGroup, PosInfoGroup, EmployemntInfoGroup, GeneralInfoGroup } from "./groups";
import ErrorModal from "./errModal";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import BtnContainer from "./btns";

const validation = Yup.object<DataBase.People.IEmployee>({
  name: Yup.string().required(),
  age: Yup.number().required().positive().integer().min(18),
  number: Yup.string().required(),
  address: Yup.object({
    street: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip: Yup.string().required(),
  }),
  birthdate: Yup.date().required(),
  employment: Yup.object({
    pay_rate: Yup.number().positive().required(),
    position: Yup.string().oneOf(["Crew Member", "Shift Leader", "Assistant Manager", "Store Manager", "General Manager"]).required(),
  }).required(),
  office_info: Yup.object().shape({
    access: Yup.bool(),
    username: Yup.string(),
  }).notRequired(),
});

type TabProps = {
  name: string;
  index: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Tab = ({ name, index, page, setPage }: TabProps) => (
  <Btn
    className={`col-span-2 border-green-500 rounded-t-3xl text-xl font-bold ${page === index ? "bg-green-400 text-white" : "border-t-4 border-x-4 text-green-500"}`}
    onClick={() => setPage(index)}
  >
    {name}
  </Btn>
)

const EmployeeForm = ({ employee }: { employee: DataBase.People.IEmployee }) => {
  const { id } = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [errModal, showErrorModal] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setEditing(id !== "new" ? false : true);
  }, [id])

  if (!mounted) return null;
  return (
    <Formik
      initialValues={employee}
      validationSchema={validation}
      onSubmit={async (values) => {
        console.log("values", values);
        if (id === "new") {
          console.log("creating")
          const res = await axios.post("/office/api/employees", { employee: values });
          if (res.status === 201) alert("employee created");
          router.back();
        } else {
          console.log("updating")
          const res = await axios.put(`/office/api/employees/${id}`, { employee: values });
          if (res.status === 200) alert("employee updated");
        }
      }}
    >
      {({ values, errors, handleReset, handleSubmit }: FormikProps<DataBase.People.IEmployee>) => (
        <Form className="col-span-full row-span-full grid grid-cols-subgrid grid-rows-subgrid relative">
          {/* Genral Details */}
          <div className="col-span-8 col-start-3 grid grid-cols-subgrid px-4">
            <Tab {...{ name: "Personal Info", index: 0, page, setPage }} />
            <Tab {...{ name: "Employment Info", index: 1, page, setPage }} />
            {values.employment.position.includes("Manager") && (
              <Tab {...{ name: "Office Info", index: 2, page, setPage }} />
            )}
            {id !== "new" && <Tab {...{ name: "POS Info", index: 3, page, setPage }} />}
          </div>
          {page === 0 && (
            <GeneralInfoGroup {...{
              name: values.name,
              age: values.age,
              number: values.number,
              address: values.address,
              birthdate: values.birthdate,
              ssn: values.ssn,
              emergency_contacts: values.emergency_contacts,
              editing,
            }} />
          )}
          {/* Employment Details */}
          {page === 1 && (
            <EmployemntInfoGroup {...{
              employment: values.employment,
              editing
            }} />
          )}
          {/* Office Information */}
          {page === 2 && (
            <OfficeInfoGroup {...{
              office_info: values.office_info,
              editing,
            }} />
          )}
          {/* POS Information */}
          {page === 3 && (
            <PosInfoGroup {...{
              pos_info: values.pos_info,
              editing,
            }} />
          )}
          <BtnContainer {...{
            errors,
            editing,
            showErrorModal,
            setEditing,
            handleReset: () => handleReset(),
            handleSubmit: () => handleSubmit(),
          }} />
          {errModal && <ErrorModal {...{ errors, showErrorModal }} />}
        </Form>
      )}
    </Formik>
  )
}

export default EmployeeForm;
