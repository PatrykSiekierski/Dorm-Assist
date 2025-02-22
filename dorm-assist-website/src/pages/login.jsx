import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginAndGetToken } from "../components/Utils/authService";
import { useState } from "react";
import Navbar from "../components/Universal/navbar";
import LoginContainer from "../components/LoginAndRegister/loginContainer";
import Footer from "../components/Universal/footer";

export default function LoginForm() {
  return (
    <>
      <Navbar />
      <main>
        <LoginContainer />
      </main>
      <Footer />
    </>
  );
}
