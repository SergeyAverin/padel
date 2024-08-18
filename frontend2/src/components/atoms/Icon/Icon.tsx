interface IIconProps {
  /** SVG иконка */
  iconSVG: React.ReactNode;
}

/** Обертка для SVG иконки */
export const Icon: React.FC<IIconProps> = ({ iconSVG }) => {
  return (
    <div className="w-[35px] h-[35px] flex justify-center items-center">
      <div>{iconSVG}</div>
    </div>
  );
};
