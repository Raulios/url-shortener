import './styles.scss';
import { Item } from "../ItemList/components/Item/component"

const ItemList = (props) => {
	return(
		<div className="main-page__list">
        {props.urlList.map((url) => (
          <Item key={url.short_url} url={url} handleDelete={props.handleDelete} />
        ))
      }
      </div>
	)
}

export { ItemList };