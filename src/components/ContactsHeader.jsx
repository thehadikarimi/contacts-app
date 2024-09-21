import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import { MdIndeterminateCheckBox } from "react-icons/md";

import ContactsSearch from "./ContactsSearch";
import { useContacts } from "../context/ContactsContext";
import Modal from "./Modal";

import styles from "./ContactsHeader.module.css";
import { updateContacts } from "../helpers/helper";
import api from "../services/config";

function ContactsHeader() {
  const {
    state: { contacts, checkedContacts },
    dispatch,
  } = useContacts();
  const [isOpen, setIsOpen] = useState(false);

  const selectHandler = () => {
    const data = [];
    contacts.forEach((contact) => data.push(contact.id));
    dispatch({ type: "ADD_CHECKED_CONTACT", payload: data });
  };

  const unSelectHandler = () => {
    dispatch({ type: "ADD_CHECKED_CONTACT", payload: [] });
  };

  const deleteHandler = async () => {
    console.log("delete");
  };

  return (
    <>
      <div className={styles.contactsHeader}>
        <ContactsSearch />
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
                <button onClick={() => setIsOpen(true)}>
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
      {!!isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          title="حذف مخاطبین انتخاب شده؟"
          desc="مخاطبین انتخاب شده از لیست مخاطبین شما حذف می شوند. آیا اطمینان دارید؟"
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default ContactsHeader;
