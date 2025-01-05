import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/home";
import Report from "./pages/report";
import "./App.css";
import AdminPanel from "./pages/adminPanel";
import Login from "./pages/login";
import Register from "./pages/register";
import { clearToken, isTokenValid } from "./components/Utils/tokenUtility";

function App() {
  // const [count, setCount] = useState(0);

  const token = localStorage.getItem("token");
  if (!isTokenValid(token)) {
    clearToken;
  } else {
    console.log("Token is falid");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="report" element={<Report />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );

  // return (
  //   <>

  //     <Home />
  //     {/* <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p> */}
  //   </>
  // );
}

export default App;
