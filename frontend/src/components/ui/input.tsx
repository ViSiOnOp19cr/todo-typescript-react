export function Input({placeholder,reference}: {placeholder:string; reference?:any}){
    return (
        <div>
            <input ref={reference} placeholder = {placeholder} type={"text"}
             className="px-4 py-2 mt-6 border rounded m-2"></input>
        </div>
    )
}