"use client"
// Dependencies
import { useContext } from "react";
// Components
import { PosBtn } from "@/app/pos/components/buttons";
// COntext
import { PosContext } from "@/utils/PosContext";

const CommentBtn = ({ text, onClick }: { text: string, onClick: () => void }) => (
  <PosBtn
    text={text}
    className="h-2/3 w-full place-self-center btn-default-secondary"
    onClick={onClick}
  />
)

const CommentRow = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => (
  <div className="col-span-4 row-span-11 grid grid-rows-5 grid-cols-1 gap-x-1 gap-y-3 rounded-2xl px-4 py-2">
    {children}
  </div>
)

const CommentBtns = () => {
  const { dispatch } = useContext(PosContext)!;

  return (
    <>
      <CommentRow>
        <CommentBtn
          text="Ask Me"
          onClick={() => dispatch({ type: "ADD_COMMENT", data: { name: "Ask Me" } })}
        />
        <CommentBtn
          text="Allergy Alert"
          onClick={() => dispatch({ type: "ADD_COMMENT", data: { name: "Allergy Alert" } })}
        />
        <CommentBtn
          text="Cold Crust"
          onClick={() => dispatch({ type: "ADD_COMMENT", data: { name: "Cold Crust" } })}
        />
        <CommentBtn
          text="Double Wrapped"
          onClick={() => dispatch({ type: "ADD_COMMENT", data: { name: "Double Wrapped" } })}
        />
        <CommentBtn
          text="New Guest"
          onClick={() => dispatch({ type: "ADD_COMMENT", data: { name: "New Guest" } })}
        />
      </CommentRow>

      <CommentRow>
        <CommentBtn
          text="Drive Thru"
          onClick={() => dispatch({ type: "ADD_COMMENT", data: { name: "Drive Thru" } })}
        />
        <CommentBtn
          text="Make Now"
          onClick={() => dispatch({ type: "ADD_COMMENT", data: { name: "Make Now" } })}
        />
        <CommentBtn
          text="Do Not Make"
          onClick={() => dispatch({ type: "ADD_COMMENT", data: { name: "Do Not Make" } })}
        />
        <CommentBtn
          text="On The Side"
          onClick={() => dispatch({ type: "ADD_COMMENT", data: { name: "On The Side" } })}
        />
        <CommentBtn
          text="Custom"
          onClick={() => dispatch({ type: "OPEN_KEYBOARD", data: "ADD_COMMENT" })}
        />
      </CommentRow>
    </>
  );
}

export default CommentBtns;
