import Navbar from "../components/Universal/navbar";
import Footer from "../components/Universal/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAdmin } from "../components/Utils/authService";
import LoadingScreen from "../components/Utils/loadingScreen";
import ContentPanel from "../components/Universal/Container/contentPanel";
import MainWindow from "../components/AdminPanel/mainWindow";

export default function AdminPanel() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const hasAdminAccess = await isAdmin(token);
      if (!hasAdminAccess) {
        navigate("/");
      } else {
        setVerified(true);
      }
    };

    verifyAdmin();
  }, [navigate, token]);

  const avilableCategories = ["Zgłoszenia", "Użytkownicy"];

  if (verified) {
    return (
      <>
        <header>
          <Navbar />
        </header>
        <main>
          <ContentPanel
            avilableCategories={avilableCategories}
            mainWindow={MainWindow}
          />
        </main>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <header>
          <Navbar />
        </header>
        <main>
          <LoadingScreen />
        </main>
      </>
    );
  }
}
