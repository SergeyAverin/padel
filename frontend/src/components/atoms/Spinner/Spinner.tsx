import style from "./Spinner.module.css";

/** Компонент который отображается при загрузки */
export const Spinner: React.FC = () => {
  return <div className={style.spinner}>Loading&#8230;</div>;
};
