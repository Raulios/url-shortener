import { useState, useEffect } from "react";
import { getStatsPerDay } from './service'

function Stats() {
	const [statsPerDay, setStatsPerDay] = useState([]);

	useEffect(() => {
		getStatsPerDay(5).then((data) => {
			setStatsPerDay(data);
			console.log(data);
		});
	}, []);

	return(
		<div>\
		{statsPerDay.map((stat) => (
			<span key={stat.id}>{stat.number_of_clicks}</span>
		))
	}
		</div>
	)
}

export { Stats };