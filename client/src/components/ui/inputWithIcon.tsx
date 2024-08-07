import { ReactNode } from "react";
import { Label } from "./label";
import { Capitalize } from "@/lib/helpers";

type Props = {
  name: string;
  variant: "text" | "password" | "email";
  children: ReactNode;
};

const InputWithIcon = ({
  name,
  variant,
  children,
}: Props) => {
  return (
    <div className="w-full">
      <Label htmlFor={name} className="text-zinc-400 mb-3">
        {Capitalize(name)}
      </Label>
      <div className="w-full flex justify-between items-center relative">
        <input
          type={variant}
          name={name}
          className="py-2 px-2 flex-1 border-b border-zinc-400 focus:outline-none focus:border-blue-500 bg-transparent"
        />
        {children}
      </div>
    </div>
  );
};
export default InputWithIcon;
