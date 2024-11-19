import api from "../services/config";

const updateContacts = async (dispatch, toast) => {
  try {
    const contacts = await api.get("/api.contacts/");
    dispatch({ type: "SUCCESS", payload: contacts });
  } catch (error) {
    return toast.error(error.message);
  }
};

export { updateContacts };
