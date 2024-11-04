import { useState } from "react";
import "../../styles/_navigationArticle.scss";

const navigationContent = [
  {
    title: "Zgłoś problem w recepcji",
    description:
      "Możesz zgłosić problem w zeszycie przy recepcji. " +
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem, hic sunt nemo rerum autem ab nisi iste ratione itaque earum id tempora quis laborum impedit." +
      "Corrupti ducimus illum excepturi architecto culpa consequuntur, est, iure nisi rerum voluptas iste libero reiciendis quidem facere repellendus repellat sapiente rem assumenda nam ipsa minus.",
  },
  {
    title: "Zgłoś problem na stronie",
    description:
      "Możesz zgłosić problem na stronie" +
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem, hic sunt nemo rerum autem ab nisi iste ratione itaque earum id tempora quis laborum impedit." +
      "Corrupti ducimus illum excepturi architecto culpa consequuntur, est, iure nisi rerum voluptas iste libero reiciendis quidem facere repellendus repellat sapiente rem assumenda nam ipsa minus.",
  },
  {
    title: "Zgłoś problem osobiście (tylko w nagłych przypadkach)",
    description:
      "Możesz podejść do pokoju 303 i zapukać, powinien odpowiedzieć jeden z administratorów i Ci pomóc w najszybszym tempie" +
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem, hic sunt nemo rerum autem ab nisi iste ratione itaque earum id tempora quis laborum impedit." +
      "Corrupti ducimus illum excepturi architecto culpa consequuntur, est, iure nisi rerum voluptas iste libero reiciendis quidem facere repellendus repellat sapiente rem assumenda nam ipsa minus.",
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
        <div id="option-description">
          <h3>{title}</h3>
          <p>{content}</p>
          {option == 3 ? <button className="button">test</button> : <></>}
          {/* <button>Navigation button</button> */}
        </div>
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
    <button
      className={selectedOption.option == target ? "selected-button" : ""}
      onClick={() => selectedOption.setOption(target)}
    >
      {text}
    </button>
  );
}
