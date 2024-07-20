import { ChangeEvent } from "react";

interface Inputs {
    name: string;
    placeholder: string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
  }
  
  export const Inputbox = ({ name, placeholder,onChange }: Inputs) => {
    const inputType = name === "password" ? "password" : "text";
   
    return (
       <div>
      <div className="text-sm font-medium text-left py-2">
        {name}
      </div>
      <input type={inputType} placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
    );
  };
  