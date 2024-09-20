import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdCheckBoxOutlineBlank,
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineEdit,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { IoCheckbox } from "react-icons/io5";
import { toast } from "react-toastify";

import avatarImg from "../assets/img/contact.png";

import Modal from "./Modal";
import api from "../services/config";
import { useContacts } from "../context/ContactsContext";
import { updateContacts } from "../helpers/helper";

import styles from "./ContactItem.module.css";

function ContactItem({ data, notHover }) {
  const {
    state: { checkedContacs },
    dispatch,
  } = useContacts();

  const { id, fullName, email, phoneNumber, avatar, favorite } = data;
  const [showOption, setShowOption] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openPageContact = () => {
    navigate(`/contacts/${id}`);
  };

  const favoriteHandler = async () => {
    try {
      await api.patch(`/api.contacts/${id}`, { favorite: !favorite });
      favorite
        ? toast.success("مخاطب به لیست علاقه مندی اضافه شد.")
        : toast.success("مخاطب از لیست علاقه مندی حذف شد.");
    } catch (error) {
      return toast.error(error.message);
    }
    updateContacts(dispatch, toast);
  };

  const deleteHandler = async () => {
    try {
      await api.delete(`/api.contacts/${id}`);
      toast.success("مخاطب با موفقیت حذف شد.");
      setIsOpen(false);
    } catch (error) {
      return toast.error(error.message);
    }
    updateContacts(dispatch, toast);
  };

  const contactClassHandler = () => {
    if (isChecked) {
      return `${styles.ContactItem} ${styles.checked}`;
    }
    if (notHover) {
      return `${styles.ContactItem} ${styles.notHover}`;
    }
    return `${styles.ContactItem}`;
  };

  return (
    <>
      <div className={contactClassHandler()} onClick={openPageContact}>
        <div className={styles.ContactAvatar}>
          <img src={avatar ? avatar : avatarImg} />
          <div>
            <input
              type="checkbox"
              checked={isChecked}
              onClick={(e) => {
                e.stopPropagation();
                // checkedHandler(id);
              }}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            {isChecked ? (
              <IoCheckbox style={{ fill: "var(--color-primary-500)" }} />
            ) : (
              <MdCheckBoxOutlineBlank
                style={{ fill: "var(--color-dark-500)" }}
              />
            )}
          </div>
        </div>
        <div className={styles.ContactInfo}>
          <div>
            <span>{fullName}</span>
          </div>
          <div>
            <span>{email}</span>
          </div>
          <div>
            <span>{phoneNumber}</span>
          </div>
        </div>
        <div className={styles.ContactAction}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              favoriteHandler();
            }}
          >
            {favorite ? (
              <MdFavorite fill="var(--color-error)" />
            ) : (
              <MdFavoriteBorder />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/contacts/${id}?edit=1`);
            }}
          >
            <MdOutlineEdit />
          </button>
          <div
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <button>
              <HiDotsVertical />
            </button>
            {showOption && (
              <span className={styles.contactOption}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                  }}
                >
                  <RiDeleteBin6Line />
                  <span>حذف کردن</span>
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
      {!!isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          title="حذف از مخاطبین؟"
          desc="این مخاطب از لیست مخاطبین شما حذف می شود. آیا اطمینان دارید؟"
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default ContactItem;
