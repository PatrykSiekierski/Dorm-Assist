import Navbar from "../components/Universal/navbar";
import Footer from "../components/Universal/footer";
import MainAdmin from "../components/AdminPanel/mainAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAdmin } from "../components/Utils/authService";

export default function AdminPanel() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyAdmin = async () => {
      const hasAdminAccess = await isAdmin(token);
      if (!hasAdminAccess) {
        navigate("/");
      }
    };

    verifyAdmin();
  }, [navigate, token]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <MainAdmin />
      </main>
      <Footer />
    </>
  );
}
