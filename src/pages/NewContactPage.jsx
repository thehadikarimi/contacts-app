import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ContactForm from "../components/ContactForm";

function NewContactPage() {
  return (
    <div>
      <ContactForm />
      <ToastContainer rtl={true} autoClose={2000} pauseOnFocusLoss={false} />
    </div>
  );
}

export default NewContactPage;
