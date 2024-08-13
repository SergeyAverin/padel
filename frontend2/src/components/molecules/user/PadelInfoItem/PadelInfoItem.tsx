import classNames from "classnames";

interface IPadelInfoItemProps {
  text: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}
export const PadelInfoItem: React.FC<IPadelInfoItemProps> = ({
  icon,
  text,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "flex flex-col items-center  p-5 box-border border-4 ",
        {
          "border-highlight rounded-xl": isActive,
          "border-primary border-4 ": !isActive,
        }
      )}
      onClick={onClick}
    >
      {icon}
      <div className="mt-3">{text}</div>
    </div>
  );
};
