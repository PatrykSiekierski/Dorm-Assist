import Navbar from "../components/Universal/navbar";
import Main from "../components/Home/main";
import FAQ from "../components/Home/faq";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Main />
        <FAQ />
      </main>
    </>
  );
}
