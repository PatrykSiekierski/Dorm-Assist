import CategoryPanel from "../components/Universal/Container/categoryPanel";
import ContentPanel from "../components/Universal/Container/contentPanel";
import MainInterface from "../components/ProfileSettings/mainInterface";
import Footer from "../components/Universal/footer";
import Navbar from "../components/Universal/navbar";

export default function ProfileSettings() {
  const avilableCategories = [
    "Zmień hasło",
    "Zmień nazwe użytkownika",
    "Usuń konto",
  ];

  return (
    <>
      <Navbar />
      <main>
        <ContentPanel
          avilableCategories={avilableCategories}
          mainWindow={MainInterface}
        />
      </main>
      <Footer />
    </>
  );
}
