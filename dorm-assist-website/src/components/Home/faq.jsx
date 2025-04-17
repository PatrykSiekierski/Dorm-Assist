import "../../styles/Home/_faqArticle.scss";

export default function FAQ() {
  return (
    <article id="faq-article">
      <h1 className="enlarge-text">Częste pytania</h1>
      <p>
        Wi-fi? Jak połączyć sie z internetem? Lub inne problemy, które można
        samemu rozwiązać:
      </p>
      <div id="faq-container">
        <FaqElement
          img={{
            src: "src/assets/cable-lan-svgrepo-com.svg",
            alt: "placeholder_logo",
          }}
          info={{
            title: "Jak połączyć sie z Wi-Fi?",
            text: "Wi-fi obejmuje swoim zasięgiem tylko okolice parteru, jednak jeżeli chcesz używać wi-fi możesz skorzystać z hotspotu.",
          }}
        />
        <FaqElement
          img={{
            src: "src/assets/cable-lan-svgrepo-com.svg",
            alt: "placeholder_logo",
          }}
          info={{
            title: "Jak mieć internet w pokoju",
            text:
              "Należy podłączyć się kablem Ethernet (RJ-45) do odpowiedniego gniazdka." +
              "Następnie przy próbach otwierania różnych kart przeglądarki powinno nastąpić prekierowanie" +
              " do stronu uniwersyteckiej w celu weryfikacji.",
          }}
        />
        <FaqElement
          img={{
            src: "src/assets/cable-lan-svgrepo-com.svg",
            alt: "placeholder_logo",
          }}
          info={{
            title: "Czy mogę używać routera?",
            text: "Z powodów bezpieczeństwa routery są zakazane. Jeżeli chcesz mieć Wi-Fi w pokoju zalecamy użycie hotspotu, bądź switcha.",
          }}
        />
        <FaqElement
          img={{
            src: "src/assets/cable-lan-svgrepo-com.svg",
            alt: "placeholder_logo",
          }}
          info={{
            title: "Jestem podłączony ale internet dalej nie działa.",
            text: "Poniżej możesz zobaczyć sposoby komunikacji z administratorami sieci. Wybierz dogodny sposób i pomoc powinna przyjść tego samego dnia.",
          }}
        />
      </div>
    </article>
  );
}

function FaqElement({ img, info }) {
  return (
    <div className="faq-element">
      <img src={img.src} alt={img.alt} />
      <div>
        <h3>{info.title}</h3>
        <p>{info.text}</p>
      </div>
    </div>
  );
}
