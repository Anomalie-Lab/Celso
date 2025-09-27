import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses = {
    default: "border-transparent bg-primary text-white shadow hover:bg-primary",
    secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
    destructive: "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
    outline: "text-gray-900 border-gray-300",
  }

  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors",
        variantClasses[variant],
        className
      )} 
      {...props} 
    />
  )
}

export { Badge }
