import './styles.css';
import { useState } from "react";
import { generateShortenedUrl } from './service'

function Main() {
    const [longurl, setLongurl] = useState("");
    const [shorturl, setShorturl] = useState("");
    const [returnLongURL, setReturnLongURL] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        generateShortenedUrl(longurl).then((data) => {
		    setShorturl(data.short_url);
		    setReturnLongURL(data.original_url);
		    setLongurl("");
		});
    };

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="text"
        name="longurl"
        value={longurl}
        onChange={(e) => setLongurl(e.target.value)}
      />
      <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          disabled={!longurl}
      >
          shorten
      </button>
      <div>
          <p>Long URL: {returnLongURL}</p>
          <p
              style={{ cursor: "pointer" }}
              onClick={() => window.open(returnLongURL)}
          >
              Short URL: {shorturl}
          </p>
      </div>
    </div>
  );
}

export { Main };