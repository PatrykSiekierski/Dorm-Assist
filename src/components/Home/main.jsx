import "../../styles/_mainArticle.scss";

export default function Main() {
  return (
    <main>
      <article id="main-article">
        <div>
          <h1>Problem z internetem w akademiku Uniwersyteckim?</h1>
          <h3>
            Zobacz jak możesz samodzielnie rozwiązać problem,<br></br> lub zgłoś
            problem przez te stronę,<br></br> a administrator przyjdzie do
            Ciebie.
          </h3>

          <div id="buttons">
            <button>Zgłoś</button>
            <button className="border-special">Login</button>
          </div>
        </div>
        <div>
          <img src="src/assets/laptop1-svgrepo-com.svg" />
        </div>
      </article>
    </main>
  );
}
