import { Link } from "react-router-dom";

import img404 from "../assets/img/error-404.png";

import styles from "./404.module.css";

function PageNotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundImg}>
        <img src={img404} />
      </div>
      <div className={styles.notFoundContent}>
        <h2>صفحه مورد نظر شما یافت نشد.</h2>
        <Link to="/contacts">بازگشت به صفحه اصلی</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
