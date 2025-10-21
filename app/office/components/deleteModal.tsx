import { Dispatch, SetStateAction } from "react";
import { Btn, Modal } from "@/app/components";

export type DeleteModalProps = { display: boolean; id: string; }
export type SetDeleteModalProps = Dispatch<SetStateAction<DeleteModalProps>>

type Props = {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal = ({ onClose, onDelete }: Props) => (
  <Modal>
    <div className="w-1/4 h-1/4 bg-white bordered">
      <h3 className="w-full mb-10 font-bold text-2xl text-red-500 text-center px-4">Are you sure you want to delete?</h3>
      <div className="w-full flex justify-around items-center">
        <Btn {...{
          className: "p-1 px-4 bordered border-green-500 text-green-500 hover:bg-green-400 hover:text-white",
          text: "Cancel",
          onClick: onClose
        }} />
        <Btn {...{
          className: "p-1 px-4 bordered border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
          text: "Delete",
          onClick: onDelete
        }} />
      </div>
    </div>
  </Modal>
);

export default DeleteModal;