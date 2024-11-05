import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ContactsPage from "./pages/ContactsPage";
import ContactPage from "./pages/ContactPage";
import NewContactPage from "./pages/NewContactPage";
import PageNotFound from "./pages/404";
import Layout from "./layout/Layout";
import ContactsProvider from "./context/ContactsContext";
import ScrollToTop from "./shared/ScrollToTop";

function App() {
  return (
    <ContactsProvider>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" replace />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/contacts/:id" element={<ContactPage />} />
          <Route path="/new" element={<NewContactPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
      <ToastContainer rtl={true} autoClose={2000} pauseOnFocusLoss={false} />
    </ContactsProvider>
  );
}

export default App;
