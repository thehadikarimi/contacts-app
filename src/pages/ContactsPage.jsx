import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoAddOutline } from "react-icons/io5";

import ContactItem from "../components/ContactItem";
import ContactsHeader from "../components/ContactsHeader";
import FavoriteContacts from "../components/FavoriteContacts";
import Loader from "../components/Loader";

import { useContacts } from "../context/ContactsContext";
import api from "../services/config";

import styles from "./ContactsPage.module.css";

function ContactsPage() {
  const { state: contacts, dispatch } = useContacts();
  const navigate = useNavigate();

  const favoriteHandler = async (id) => {
    const targetContact = contacts.data.find((contact) => contact.id === id);
    const favorite = !targetContact.favorite;
    try {
      await api.patch(`/api.contacts/${id}`, { favorite });

      try {
        const data = await api.get("/api.contacts");
        dispatch({ type: "SUCCESS", payload: data });
      } catch (error) {
        return toast.error(error.message);
      }
      
      favorite
        ? toast.success("مخاطب به لیست علاقه مندی اضافه شد.")
        : toast.success("مخاطب از لیست علاقه مندی حذف شد.");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    toast.success("مخاطب با موفقیت حذف شد.");
  };

  if (contacts.loading) return <Loader />;

  return (
    <>
      <div className={styles.contactsContainer}>
        {/* <ContactsHeader /> */}
        {!contacts.data.length || contacts.error ? (
          <div className={styles.noContact}>
            {contacts.error ? (
              <span>{contacts.error}</span>
            ) : (
              <span>هیچ مخاطبی یافت نشد</span>
            )}
          </div>
        ) : (
          <>
            {/* <FavoriteContacts
              favoriteHandler={favoriteHandler}
              deleteHandler={deleteHandler}
            /> */}
            <div style={{ marginBottom: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <h3 style={{ fontSize: "16px" }}>
                  مخاطبین ({contacts.data.length})
                </h3>
              </div>
              <div>
                {contacts.data.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    data={contact}
                    favoriteHandler={favoriteHandler}
                    deleteHandler={deleteHandler}
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
