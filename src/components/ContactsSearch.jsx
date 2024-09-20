import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

import { useContacts } from "../context/ContactsContext";

import styles from "./ContactsSearch.module.css";

function ContactsSearch() {
  const {
    state: { contacts },
  } = useContacts();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const openPageContact = (id) => {
    navigate(`/contacts/${id}`);
  };

  const searchHandler = (text) => {
    text = text.toLowerCase().trim();
    const searchedContacts = contacts.filter(
      (contact) =>
        contact.fullName.toLowerCase().trim().includes(text) ||
        contact.email.toLowerCase().trim().includes(text)
    );
    setSearchResult(searchedContacts);
  };

  const changeHandler = (e) => {
    setSearch(e.target.value);
    searchHandler(e.target.value);
  };

  return (
    <div className={styles.contactsHeaderSearch}>
      <h2>جست و جو در مخاطبین</h2>
      <div>
        <input
          type="text"
          value={search}
          onChange={changeHandler}
          placeholder="جست و جو کنید"
        />
        <button>
          <IoSearch />
        </button>
        {!!search.length && (
          <div className={styles.searchResult}>
            {searchResult.length ? (
              searchResult.map((item) => (
                <div
                  key={item.id}
                  className={styles.searchResultItem}
                  onClick={() => openPageContact(item.id)}
                >
                  <div>
                    <img src={item.avatar} />
                  </div>
                  <div>
                    <span>{item.fullName}</span>
                    <span>{item.email}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontSize: "14px", padding: "10px 12px" }}>
                هیچ مخاطبی یافت نشد!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactsSearch;
