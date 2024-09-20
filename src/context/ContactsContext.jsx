import { createContext, useContext, useEffect, useReducer } from "react";
import api from "../services/config";

const ContactsContext = createContext();

function ContactsProvider({ children }) {
  const initialState = { loading: true, data: [], error: "" };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SUCCESS":
        return { loading: false, data: action.payload, error: "" };
      case "FAILED":
        return { loading: false, data: state.data, error: action.payload };
      default:
        throw new Error("Invalid Action!");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await api.get("/api.contacts");
        dispatch({ type: "SUCCESS", payload: data });
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
