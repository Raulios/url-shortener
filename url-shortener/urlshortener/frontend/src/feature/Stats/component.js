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
				<div key={stat.id}>
					<span>{stat.date}</span>
					<span>{stat.number_of_clicks}</span>
				</div>
			))
		}
		</div>
	)
}

export { Stats };