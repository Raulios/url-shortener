import './styles.scss';
import { Link } from "react-router-dom";

const Item = (props) => {
	return(
		<div className="item">
	        <div className="item__text-wrapper">
	          <span className="item__text item__text--highlighted">{props.url.short_url}</span>
	          <span className="item__text">Redirects to: {props.url.original_url}</span>
	        </div>
	        <div>
	          <Link className="item__link" to={`/stats/${props.url.id}`}>See Link Stats</Link>
	          <button 
	            type="submit"
	            className="item__btn"
	            onClick={(e) => {props.handleDelete(e, props.url.id)}}
	          >
	            Delete
	          </button>
	        </div>
      	</div>
	)
}

export { Item };