import Navbar from "../components/Universal/navbar";
import Footer from "../components/Universal/footer";
import MainAdmin from "../components/AdminPanel/mainAdmin";

export default function AdminPanel() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <MainAdmin />
      </main>
      <Footer />
    </>
  );
}
