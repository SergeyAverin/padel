import style from "./Loading.module.sass";

/** Компонент который отображается при загрузки */
export const Loading: React.FC = () => {
  return <div className={style.spinner}>Loading&#8230;</div>;
};
