

import { ReactNode } from "react";

type mapperProps = {
  Component?: JSX.ElementType,
  data?: any[];
  element?: JSX.ElementType;
  length?: number
}

const ComponentMapper = ({ Component, element, data, length }: mapperProps) => {
  if (Component && data) return (
    Array.from(data, (_, i) => (
      <>
        {Component && <Component key={i} {...data[i]} />}
      </>
    ))
  )

  if (element && length) return (
    Array.from({ length: length }, (_, i) => (
      <>
        {element && element}
      </>
    ))
  )
}
export default ComponentMapper;
