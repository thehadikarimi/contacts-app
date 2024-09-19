import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";

import avatarImg from "../assets/img/contact.png";

import styles from "./ContactItem.module.css";

function ContactItem({ data, favoriteHandler, deleteHandler, notHover }) {
  const { id, fullName, email, phoneNumber, avatar, favorite } = data;
  const [showOption, setShowOption] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const openPageContact = () => {
    navigate(`/contacts/${id}`);
  };

  const showOptionHandler = () => {
    setShowOption((option) => (option = !option));
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
    <div className={contactClassHandler()} onClick={openPageContact}>
      <div className={styles.ContactAvatar}>
        <img src={avatar ? avatar : avatarImg} />
        <input
          type="checkbox"
          checked={isChecked}
          onClick={(e) => {
            e.stopPropagation();
            checkedHandler(id);
          }}
          onChange={() => setIsChecked(!isChecked)}
        />
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
            favoriteHandler(id);
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
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showOptionHandler();
            }}
          >
            <HiDotsVertical />
          </button>
          {showOption && (
            <span className={styles.contactOption}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHandler(id);
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
  );
}

export default ContactItem;
