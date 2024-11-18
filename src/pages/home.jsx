import Navbar from "../components/Universal/navbar";
import Main from "../components/Home/main";
import FAQ from "../components/Home/faq";
import Footer from "../components/Universal/footer";
import Navigation from "../components/Home/navigation";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Main />
        <FAQ />
        <Navigation />
      </main>
      <Footer />
    </>
  );
}
