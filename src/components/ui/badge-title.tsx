import { twMerge } from "tailwind-merge";
import { Badge, BadgeProps } from "./badge";

const BadgeTitle = ({ children, className, ...props }: BadgeProps) => {
  return (
    <Badge
      {...props}
      className={twMerge(
        "w-fit gap-1 border-2 border-primary px-3 py-[0.375rem]",
        className,
      )}
      variant="outline"
    >
      {children}
    </Badge>
  );
};

export default BadgeTitle;
