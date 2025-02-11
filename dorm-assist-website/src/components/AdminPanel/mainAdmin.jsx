import { useState } from "react";
// import CategoryPanel from "./categoryPanel";
import MainWindow from "./mainWindow";
import ContentPanel from "../Universal/Container/contentPanel";

export default function MainAdmin() {
  // const [selectedCategory, setSelectedCategory] = useState("Zgłoszenia");
  // const avilableCategories = ["Zgłoszenia", "Użytkownicy", "Historia"];

  // return (
  //   <div>
  //     <div className="report-viewer">
  //       <CategoryPanel
  //         selectedCategory={selectedCategory}
  //         setSelectedCategory={setSelectedCategory}
  //         avilableCategories={avilableCategories}
  //       />
  //       <MainWindow selectedCategory={selectedCategory} />
  //     </div>
  //   </div>
  // );

  const avilableCategories = ["Zgłoszenia", "Użytkownicy", "Historia"];

  return (
    <ContentPanel
      avilableCategories={avilableCategories}
      mainWindow={MainWindow}
    />
  );
}
