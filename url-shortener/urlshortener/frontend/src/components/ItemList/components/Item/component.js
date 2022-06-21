import './styles.scss';
import { Link } from "react-router-dom";

const Item = (props) => {
	return(
		<div className="main-page__list-item">
	        <div className="main-page__text-wrapper">
	          <span className="main-page__text main-page__text--highlighted">{props.url.short_url}</span>
	          <span className="main-page__text">Redirects to: {props.url.original_url}</span>
	        </div>
	        <div>
	          <Link className="main-page__link" to={`/stats/${props.url.id}`}>See Link Stats</Link>
	          <button 
	            type="submit"
	            className="main-page__btn"
	            onClick={(e) => {props.handleDelete(e, props.url.id)}}
	          >
	            Delete
	          </button>
	        </div>
      	</div>
	)
}

export { Item };