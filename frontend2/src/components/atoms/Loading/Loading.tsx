import style from "./Loading.module.css";

/** Компонент который отображается при загрузки */
export const Loading: React.FC = () => {
  return <div className={style.spinner}>Loading&#8230;</div>;
};
