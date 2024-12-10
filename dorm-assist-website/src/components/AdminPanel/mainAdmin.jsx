import { useState } from "react";
import CategoryPanel from "./categoryPanel";
import MainWindow from "./mainWindow";

export default function MainAdmin() {
  const [selectedCategory, setSelectedCategory] = useState("Zgłoszenia");

  return (
    <div>
      <div className="report-viewer">
        <CategoryPanel
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <MainWindow selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
