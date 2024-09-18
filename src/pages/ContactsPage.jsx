import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoAddOutline } from "react-icons/io5";

import ContactItem from "../components/ContactItem";
import ContactsHeader from "../components/ContactsHeader";
import FavoriteContacts from "../components/FavoriteContacts";

import contactsList from "../constants/contactsList";
import { saveToLocalStorage } from "../helpers/helper";

import styles from "./ContactsPage.module.css";

function ContactsPage() {
  const [contacts, setContacts] = useState(contactsList);
  const [checkedAll, setCheckedAll] = useState(false);
  const navigate = useNavigate();

  const favoriteHandler = (id) => {
    const targetContact = contacts.find((contact) => contact.id === id);
    targetContact.favorite = !targetContact.favorite;
    setContacts((contacts) => [...contacts]);
    saveToLocalStorage(contacts);
    targetContact.favorite
      ? toast.success("مخاطب به لیست علاقه مندی اضافه شد.")
      : toast.success("مخاطب از لیست علاقه مندی حذف شد.");
  };

  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
    saveToLocalStorage(newContacts);
    toast.success("مخاطب با موفقیت حذف شد.");
  };

  const checkedHandler = (id) => {
    const targetContact = contacts.find((contact) => contact.id === id);
    targetContact.checked = !targetContact.checked;
    setContacts((contacts) => [...contacts]);
  };

  useEffect(() => {
    const newContacts = JSON.parse(localStorage.getItem("contactsList")) || [];
    setContacts(newContacts);
  }, []);

  return (
    <>
      <div className={styles.contactsContainer}>
        <ContactsHeader
          contacts={contacts}
          setContacts={setContacts}
          setCheckedAll={setCheckedAll}
        />
        {!contacts.length ? (
          <div className={styles.noContact}>
            <span>هیچ مخاطبی یافت نشد</span>
          </div>
        ) : (
          <>
            <FavoriteContacts
              contacts={contacts}
              favoriteHandler={favoriteHandler}
              deleteHandler={deleteHandler}
              checkedHandler={checkedHandler}
            />
            <div style={{ marginBottom: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <h3 style={{ fontSize: "16px" }}>
                  مخاطبین ({contacts.length})
                </h3>
              </div>
              <div>
                {contacts.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    data={contact}
                    favoriteHandler={favoriteHandler}
                    deleteHandler={deleteHandler}
                    checkedHandler={checkedHandler}
                    checkedAll={checkedAll}
                  />
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
