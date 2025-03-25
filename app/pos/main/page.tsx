"use client"
// Dependencies
import UseOrderReducer from "@/app/hooks/orderReducer";
// Components
import { OrderView, ActionBtns } from "./components";
import Views from "./views";
// Styles
import "@/styles/PosStyles.css";
import { Dispatch, Suspense, useEffect, useRef } from "react";
import axios from "axios";
import { PosBtn } from "../components/buttons";
import Modal from "../components/modals";

const getData = async () => await (await axios.get("http://localhost:3000/api/pos")).data;

export default function PosMain() {
  const [state, dispatch] = UseOrderReducer();
  const initData = useRef((data: any) => {
    dispatch({ type: "INIT_STATE", data });
  })

  useEffect(() => {
    getData().then(initData.current);
  }, []);

  return (
    <>
      <Modal {...{ state, dispatch }} />
      <>
        <OrderView {...{ state, dispatch }} />
        <Views {...{ state, dispatch }} />
        <ActionBtns {...{ state, dispatch }} />
      </>
    </>
  );
}