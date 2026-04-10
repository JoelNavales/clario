import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <div 
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-[6px] border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-all duration-200 cursor-pointer",
          checked ? "bg-primary text-primary-foreground" : "bg-transparent",
          className
        )}
        onClick={() => onCheckedChange?.(!checked)}
      >
        <input 
          type="checkbox" 
          className="peer sr-only" 
          checked={checked}
          ref={ref}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props} 
        />
        {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
