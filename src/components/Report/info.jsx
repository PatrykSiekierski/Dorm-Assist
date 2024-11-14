import "../../styles/Report/_info.scss";

export default function Info() {
  return (
    <article id="info-article">
      <h1 className="center-text">Wypełnij informacje</h1>
      <div className="grid-form border">
        <div id="icon-side">
          <img src="src/assets/form-icon.svg" alt="form icon" />
          <h2>Dlaczego o to pytamy?</h2>
          <p>
            Dzięki tym informacjom możemy zawęzić krąg podejrzeń co poszło nie
            tak i szybciej udzielić pomocy.
          </p>
          {/* <h2>Czy można zostawić wszystko puste?</h2>
          <p>
            Jedynie pokój trzeba faktycznie wypełnić, inaczej nie będziemy
            wiedzieć gdzie przyjść, ale ostatecznie damy radę nawet bez
            informacji, tylko dłużej
          </p> */}
        </div>
        <div className="form-side">
          <h2>Informacje czy coś</h2>
          <form action="" className="form-holder">
            <div className="form-segment">
              <label htmlFor="room">Number pokoju:</label>
              <input type="text" id="room" placeholder="303A" />
            </div>
            {/* <label htmlFor="problem">Opisz krótko problem:</label>
        <input type="text" id="problem" placeholder="" /> */}
            <div className="form-segment">
              <label htmlFor="system">System operacyjny: </label>
              <select id="system">
                <option value="windows">Windows</option>
                <option value="macos">MacOs</option>
                <option value="linux">Linux</option>
                <option value="android">Android</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-segment">
              <label htmlFor="self">
                Czy gniazdko jest poprawnie zamątowane?
              </label>
              <input type="checkbox" id="self" />
            </div>
            <div className="form-segment">
              <label htmlFor="self">Czy Interent działał wcześniej?</label>
              <input type="checkbox" id="self" />
            </div>
            <div className="form-segment">
              <label htmlFor="opis">Opisz krótko problem:</label>
              <textarea
                id="opis"
                placeholder="Gniazdko nie ma wejścia Ethernet."
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </article>
  );
}
