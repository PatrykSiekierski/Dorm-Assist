import "../../styles/Home/_mainArticle.scss";

export default function Main() {
  return (
    <main>
      <article id="main-article">
        <div>
          <h1>Problem z internetem w akademiku Uniwersyteckim?</h1>
          <p>
            Zobacz jak możesz samodzielnie rozwiązać problem,<br></br> lub zgłoś
            problem gdy to nie pomoże,<br></br> a administrator przyjdzie po
            Ciebie.
          </p>

          <div id="buttons">
            <button className="button">Zgłoś</button>
            <button className="border-special button">Login</button>
          </div>
        </div>
        <div>
          <img src="src/assets/laptop1-svgrepo-com.svg" />
        </div>
      </article>
    </main>
  );
}
