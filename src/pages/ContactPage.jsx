import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineEdit,
  MdOutlineMail,
} from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiArrowRight } from "react-icons/fi";

import ContactForm from "../components/ContactForm";
import Loader from "../components/Loader";

import contactsList from "../constants/contactsList";
import { saveToLocalStorage } from "../helpers/helper";

import styles from "./ContactPage.module.css";

function ContactPage() {
  const { id } = useParams();
  const [contacts, setContacts] = useState(contactsList);
  const contact = contacts.find((contact) => contact.id === id);
  const [searchParams, setSearchParams] = useSearchParams();
  const isEdit = searchParams.get("edit");
  const navigate = useNavigate();

  const favoriteHandler = () => {
    const targetContact = contacts.find((contact) => contact.id === id);
    targetContact.favorite = !targetContact.favorite;
    setContacts((contacts) => [...contacts]);
    saveToLocalStorage(contacts);
    targetContact.favorite
      ? toast.success("مخاطب به لیست علاقه مندی اضافه شد.")
      : toast.success("مخاطب از لیست علاقه مندی حذف شد.");
  };

  const deleteHandler = () => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    toast.success("مخاطب با موفقیت حذف شد.");
    setTimeout(() => {
      setContacts(newContacts);
      saveToLocalStorage(newContacts);
      navigate("/contacts");
    }, 3000);
  };

  useEffect(() => {
    const newContacts = JSON.parse(localStorage.getItem("contactsList")) || [];
    setContacts(newContacts);
  }, [searchParams]);

  if (!contact) return <Loader />;

  return (
    <>
      {+isEdit === 1 ? (
        <div className={styles.editContact}>
          <div className={styles.editContactInner}>
            <Link to={`/contacts/${contact.id}`}>
              <FiArrowRight />
            </Link>
            <h2>{contact.fullName}</h2>
          </div>
          <ContactForm isEdit={true} data={contact} />
        </div>
      ) : (
        <div className={styles.contactContainer}>
          <div className={styles.contactAction}>
            <button onClick={deleteHandler}>
              <RiDeleteBin6Line />
            </button>
            <button onClick={() => setSearchParams("edit=1")}>
              <MdOutlineEdit />
            </button>
            <button onClick={favoriteHandler}>
              {contact.favorite ? (
                <MdFavorite fill="var(--color-error)" />
              ) : (
                <MdFavoriteBorder />
              )}
            </button>
          </div>
          <div className={styles.contactHeader}>
            <div className={styles.contactAvatar}>
              <img src={contact.avatar} />
            </div>
            <div>
              <h2>{contact.fullName}</h2>
            </div>
          </div>
          <div className={styles.contactDetails}>
            <h3>اطلاعات مخاطب</h3>
            <ul>
              <li>
                <span>
                  <MdOutlineMail />
                </span>
                <Link to={`mailto:${contact.email}`}>{contact.email}</Link>
              </li>
              <li>
                <span>
                  <FaPhoneAlt />
                </span>
                <Link to={`tel:${contact.phoneNumber}`}>
                  {contact.phoneNumber}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <ToastContainer rtl={true} autoClose={2000} pauseOnFocusLoss={false} />
    </>
  );
}

export default ContactPage;
