import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { FormikHelpers } from "formik";

export type optional<T> = { [K in keyof T]?: T[K] extends object ? optional<T[K]> : T[K] }
export type stringifyKeys<T> = { [K in keyof T as string]: T[K] extends object ? stringifyKeys<T[K]> : T[K] }

export type StateAction<T> = Dispatch<SetStateAction<T>> 

export type SubmitFunction<Values extends Object> = (values: Values, actions: FormikHelpers<Values>) => void;

export type BtnProps = {
  type?: "submit" | "reset" | "button" | undefined;
  text?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  onClick?: (...args: any[]) => any;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>
  onMouseUp?: MouseEventHandler<HTMLButtonElement>
}