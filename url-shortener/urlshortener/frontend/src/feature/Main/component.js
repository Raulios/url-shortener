import './styles.scss';
import { useState, useEffect } from "react";
import { generateShortenedUrl, getShortenedUrls, deleteShortenedUrl } from './service'

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

    const handleDelete = (e, id) => {
        e.preventDefault();

        deleteShortenedUrl(id).then((data) => {
          setUrlList(urlList.filter(url => url.id !== id));
        });
    };

  return (
    <section  className="Main">
      <div class="main-page">
        <div class="main-page__input">
          <div>
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
          </div>
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
        <div class="main-page__list">
          {urlList.map((url) => (
            <div key={url.id}>
              <span>{url.short_url}</span>
              <button 
                type="submit"
                onClick={(e) => handleDelete(e, url.id)}
              >
                delete
              </button>
            </div>
          ))
        }
        </div>
      </div>
    </section>
  );
}

export { Main };