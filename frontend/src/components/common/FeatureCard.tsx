import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  to,
}: FeatureCardProps) => {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
