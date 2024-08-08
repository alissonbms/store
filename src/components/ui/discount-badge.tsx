import { ArrowDownIcon } from "lucide-react";
import { Badge, BadgeProps } from "./badge";

const DiscountBadge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <Badge {...props} className={className}>
      <ArrowDownIcon size={16} /> {children}%
    </Badge>
  );
};

export default DiscountBadge;
