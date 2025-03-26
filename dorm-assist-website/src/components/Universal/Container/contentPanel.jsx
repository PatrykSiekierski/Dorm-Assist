import { useState } from "react";
import CategoryPanel from "./categoryPanel";

export default function ContentPanel({
  avilableCategories,
  mainWindow: MainWindow,
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    avilableCategories[0]
  );

  return (
    <div className="report-viewer">
      <CategoryPanel
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        avilableCategories={avilableCategories}
      />
      <MainWindow selectedCategory={selectedCategory} />
    </div>
  );
}
