import { formatDate } from "@/utils";
import Group from ".";
import CustomField from "../field";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type EmploymentGroupProps = {
  employment: DataBase.People.Info.IEmployment;
  editing: boolean;
}

const TimeWorked = ({ date1, date2 }: { date1: Date, date2: Date }) => {
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  useEffect(() => {
    let years = date1.getFullYear() - date2.getFullYear();
    let months = date1.getMonth() - date2.getMonth();
    let days = date1.getDate() - date2.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(date1.getFullYear(), date1.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setYears(years);
    setMonths(months);
    setDays(days);
  }, [date1, date2]);

  return (
    <>
      {years > 0 && <span>{years} Years,&nbsp;</span>}
      {months > 0 && <span>{months} Months,&nbsp;</span>}
      {days > 0 && <span>{days} Days</span>}
    </>
  )
}

const EmployemntInfoGroup = ({ employment, editing }: EmploymentGroupProps) => {
  const { id } = useParams();

  return (
    <Group header="Employment Details">
      {/* Position */}
      <CustomField {...{
        className: "col-span-3",
        type: "select",
        id: "employment.position",
        text: "Position",
        data: employment.position,
        editing,
      }} >
        <option value="Crew Member">Crew Member</option>
        <option value="Shift Leader">Shift Leader</option>
        <option value="Assistant Manager">Assistant Manager</option>
        <option value="Store Manager">Store Manager</option>
        <option value="General Manager">General Manager</option>
      </CustomField>
      {/* Pay Rate */}
      <CustomField {...{
        className: "col-span-3",
        id: "employment.pay_rate",
        text: "Pay Rate",
        data: employment.pay_rate,
        editing,
      }} />
      {/* Employee ID */}
      {id !== "new" && (
        <CustomField {...{
          className: "col-span-3",
          id: "employment.id",
          text: "Employee ID",
          data: employment.id,
          editing,
        }} />
      )}
      {/* Employed */}
      {id !== "new" && (
        <CustomField {...{
          className: "col-span-2 row-start-3",
          id: "employment.employeed",
          type: "checkbox",
          text: "Employed",
          data: employment.employeed,
          editing,
        }} />
      )}
      {/* Start Date */}
      {employment.start_date && (
        <CustomField {...{
          className: "col-span-3 row-start-3",
          id: "employment.start_date",
          type: "date",
          text: "Start Date",
          data: formatDate(employment.start_date),
          editing,
        }} />
      )}
      {/* End Date */}
      {employment.end_date && (
        <CustomField {...{
          className: "col-span-3 row-start-3",
          id: "pos_info.end_date",
          text: "End Date",
          data: formatDate(employment.end_date),
          editing,
        }} />
      )}
      {id !== "new" && (
        <div className="row-start-3 col-span-4 h-full border border-black rounded-full flex items-center px-4">
          <span>Time Worked:&nbsp;</span>
          <TimeWorked {...{ date1: new Date(), date2: new Date(employment.start_date) }} />
        </div>
      )}
    </Group>
  );
}

export default EmployemntInfoGroup;
