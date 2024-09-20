import { useContacts } from "../context/ContactsContext";
import ContactItem from "./ContactItem";

function FavoriteContacts() {
  const {
    state: { contacts },
  } = useContacts();
  const favoriteContacts = contacts.filter(
    (contact) => contact.favorite === true
  );

  if (!favoriteContacts.length) return;

  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ marginBottom: "10px" }}>
        <h3 style={{ fontSize: "16px" }}>
          موارد دلخواه ({favoriteContacts.length})
        </h3>
      </div>
      <div>
        {favoriteContacts.map((contact) => (
          <ContactItem key={contact.id} data={contact} notHover={true} />
        ))}
      </div>
    </div>
  );
}

export default FavoriteContacts;
