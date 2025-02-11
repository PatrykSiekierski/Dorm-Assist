import { useState } from "react";
import ChangePassword from "./changePassword";
import ChangeUsername from "./changeUsername";
import DeleteAccount from "./deleteAccount";

export default function MainInterface({ selectedCategory }) {
  // const avilableCategories = [
  //   "Zmień hasło",
  //   "Zmień nazwe użytkownika",
  //   "Usuń konto",
  // ];

  return (
    <div className="report-viewer__panel">
      <div className="report-viewer__panel__title">
        <h2>{selectedCategory}</h2>
      </div>
      <hr />
      <div className="report-viewer__panel__content">
        {selectedCategory == "Zmień hasło" && <ChangePassword />}
        {selectedCategory == "Zmień nazwe użytkownika" && <ChangeUsername />}
        {selectedCategory == "Usuń konto" && <DeleteAccount />}
      </div>
    </div>
  );
}
