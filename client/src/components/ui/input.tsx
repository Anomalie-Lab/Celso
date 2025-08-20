
import type { InputProps } from "@/types/InputProps";

export default function Input({ type, placeholder, className, ...props }: InputProps) {
    return (
        <div className="flex flex-col w-full">
            <input
                type={type}
                placeholder={placeholder}
                {...props}
                className={className}
            />
        </div>
    )
}