export default function CategoryPanel({
  selectedCategory,
  setSelectedCategory,
  avilableCategories,
}) {
  return (
    <div className="category-panel">
      {avilableCategories.map((element, index) => (
        <Category
          key={index}
          title={element}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
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
