import "../../styles/_faqArticle.scss";

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
            text: "Wi-fi obejmuje swoim zasięgiem tylko okolice parteru, jednak jeżeli chcesz używać wi-fi możesz skorzystać z hotspotu",
          }}
        />
        <FaqElement
          img={{
            src: "src/assets/cable-lan-svgrepo-com.svg",
            alt: "placeholder_logo",
          }}
          info={{
            title: "Jak mieć internet w pokoju",
            text: "Podłącz sie do gniazdka XD",
          }}
        />
        <FaqElement
          img={{
            src: "src/assets/cable-lan-svgrepo-com.svg",
            alt: "placeholder_logo",
          }}
          info={{
            title: "Jak mieć internet w pokoju",
            text: "Podłącz sie do gniazdka XD",
          }}
        />
        <FaqElement
          img={{
            src: "src/assets/cable-lan-svgrepo-com.svg",
            alt: "placeholder_logo",
          }}
          info={{
            title: "Jak połączyć sie z Wi-Fi?",
            text: "Wi-fi obejmuje swoim zasięgiem tylko okolice parteru, jednak jeżeli chcesz używać wi-fi możesz skorzystać z hotspotu",
          }}
        />
      </div>
    </article>
  );
}

function FaqElement({ img, info }) {
  return (
    <div>
      <img src={img.src} alt={img.alt} />
      <div>
        <h3>{info.title}</h3>
        <p>{info.text}</p>
      </div>
    </div>
  );
}
