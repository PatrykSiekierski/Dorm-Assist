import { useNavigate } from "react-router-dom";
import "../../styles/General/_navbar.scss";
import { useState, useEffect } from "react";
import {
  clearToken,
  getUserRole,
  isTokenValid,
} from "../Utils/tokenUtility.js";
import { isAdmin } from "../Utils/authService";

export default function Navbar() {
  const navigate = useNavigate();

  const isUserLoggedIn = isTokenValid();
  const role = getUserRole();

  function logOut(event) {
    event.preventDefault();
    clearToken();
    navigate("/");
    setVerified(false);
  }

  const token = localStorage.getItem("token");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const hasAdminAccess = await isAdmin(token);
      if (hasAdminAccess) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    };

    verifyAdmin();
  }, []);

  return (
    <nav>
      <a href="/">
        <img src="src/assets/cable-lan-svgrepo-com.svg" alt="Logo" />
      </a>
      <ul>
        <li>
          <a href="/#faq-article">Pytania</a>
        </li>
        <li>
          <a href="/report">Zgłoś Online</a>
        </li>
        {verified && (
          <li>
            <a href="/admin">Admin panel</a>
          </li>
        )}
      </ul>
      <ul>
        {!isUserLoggedIn ? (
          <>
            <li>
              <a href="/login">Login</a>
            </li>
            <li className="border-special">
              <a href="/register">Sign up</a>
            </li>
          </>
        ) : (
          <>
            <li className="border-special">
              <a href="/" onClick={logOut}>
                Wyloguj
              </a>
            </li>
            <li style={{ marginLeft: "1rem" }}>
              <a href="/settings">Profil</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
