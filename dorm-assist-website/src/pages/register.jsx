import Navbar from "../components/Universal/navbar";
import Footer from "../components/Universal/footer";
import LoginContainer from "../components/LoginAndRegister/loginContainer";

export default function Register() {
  return (
    <>
      <Navbar />
      <main>
        <LoginContainer page="register" mainWindow={MainInterface} />
      </main>
      <Footer />
    </>
  );
}
