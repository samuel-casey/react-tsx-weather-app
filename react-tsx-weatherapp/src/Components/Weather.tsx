import React from 'react';

export const Weather = () => {
	return (
		<div className='weather-card'>
			<p>{props.city}</p>
			<h1>{props.temp}</h1>
			<h2>{props.description}</h2>
			<div class='min-or-max'>
				<p>{props.min}</p>
			</div>
			<div class='min-or-max'>
				<p>{props.min}</p>
			</div>
		</div>
	);
};
