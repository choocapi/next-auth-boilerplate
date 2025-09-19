import Image from "next/image";

interface HeaderProps {
  label: string;
  subLabel?: string;
}

const Header = ({ label, subLabel }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-4">
      <Image
        src="https://placehold.co/80x80/png"
        alt="Header Image"
        priority
        width={80}
        height={80}
      />
      <h1 className="text-lg font-semibold">{label}</h1>
      {subLabel && <span className="text-sm text-gray-500">{subLabel}</span>}
    </div>
  );
};

export default Header;
