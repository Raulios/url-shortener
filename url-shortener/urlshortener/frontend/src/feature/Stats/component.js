import { useState, useEffect } from "react";
import { getStatsPerDay } from './service';
import { useParams } from "react-router-dom";

function Stats() {
	const [statsPerDay, setStatsPerDay] = useState([]);
	const { shortenedUrlId } = useParams();

	useEffect(() => {
		getStatsPerDay(shortenedUrlId).then((data) => {
			setStatsPerDay(data);
			console.log(data);
		});
	}, []);

	return(
		<div>
		{statsPerDay.map((stat) => (
				<span key={stat.id}>{stat.number_of_clicks}</span>
			))
		}
		</div>
	)
}

export { Stats };