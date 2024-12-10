export default function CategoryPanel({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="category-panel">
      <Category key={1} title={"Złoszenia"} />
      <Category key={2} title={"Użytkownicy"} />
      <Category key={3} title={"Historia"} />
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
