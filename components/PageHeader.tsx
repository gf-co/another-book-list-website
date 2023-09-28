import { icons } from "@/data/icons";

export type PageHeaderProps = {
  icon: string;
  name: string;
  description: string;
};

export default function PageHeader({
  icon,
  name,
  description,
}: PageHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-4">
        {icons[icon]}
        <h1 className="text-lg text-white">{name}</h1>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
