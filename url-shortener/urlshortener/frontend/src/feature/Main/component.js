import './styles.scss';
import { useState, useEffect } from "react";
import { generateShortenedUrl, getShortenedUrls, deleteShortenedUrl } from './service'
import { Link } from "react-router-dom";

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
          console.log(data);
          setUrlList([...urlList, data]);
  		});
    };

    const handleDelete = (e, id) => {
        e.preventDefault();

        deleteShortenedUrl(id).then((data) => {
          setUrlList(urlList.filter(url => url.id !== id));
        });
    };

  return (
    <section className="Main">
      <div className="main-page">
        <div className="main-page__input">
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
        <div className="main-page__list">
          {urlList.map((url) => (
            <div key={url.short_url}>
              <span>{url.short_url}</span>
              <button 
                type="submit"
                onClick={(e) => handleDelete(e, url.id)}
              >
                delete
              </button>
              <Link to={`/stats/${url.id}`}>Stats</Link>
            </div>
          ))
        }
        </div>
      </div>
    </section>
  );
}

export { Main };