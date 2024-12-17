export default function CategoryPanel({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="category-panel">
      <Category
        key={1}
        title={"Zgłoszenia"}
        setSelectedCategory={setSelectedCategory}
      />
      <Category
        key={2}
        title={"Użytkownicy"}
        setSelectedCategory={setSelectedCategory}
      />
      <Category
        key={3}
        title={"Historia"}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

function Category({ title, setSelectedCategory }) {
  function changeCategory() {
    setSelectedCategory(title);
  }

  return (
    <button
      className="category-panel__category"
      onClick={() => changeCategory()}
    >
      {title}
    </button>
  );
}
