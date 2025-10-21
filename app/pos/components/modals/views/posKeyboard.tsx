import { KeyPad } from "@/app/components";
import { Formik, FormikProps } from "formik"
import { PosBtn } from "../../buttons";
import { MouseEvent, useContext } from "react";
import { PosContext } from "@/utils/PosContext";

const KeyboardForm = ({ values, handleSubmit, handleReset, setFieldValue }: FormikProps<{ text: string }>) => {
  const handleChange = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const value = e.currentTarget.children[0].textContent || e.currentTarget.textContent;
    switch (value) {
      case "Space":
        setFieldValue("text", `${values.text} `);
        break;
      case "Backspace":
        setFieldValue("text", values.text.slice(0, values.text.length - 1));
        break;
      case "Clear":
        setFieldValue("text", "");
        break;
      default:
        setFieldValue("text", `${values.text}${value}`);
        break;
    }

  }
  return (
    <form className="bg-white w-2/3 h-3/5 flex flex-col justify-between pt-4 px-4 rounded-3xl">
      <label htmlFor="value" className="inline-flex items-center">
        <input
          className="border-black border inline-block w-3/4 h-16 m-auto rounded-full text-black text-center"
          name="value"
          id="value"
          type="text"
          value={values.text}
          readOnly
        />
      </label>

      <KeyPad
        className="w-full h-fit mx-auto"
        CustumBtn={PosBtn}
        onSubmit={() => handleSubmit()}
        onChange={(e) => handleChange(e)}
        onCancel={() => handleReset()}
      />
    </form>
  )
}

const Keyboard = () => {
  const { state: { modal: { keyboard }, orders, orderIndex }, dispatch } = useContext(PosContext)!;
  const setInitialValue = () => {
    switch (keyboard.action) {
      case "SET_ORDER_NAME": return ({ text: orders[orderIndex].name ?? "" });
      default: return ({ text: "" });
    }
  }

  return (
    !keyboard.display ? null : (
      <Formik
        initialValues={setInitialValue()}
        onSubmit={(values, actions) => {
          switch (keyboard.action) {
            case "SET_ORDER_NAME":
              dispatch({ type: keyboard.action, data: values.text });
              break;
            case "ADD_COMMENT":
              dispatch({ type: keyboard.action, data: { name: "Custom", message: values.text } });
          }
          actions.resetForm();
        }}
        onReset={() => {
          dispatch({ type: "CLOSE_KEYBOARD" });
        }}
        component={KeyboardForm}
      />
    )
  );
}

export default Keyboard;
