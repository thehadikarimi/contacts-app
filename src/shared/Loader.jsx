import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderDots}>
        <span className={styles.loaderDot}></span>
        <span className={styles.loaderDot}></span>
        <span className={styles.loaderDot}></span>
      </div>
    </div>
  );
}

export default Loader;
