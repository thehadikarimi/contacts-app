import styles from "./Modal.module.css";

function Modal({ setIsOpen, title, desc, deleteHandler }) {
  return (
    <div className={styles.modalContainer} onClick={() => setIsOpen(false)}>
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
