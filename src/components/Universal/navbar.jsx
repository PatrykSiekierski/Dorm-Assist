import "../../styles/General/_navbar.scss";

export default function Navbar() {
  return (
    <nav>
      <a href="/">
        <img src="src/assets/cable-lan-svgrepo-com.svg" alt="Logo" />
      </a>
      <ul>
        <li>
          <a href="#faq-article">Pytania</a>
        </li>
        <li>
          <a href="#Navigation-Article">Jak zgłosić problem?</a>
        </li>
        <li>
          <a href="/report">Zgłoś problem</a>
        </li>
      </ul>
      <ul>
        <li>
          <a>Login</a>
        </li>
        <li className="border-special">
          <a>Sign up</a>
        </li>
      </ul>
    </nav>
  );
}
