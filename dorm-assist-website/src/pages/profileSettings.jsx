import MainWindow from "../components/AdminPanel/mainWindow";
import CategoryPanel from "../components/Universal/Container/categoryPanel";
import ContentPanel from "../components/Universal/Container/contentPanel";
import ChangePassword from "../components/ProfileSettings/changePassword";
import ChangeUsername from "../components/ProfileSettings/changeUsername";
import DeleteAccount from "../components/ProfileSettings/deleteAccount";
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
          pages={[ChangePassword, ChangeUsername, DeleteAccount]}
        />
      </main>
      <Footer />
    </>
  );
}
