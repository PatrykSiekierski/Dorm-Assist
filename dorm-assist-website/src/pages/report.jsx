import Navbar from "../components/Universal/navbar";
import Footer from "../components/Universal/footer";
import Info from "../components/Report/info";
import { useEffect, useState } from "react";
import { isAdmin } from "../components/Utils/authService";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/Utils/loadingScreen";

export default function Report() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const hasAdminAccess = await isAdmin(token);
      if (!hasAdminAccess) {
        navigate("/login");
      } else {
        setVerified(true);
      }
    };

    verifyAdmin();
  }, [navigate, token]);

  if (verified) {
    return (
      <>
        <Navbar />
        <main>
          <Info />
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
