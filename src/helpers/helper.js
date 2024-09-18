const saveToLocalStorage = (data) => {
  localStorage.setItem("contactsList", JSON.stringify(data));
};

export { saveToLocalStorage };
