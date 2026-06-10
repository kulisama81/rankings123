interface FlagNameProps {
  flag: string;
  name: string;
  className?: string;
}

export default function FlagName({ flag, name, className }: FlagNameProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className ?? ""}`}>
      <span aria-hidden="true">{flag}</span>
      <span>{name}</span>
    </span>
  );
}
