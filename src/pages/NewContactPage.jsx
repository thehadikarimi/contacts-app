import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import ContactForm from "../components/ContactForm";

import styles from "./NewContactPage.module.css";

function NewContactPage() {
  return (
    <>
      <div className={styles.addContact}>
        <div className={styles.addContactInner}>
          <Link to={`/contacts`}>
            <FiArrowRight />
          </Link>
          <h2>افزودن مخاطب</h2>
        </div>
        <ContactForm />
      </div>
    </>
  );
}

export default NewContactPage;
