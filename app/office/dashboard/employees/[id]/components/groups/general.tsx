import { formatDate } from "@/utils";
import Group from ".";
import CustomField from "../field";
import { FieldArray } from "formik";
import { Btn } from "@/app/components";

type GeneralInfoGroupProps = Omit<DataBase.People.IEmployee, "employment" | "pos_info" | "office_info"> & {
  editing: boolean;
}

type ContactListProps = {
  contact: DataBase.People.Info.IContactDetails;
  editing: boolean;
  remove: <X = any>(index: number) => X | undefined;
  index: number;
}

type AddContactProps = {
  emergency_contacts: DataBase.People.Info.IContactDetails[];
  push: <X = any>(obj: X) => void;
}

const AddContactBtn = ({ emergency_contacts, push }: AddContactProps) => (
  <Btn {...{
    className: "rounded-full px-4 py-1 border border-black col-span-2",
    text: "Add Contact",
    onClick: () => {
      if (emergency_contacts && emergency_contacts?.length < 3) {
        push({
          name: "",
          number: "",
          relation: "",
        })
      }
    },
  }} />
)

const ContactListItem = ({ contact, editing, index, remove }: ContactListProps) => (
  <div className="flex w-full border justify-between px-2">
    <div className="grid grid-cols-3 gap-2 w-5/6">
      <CustomField {...{
        className: "h-full w-full",
        id: `emergency_contacts[${index}].name`,
        text: "Name",
        data: contact.name,
        editing,
      }} />
      <CustomField {...{
        className: "h-full w-full",
        id: `emergency_contacts[${index}].number`,
        text: "Number",
        data: contact.number,
        editing,
      }} />
      <CustomField {...{
        className: "h-full w-full",
        id: `emergency_contacts[${index}].relation`,
        text: "Relation",
        data: contact.relation,
        editing,
      }} />
    </div>
    <Btn {...{
      text: "Remove",
      className: "h-full rounded-full px-4 border border-black",
      onClick: () => remove(index),
    }} />
  </div>
)

const GeneralInfoGroup = ({ name, age, number, birthdate, address, ssn, emergency_contacts, editing }: GeneralInfoGroupProps) => (
  <Group header="General Details">
    {/* Name */}
    <CustomField {...{
      className: "col-span-5",
      id: "name",
      text: "Full Name",
      data: name,
      editing,
    }} />
    {/* Age */}
    <CustomField {...{
      className: "col-span-3",
      id: "age",
      text: "Age",
      data: age,
      editing,
    }} />
    {/* Number */}
    <CustomField {...{
      className: "col-span-3",
      id: "number",
      text: "Number",
      data: number,
      editing
    }} />
    {/* BirthDate */}
    <CustomField {...{
      className: "col-span-4",
      id: "birthdate",
      type: "date",
      text: "Birth Date",
      data: formatDate(birthdate),
      editing,
    }} />
    {/* Social Secerity */}
    <CustomField {...{
      className: "col-span-3",
      id: "ssn",
      text: "Social",
      data: ssn,
      editing,
    }} />
    {/* Address */}
    <div className="col-span-full row-span-3 grid grid-cols-subgrid grid-rows-subgrid h-full items-center px-2">
      <h3 className="text-xl col-span-full font-semibold px-6">Address:</h3>
      {/* Street */}
      <CustomField {...{
        className: "col-span-7",
        id: "address.street",
        text: "Street",
        data: address.street,
        placeholder: "1234 N Central Ave",
        editing,
      }} />
      <CustomField {...{
        className: "col-span-3 row-start-3",
        id: "address.city",
        text: "City",
        data: address.city,
        editing,
      }} />
      <CustomField {...{
        className: "col-span-3 row-start-3",
        id: "address.state",
        text: "State",
        data: address.state,
        editing,
      }} />
      <CustomField {...{
        className: "col-span-3 row-start-3",
        id: "address.zip",
        text: "Zip",
        data: address.zip,
        editing,
      }} />
    </div>
    <div className="col-span-full row-span-4 grid grid-cols-subgrid grid-rows-subgrid items-center">
      <h3 className="text-xl col-span-8 font-semibold px-6">Emergancy Contacts:</h3>
      <FieldArray name="emergency_contacts">
        {({ push, remove }) => (
          <>
            {editing && <AddContactBtn {...{ emergency_contacts, push }} />}
            <div className="col-span-full row-span-3 grid grid-rows-subgrid">
              {emergency_contacts?.map((contact, index) => (
                <ContactListItem key={index} {...{ contact, index, remove, editing }} />
              ))}
            </div>
          </>
        )}
      </FieldArray>
    </div>
  </Group >
);

export default GeneralInfoGroup;
