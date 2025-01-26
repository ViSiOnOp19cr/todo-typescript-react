export interface ButtonProps {
  onClick?: () => void;
  size: "sm" | "md" | "lg";
  varient: "primary" | "secondary";
  text: string;
  startIcon?: any;
  endIcon?: any;
}
const varientStyles = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-blue-700 text-white",
};
const sizeStyles = {
  sm: "px-8 py-2",
  md: "px-10 py-2",
  lg: "px-12 py-2",
};
const defaultStyles = "hover:bg-blue-700 hover:pointer rounded-md p-4";

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${varientStyles[props.varient]}
        ${sizeStyles[props.size]} ${defaultStyles}`}
    >
      {props.startIcon}
      {props.text}
      {props.endIcon}
    </button>
  );
};
