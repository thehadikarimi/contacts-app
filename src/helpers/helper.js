import api from "../services/config";

const updateContacts = async (dispatch, toast) => {
  try {
    const data = await api.get("/api.contacts");
    dispatch({ type: "SUCCESS", payload: data });
  } catch (error) {
    return toast.error(error.message);
  }
};

export { updateContacts };
