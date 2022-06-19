import './styles.css';
import { useState, useEffect } from "react";
import { generateShortenedUrl, getShortenedUrls } from './service'

function Main() {
    const [urlList, setUrlList] = useState([]);
    const [longurl, setLongurl] = useState("");
    const [shorturl, setShorturl] = useState("");
    const [returnLongURL, setReturnLongURL] = useState("");

    useEffect(() => {
      getShortenedUrls().then((data) => {
        setUrlList(data);
      });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        generateShortenedUrl(longurl).then((data) => {
		    setShorturl(data.short_url);
		    setReturnLongURL(data.original_url);
		    setLongurl("");
		});
    };

  return (
    <section className="Main">
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
      <div>
        {urlList.map((url) => (
          <span key={url.id}>{url.short_url}</span>
        ))
      }
      </div>
    </section>
  );
}

export { Main };