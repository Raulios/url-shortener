import './styles.scss';
import { useState, useEffect } from "react";
import { generateShortenedUrl, getShortenedUrls, deleteShortenedUrl } from './service'
import { Link } from "react-router-dom";

function Main() {
    const [urlList, setUrlList] = useState([]);
    const [longurl, setLongurl] = useState("");
    const [shorturl, setShorturl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [returnLongURL, setReturnLongURL] = useState("");

    useEffect(() => {
      getShortenedUrls().then((data) => {
        setUrlList(data);
      });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        generateShortenedUrl(longurl).then((data) => {
          if(data?.short_url) {
            setShorturl(data.short_url);
            setReturnLongURL(data.original_url);
            setLongurl("");
            if(!urlList.find(url => url.id === data.id)) setUrlList([data, ...urlList]);
            setErrorMessage("");
          } else {
            setErrorMessage(data);
          }
  		});
    };

    const handleDelete = (e, id) => {
        e.preventDefault();

        deleteShortenedUrl(id).then((data) => {
          setUrlList(urlList.filter(url => url.id !== id));
        });
    };

  return (
    <section className="main-page">
      <h1 className="main-page__title">Definitely not bit.ly</h1>
      <div className="main-page__content">
        <div className="main-page__input-wrapper">
          <input
            type="text"
            name="longurl"
            value={longurl}
            className="main-page__input"
            onChange={(e) => setLongurl(e.target.value)}
          />
          <button
              className="main-page__main-btn"
              type="submit"
              onClick={(e) => handleSubmit(e)}
              disabled={!longurl}
          >
            Short it!
          </button>
        </div>
        <div className="main-page__notification">Your shortened url: {shorturl}</div>
        <div className="main-page__notification">{errorMessage}</div>
      </div>
      <div className="main-page__list">
        {urlList.map((url) => (
          <div className="main-page__list-item" key={url.short_url}>
            <div className="main-page__text-wrapper">
              <span className="main-page__text main-page__text--highlighted">{url.short_url}</span>
              <span className="main-page__text">Redirects to: {url.original_url}</span>
            </div>
            <div>
              <Link className="main-page__link" to={`/stats/${url.id}`}>See Link Stats</Link>
              <button 
                type="submit"
                className="main-page__btn"
                onClick={(e) => handleDelete(e, url.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      }
      </div>
    </section>
  );
}

export { Main };