

import { ReactNode } from "react";

type mapperProps = {
  Component: JSX.ElementType,
  data: any[];
}

const ComponentMapper = ({ Component, data }: mapperProps) => (
  data.map((_, i) => <Component key={i} {...data[i]} />)
)
export default ComponentMapper;
