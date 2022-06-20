import './styles.scss';
import { useState, useEffect } from "react";
import { getStatsPerDay } from './service';
import { useParams } from "react-router-dom";

function Stats() {
	const [statsPerDay, setStatsPerDay] = useState([]);
	const { shortenedUrlId } = useParams();

	useEffect(() => {
		getStatsPerDay(shortenedUrlId).then((data) => {
			setStatsPerDay(data);
		});
	}, []);

	return(
		<section className="stats-page">
      		<h1 className="stats-page__title">Stats Page</h1>
      		<div className="stats-page__header">
      			<span className="stats-page__text stats-page__text--header">Date</span>
      			<span className="stats-page__text stats-page__text--header">Num. of Clicks</span>
      		</div>
      		<div className="stats-page__item-list">
      			{statsPerDay.map((stat) => (
					<div className="stats-page__item" key={stat.id}>
						<span className="stats-page__text">{stat.date}</span>
						<span className="stats-page__text">{stat.number_of_clicks}</span>
					</div>
				))
			}
      		</div>
		</section>
	)
}

export { Stats };