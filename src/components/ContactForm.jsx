import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";

import avatarImg from "../assets/img/contact.png";

import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineEdit, MdOutlineMail } from "react-icons/md";

import api from "../services/config";
import { useContacts } from "../context/ContactsContext";
import { updateContacts } from "../helpers/helper";

import styles from "./ContactForm.module.css";

function ContactForm({ isEdit, data }) {
  const { dispatch } = useContacts();
  const [contact, setContact] = useState("");
  const [contactAvatar, setContactAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const initialData = {
    id: "",
    name: "",
    lastName: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    avatar: contactAvatar,
    favorite: false,
  };
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const fileHandler = (e) => {
    setContactAvatar(window.URL.createObjectURL(e.target.files[0]));
    if (isEdit) {
      contact.avatar = contactAvatar;
    }
  };

  const contactHandler = (e) => {
    e.preventDefault();

    if (!contact.name) {
      return toast.error("لطفا نام خود را وارد نمایید");
    }
    if (!contact.lastName) {
      return toast.error("لطفا نام خانوادگی خود را وارد نمایید");
    }
    if (!contact.email) {
      return toast.error("لطفا ایمیل خود را وارد نمایید");
    }
    if (!/^09[0-9]{9}/.test(contact.phoneNumber)) {
      return toast.error("لطفا شماره تلفن همراه خود را به درستی وارد نمایید");
    }

    const fetchContact = async ([type, data]) => {
      setLoading(true);
      if (type === "PUT") {
        try {
          await api.put(`/contacts/${data.id}`, data);
          toast.success("مخاطب با موفقیت ذخیره شد.");
          navigate(`/contacts/${data.id}`);
          updateContacts(dispatch, toast);
        } catch (error) {
          toast.error(error.message);
        }
      }
      if (type === "POST") {
        try {
          await api.post("/contacts/", data);
          toast.success("مخاطب با موفقیت افزوده شد.");
          navigate("/contacts");
          updateContacts(dispatch, toast);
        } catch (error) {
          toast.error(error.message);
        }
      }
      setLoading(false);
    };

    if (isEdit) {
      const updatedContact = {
        ...contact,
        avatar: contactAvatar,
        fullName: contact.name + " " + contact.lastName,
      };
      fetchContact(["PUT", updatedContact]);
    } else {
      const newContact = {
        ...contact,
        id: v4(),
        avatar: contactAvatar,
        fullName: contact.name + " " + contact.lastName,
      };
      fetchContact(["POST", newContact]);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setContact(data);
      setContactAvatar(data.avatar);
    } else {
      setContact(initialData);
      setContactAvatar(avatarImg);
    }
  }, []);

  return (
    <form onSubmit={contactHandler} className={styles.ContactForm}>
      <div className={styles.contactAvatar}>
        <label htmlFor="contact-image">
          <input
            id="contact-image"
            name="contact-image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/webp"
            onChange={fileHandler}
          />
          <img src={contactAvatar} />
          <button>
            {contactAvatar === avatarImg ? <IoAddOutline /> : <MdOutlineEdit />}
          </button>
        </label>
      </div>
      <div className={styles.contactFormInner}>
        <div className={styles.inputContainer}>
          <div>
            <FaRegUser />
          </div>
          <div>
            <div className={styles.inputFields}>
              <label htmlFor="name">نام</label>
              <input
                type="text"
                name="name"
                autoComplete="off"
                value={contact.name}
                onChange={changeHandler}
              />
            </div>
            <div className={styles.inputFields}>
              <label htmlFor="lastName">نام خانوادگی</label>
              <input
                type="text"
                name="lastName"
                autoComplete="off"
                value={contact.lastName}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div>
            <MdOutlineMail />
          </div>
          <div>
            <div className={styles.inputFields}>
              <label htmlFor="email">آدرس ایمیل</label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                value={contact.email}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div>
            <FaPhoneAlt />
          </div>
          <div>
            <div className={styles.inputFields}>
              <label htmlFor="phoneNumber">شماره تلفن</label>
              <input
                type="tel"
                name="phoneNumber"
                autoComplete="off"
                value={contact.phoneNumber}
                onChange={changeHandler}
                maxLength={11}
              />
            </div>
          </div>
        </div>
        <div className={styles.submitBtnContainer}>
          <button
            type="submit"
            className={loading ? styles.disable : undefined}
          >
            {isEdit ? "ذخیره" : "افزودن"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ContactForm;
