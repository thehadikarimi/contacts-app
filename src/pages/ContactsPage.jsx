import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoAddOutline } from "react-icons/io5";

import ContactItem from "../components/ContactItem";
import ContactsHeader from "../components/ContactsHeader";
import FavoriteContacts from "../components/FavoriteContacts";
import Loader from "../components/Loader";

import { useContacts } from "../context/ContactsContext";

import styles from "./ContactsPage.module.css";

function ContactsPage() {
  const {
    state: { contacts, loading },
    dispatch,
  } = useContacts();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "ADD_CHECKED_CONTACT", payload: [] });
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className={styles.contactsContainer}>
        <ContactsHeader />
        {!contacts.length || contacts.error ? (
          <div className={styles.noContact}>
            {contacts.error ? (
              <span>{contacts.error}</span>
            ) : (
              <span>هیچ مخاطبی یافت نشد</span>
            )}
          </div>
        ) : (
          <>
            <FavoriteContacts />
            <div style={{ marginBottom: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <h3 style={{ fontSize: "16px" }}>
                  مخاطبین ({contacts.length})
                </h3>
              </div>
              <div>
                {contacts.map((contact) => (
                  <ContactItem key={contact.id} data={contact} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.addContactBtn}>
        <button
          onClick={() => {
            navigate("/new");
          }}
        >
          <IoAddOutline />
          <span>ایجاد مخاطب جدید</span>
        </button>
      </div>
      <ToastContainer rtl={true} autoClose={2000} pauseOnFocusLoss={false} />
    </>
  );
}

export default ContactsPage;
