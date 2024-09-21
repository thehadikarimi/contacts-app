import { useRef } from "react";

import styles from "./Modal.module.css";

function Modal({ setIsOpen, title, desc, deleteHandler }) {
  const modalRef = useRef(null);

  return (
    <div
      className={styles.modalContainer}
      ref={modalRef}
      onClick={(e) => e.target === modalRef.current && setIsOpen(false)}
    >
      <div className={styles.modalInner}>
        <div className={styles.modalContent}>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
        <div className={styles.modalActions}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteHandler();
            }}
          >
            حذف کردن
          </button>
          <button onClick={() => setIsOpen(false)}>انصراف</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
