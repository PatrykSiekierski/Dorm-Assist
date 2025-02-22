import Navbar from "../components/Universal/navbar";
import Footer from "../components/Universal/footer";
import LoginContainer from "../components/LoginAndRegister/loginContainer";
import RegisterContainer from "../components/LoginAndRegister/registerContainer";

export default function Register() {
  return (
    <>
      <Navbar />
      <main>
        {/* <LoginContainer page="register" /> */}
        <RegisterContainer />
      </main>
      <Footer />
    </>
  );
}
