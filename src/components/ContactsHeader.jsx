import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import { MdIndeterminateCheckBox } from "react-icons/md";

import ContactsSearch from "./ContactsSearch";
import { useContacts } from "../context/ContactsContext";

import styles from "./ContactsHeader.module.css";

function ContactsHeader() {
  const { state: contacts, dispatch } = useContacts();
  const checkedContacts = contacts.data.filter(
    (contact) => contact.checked === true
  );

  const selectHandler = () => {
    contacts.map((contact) => (contact.checked = true));
    setContacts((contacts) => [...contacts]);
    setCheckedAll(true);
  };

  const unSelectHandler = () => {
    contacts.map((contact) => (contact.checked = false));
    setContacts((contacts) => [...contacts]);
    setCheckedAll(false);
  };

  const deleteHandler = () => {
    const newContacts = contacts.filter((contact) => contact.checked === false);
    setContacts(newContacts);
    saveToLocalStorage(newContacts);
    toast.success(`${checkedContacts.length} مخاطب با موفقیت حذف شد.`);
  };

  return (
    <>
      <div className={styles.contactsHeader}>
        <ContactsSearch contacts={contacts} />
        <div className={styles.contactsHeaderRow}>
          {checkedContacts.length ? (
            <div className={styles.contactsHeaderAction}>
              <span>{checkedContacts.length} انتخاب شده</span>
              <div>
                <button onClick={unSelectHandler}>
                  <MdIndeterminateCheckBox />
                </button>
                <button onClick={selectHandler}>
                  <IoMdDoneAll />
                </button>
                <button onClick={deleteHandler}>
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.contactsHeaderLabel}>
              <span>نام و نام خانوادگی</span>
              <span>ایمیل</span>
              <span>شماره تلفن</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ContactsHeader;
