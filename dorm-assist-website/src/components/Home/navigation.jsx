import { useState } from "react";
import "../../styles/Home/_navigationArticle.scss";

const navigationContent = [
  {
    title: "Zgłoś problem na stronie",
    description:
      'Możesz zgłosić problem na stronie poprzez zakładkę "Zgłoś Online" lub przycisk poniżej. Jednak w celu złożenia zgłoszenia wymagane będzie zalogowanie.',
  },
  {
    title: "Zgłoś problem w recepcji",
    description:
      "Możesz zgłosić problem w zeszycie przy recepcji. Administratorzy i recepcja regularnie sprawdzają zgłoszone w nim problemy i przychodzą w dogodnym terminie. " +
      "Wystarczy zostawić numer pokoju, imie i nazwisko, ale opis problemu jest mile widziany.",
  },
  {
    title: "Zgłoś problem osobiście (w szczególnych przypadkach)",
    description:
      "Możesz podejść do pokoju 404 i zapukać, powinien odpowiedzieć jeden z administratorów i Ci pomóc. " +
      "Prosimy jednak o przychodzenie w ten sposób tylko w ważniejszych przypadkach, a także w rozsądnych godzinach, np. " +
      "w przypadku przyjścia po godzinie 22:00 administratorzy mogą odmówić pomocy.",
  },
];

export default function Navigation() {
  const [option, setOption] = useState(1);

  let title;
  let content;
  if (option == 1) {
    title = navigationContent[0].title;
    content = navigationContent[0].description;
  } else if (option == 2) {
    title = navigationContent[1].title;
    content = navigationContent[1].description;
  } else if (option == 3) {
    title = navigationContent[2].title;
    content = navigationContent[2].description;
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
            text="Na stronie"
            target="1"
            selectedOption={{ option, setOption }}
          />
          <OptionButton
            text="W recepcji"
            target="2"
            selectedOption={{ option, setOption }}
          />
          <OptionButton
            text="Osobiście"
            target="3"
            selectedOption={{ option, setOption }}
          />
        </div>
        <div id="option-description">
          <h3>{title}</h3>
          <p>{content}</p>
          {option == 1 ? (
            <a className="button button-like-link" href="/report">
              Zgłoś na stronie
            </a>
          ) : (
            <></>
          )}
        </div>
      </div>
    </article>
  );
}

function OptionButton({ text, target, selectedOption }) {
  return (
    <button
      className={`button ${
        selectedOption.option == target ? "selected-button" : ""
      }`}
      onClick={() => selectedOption.setOption(target)}
    >
      {text}
    </button>
  );
}
