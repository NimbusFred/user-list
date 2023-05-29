interface Props {
  icon: any;
  className?: string;
  onClick?: () => void;
}

export default function Icon({ icon, className, onClick }: Props) {
  const HeroIcon = icon;
  if (!HeroIcon) return <></>;
  return <HeroIcon aria-hidden className={className} onClick={onClick} />;
}
