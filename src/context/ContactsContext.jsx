import { createContext, useContext, useEffect, useReducer } from "react";
import api from "../services/config";

const ContactsContext = createContext();

function ContactsProvider({ children }) {
  const initialState = {
    loading: true,
    contacts: [],
    error: "",
    checkedContacts: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SUCCESS":
        return {
          loading: false,
          contacts: action.payload,
          error: "",
          checkedContacts: state.checkedContacts,
        };
      case "FAILED":
        return {
          loading: false,
          contacts: state.contacts,
          error: action.payload,
          checkedContacts: state.checkedContacts,
        };
      case "ADD_CHECKED_CONTACT":
        return {
          loading: state.loading,
          contacts: state.contacts,
          error: state.error,
          checkedContacts: action.payload,
        };
      case "REMOVE_CHECKED_CONTACT":
        return {
          loading: state.loading,
          contacts: state.contacts,
          error: state.error,
          checkedContacts: action.payload,
        };
      default:
        throw new Error("Invalid Action!");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts = await api.get("/api.contacts");
        dispatch({ type: "SUCCESS", payload: contacts });
      } catch (error) {
        dispatch({ type: "FAILED", payload: error.message });
      }
    };

    fetchContacts();
  }, []);

  return (
    <ContactsContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
}

const useContacts = () => {
  const data = useContext(ContactsContext);
  return data;
};

export default ContactsProvider;
export { useContacts };
