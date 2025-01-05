import { useNavigate } from "react-router-dom";
import "../../styles/General/_navbar.scss";
import {
  clearToken,
  getUserRole,
  isTokenValid,
} from "../Utils/tokenUtility.js";

export default function Navbar() {
  const navigate = useNavigate();

  const isUserLoggedIn = isTokenValid();
  const role = getUserRole();

  function logOut(event) {
    event.preventDefault();
    clearToken();
    navigate("/");
  }

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
          <a href="/#Navigation-Article">Jak zgłosić problem?</a>
        </li>
        <li>
          <a href="/report">Zgłoś Online</a>
        </li>
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
          <li className="border-special">
            <a href="/" onClick={logOut}>
              Log out
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
