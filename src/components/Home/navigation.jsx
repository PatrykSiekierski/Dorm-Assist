import { useState } from "react";
import "../../styles/_navigationArticle.scss";

export default function Navigation() {
  const [option, setOption] = useState(1);

  let x;
  if (option == 1) {
    x = "Możesz zgłosić problem w zeszycie przy recepcji.";
  } else if (option == 2) {
    x = "Możesz zgłosić problem na stronie.";
  } else if (option == 3) {
    x =
      "Możesz podejść do pokoju 303 i zapukać, powinien odpowiedzieć jeden z administratorów i Ci pomóc.";
  }

  return (
    <article id="Navigation-Article">
      <h1>Mam dalej problem, co teraz?</h1>
      <p>
        Jeżeli nie udało sie znaleźć odpowiedzi na twój problem powyżej, możesz
        zgłosić problem w jeden z następujących sposobów:
      </p>
      <div id="navigation-main-content">
        <div id="option-container">
          <OptionButton
            text="W recepcji"
            target="1"
            selectedOption={{ option, setOption }}
          />
          <OptionButton
            text="Na stronie"
            target="2"
            selectedOption={{ option, setOption }}
          />
          <OptionButton
            text="Osobiście"
            target="3"
            selectedOption={{ option, setOption }}
          />
        </div>
        <p>{x}</p>
        {/* <p>- Będąc zalogowanym możesz patrzeć na historie swoich zgłoszeń</p>
        <p>2. Możesz zgłosić problem w zeszycie przy recepcji</p>
        <p>
          3. Możesz podejść do pokoju 303 i zapukać, powinien odpowiedzieć jeden
          z administratorów i Ci pomóc
        </p> */}
      </div>
    </article>
  );
}

function OptionButton({ text, target, selectedOption }) {
  return (
    <button onClick={() => selectedOption.setOption(target)}>
      {text}, {selectedOption.option}
    </button>
  );
}
