import { Link } from "react-router-dom";

import { RiContactsBookLine } from "react-icons/ri";

import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <Link to="/contacts">
              <RiContactsBookLine />
            </Link>
          </div>
          <div>
            <h1>برنامه مخاطبین ریکت</h1>
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div>
          <p>توسعه داده شده توسط هادی کریمی با ❤️</p>
        </div>
      </footer>
    </>
  );
}

export default Layout;
