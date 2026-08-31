import { MouseEventHandler } from "react";

type Props = {
  as?: ("div" | "p" | "span");
  children: React.ReactNode | React.ReactNode[];
  className: string;
  onClick: () => void;
}
const Clickable = ({ as: TagName = "div", children, className, onClick }: Props) => (
  <TagName
    tabIndex={1}
    className={className}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
  >
    {children}
  </TagName>
);

export default Clickable;