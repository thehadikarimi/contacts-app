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
import api from "../services/config";
import { useContacts } from "../context/ContactsContext";

import styles from "./ContactPage.module.css";
import { updateContacts } from "../helpers/helper";

function ContactPage() {
  const { id } = useParams();
  const { dispatch } = useContacts();
  const [contact, setContact] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const isEdit = searchParams.get("edit");
  const navigate = useNavigate();

  const getContact = async () => {
    const contact = await api.get(`/api.contacts/${id}`);
    setContact(contact);
  };

  const favoriteHandler = async () => {
    const favorite = !contact.favorite;
    try {
      await api.patch(`/api.contacts/${id}`, { favorite });
      favorite
        ? toast.success("مخاطب به لیست علاقه مندی اضافه شد.")
        : toast.success("مخاطب از لیست علاقه مندی حذف شد.");
    } catch (error) {
      return toast.error(error.message);
    }
    updateContacts(dispatch, toast);
    getContact();
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
    getContact();
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
