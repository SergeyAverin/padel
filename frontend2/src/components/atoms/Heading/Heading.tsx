import { HeadingVariant } from "./HeadingVariant";

interface IHeadingProps extends React.PropsWithChildren {
  /** Вариант заголовка */
  variant: HeadingVariant;
}

/** Компонент заголовка */
export const Heading: React.FC<IHeadingProps> = ({ variant, children }) => {
  return (
    <>
      {variant == HeadingVariant.H1 && (
        <h1 className="text-[26px] font-bold">{children}</h1>
      )}
      {variant == HeadingVariant.H2 && (
        <h2 className="text-[24px] font-medium">{children}</h2>
      )}
      {variant == HeadingVariant.H3 && (
        <h3 className="text-[20px] font-medium">{children}</h3>
      )}
    </>
  );
};
