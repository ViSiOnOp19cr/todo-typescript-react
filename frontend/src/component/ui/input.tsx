export interface InputProps {
    placeholder: string;
    reference:any;
}
export const Input = (props:InputProps) =>{
    return (
        <input
            ref = {props.reference}
            placeholder={props.placeholder}
            className="border border-gray-300 rounded-md p-2"
        />
    )
}