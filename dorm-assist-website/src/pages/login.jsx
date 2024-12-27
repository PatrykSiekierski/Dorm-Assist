import Navbar from "../components/Universal/navbar";
import Footer from "../components/Universal/footer";
import LoginContainer from "../components/LoginAndRegister/loginContainer";

export default function Login() {
  return (
    <>
      <Navbar />
      <main>
        <LoginContainer page="login" />
      </main>
      <Footer />
    </>
  );
}
