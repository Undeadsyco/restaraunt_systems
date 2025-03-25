import { MouseEvent, useRef, useState } from "react";

import { KeyPad } from "@/app/components";
import { PosBtn } from "@/app/pos/components/buttons";

const commentRowStyles = "col-span-8 row-span-2 grid grid-cols-6 grid-rows-1 gap-x-1 gap-y-3 rounded-2xl";
const commentBtnStyles = "h-2/3 w-full place-self-center";

const CommentBtns = ({ dispatch }: POS.Props.PosComponent) => (
  <>
    <div className={commentRowStyles}>
      <PosBtn
        text="Ask Me"
        className={commentBtnStyles}
        action={() => dispatch({ type: "ADD_COMMENT", data: { name: "Ask Me" } })}
      />
      <PosBtn
        text="Allergy Alert"
        className={commentBtnStyles}
        action={() => dispatch({ type: "ADD_COMMENT", data: { name: "Allergy Alert" } })}
      />
      <PosBtn
        text="Cold Crust"
        className={commentBtnStyles}
        action={() => dispatch({ type: "ADD_COMMENT", data: { name: "Cold Crust" } })}
      />
      <PosBtn
        text="Double Wrapped"
        className={commentBtnStyles}
        action={() => dispatch({ type: "ADD_COMMENT", data: { name: "Double Wrapped" } })}
      />
      <PosBtn
        text="New Guest"
        className={commentBtnStyles}
        action={() => dispatch({ type: "ADD_COMMENT", data: { name: "New Guest" } })}
      />
      <PosBtn
        text="Back"
        className={`${commentBtnStyles} close-btn text-white`}
        action={() => dispatch({ type: "SET_MAIN_VIEW", data: "Menu" })}
      />
    </div>

    <div className={commentRowStyles}>
      <PosBtn
        text="Drive Thru"
        className={commentBtnStyles}
        action={() => dispatch({ type: "ADD_COMMENT", data: { name: "Drive Thru" } })}
      />
      <PosBtn
        text="Make Now"
        className={commentBtnStyles}
        action={() => dispatch({ type: "ADD_COMMENT", data: { name: "Make Now" } })}
      />
      <PosBtn
        text="Do Not Make"
        className={commentBtnStyles}
        action={() => dispatch({ type: "ADD_COMMENT", data: { name: "Do Not Make" } })}
      />
      <PosBtn
        text="On The Side"
        className={commentBtnStyles}
        action={() => dispatch({ type: "ADD_COMMENT", data: { name: "On The Side" } })}
      />
      <PosBtn
        text="Custom"
        className={commentBtnStyles}
        action={() => dispatch({ type: "OPEN_KEYBOARD", data: "ADD_COMMENT" })}
      />
    </div>
  </>
)

export default CommentBtns;
