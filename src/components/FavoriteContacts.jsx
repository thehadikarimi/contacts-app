import ContactItem from "./ContactItem";

function FavoriteContacts({
  contacts,
  favoriteHandler,
  deleteHandler,
  checkedHandler,
}) {
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
          <ContactItem
            key={contact.id}
            data={contact}
            favoriteHandler={favoriteHandler}
            deleteHandler={deleteHandler}
            checkedHandler={checkedHandler}
            notHover={true}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteContacts;
