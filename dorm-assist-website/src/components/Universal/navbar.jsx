import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  clearToken,
  getUserRole,
  isTokenValid,
} from "../Utils/tokenUtility.js";
import { isAdmin } from "../Utils/authService";

export default function Navbar() {
  const navigate = useNavigate();

  const [navbarState, setNavbarState] = useState(false);

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

  function toggleNavbar() {
    setNavbarState(!navbarState);
  }

  return (
    <nav>
      <a href="/">
        <img src="src/assets/cable-lan-svgrepo-com.svg" alt="Logo" />
      </a>
      <button className="navbar-extender" onClick={toggleNavbar}>
        <img src="src/assets/list-svg.svg" alt="Logo" />
      </button>
      <ul className={"navbar-links"}>
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

      <ul className={"navbar-user"}>
        {!isUserLoggedIn ? (
          <>
            <li>
              <a href="/login">Zaloguj</a>
            </li>
            <li className="border-special">
              <a href="/register">Zarejestruj</a>
            </li>
          </>
        ) : (
          <>
            <li className="border-special">
              <a href="/" onClick={logOut}>
                Wyloguj
              </a>
            </li>
            <li>
              <a href="/settings">Profil</a>
            </li>
          </>
        )}
      </ul>

      <ul className={"navbar-small" + (navbarState ? "" : " hide")}>
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
        {!isUserLoggedIn ? (
          <>
            <li>
              <a href="/login">Zaloguj</a>
            </li>
            <li className="border-special">
              <a href="/register">Zarejestruj</a>
            </li>
          </>
        ) : (
          <>
            <li className="border-special">
              <a href="/" onClick={logOut}>
                Wyloguj
              </a>
            </li>
            <li>
              <a href="/settings">Profil</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
