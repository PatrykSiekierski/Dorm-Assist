import "../../styles/_navbar.scss";

export default function Navbar() {
  return (
    <nav>
      <a href="home.jsx">
        <img src="src/assets/cable-lan-svgrepo-com.svg" alt="Logo" />
      </a>
      <ul>
        <li>
          <a>FAQ</a>
        </li>
        <li>
          <a href="/navbar.jsx">Report</a>
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
