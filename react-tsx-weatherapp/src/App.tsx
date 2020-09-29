import React, { useState, SyntheticEvent } from 'react';
import { Form } from './Components/Form';
import { WeatherCard } from './Components/WeatherCard';
import './App.css';

// interfaces & types
interface IPlaceProps {
	city?: string;
	// country?: string;
	temp?: number;
	temp_min?: number;
	temp_max?: number;
	description?: string;
}

function App() {
	const [place, setPlace] = useState<IPlaceProps>({
		city: 'string',
		// country: 'string',
		temp: 0,
		temp_min: 0,
		temp_max: 0,
		description: 'string',
	});
	const [searched, setSearched] = useState(false);

	// HANDLE FORM SUBMIT and pass inputted zipcode to API
	const handleSubmit = async (zip: string) => {
		console.log(zip);

		// FETCH DATA FROM API with .then and .catch -- I don't know how to use async/await to handle errors in TS, and barely understand how to do it in JS
		// async function apiCall(): Promise<any> {
		// 	let openWeatherAPI: string = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=8f02608638b1891744e6b2750a862506`;

		// 	try {
		// 		const response = await fetch(openWeatherAPI);
		// 		const body = await response.json();
		// 		return body;
		// 	} catch (err) {
		// 		if (err) {
		// 			console.log(err.message);
		// 		}
		// 	}
		// }

		// FETCH DATA FROM API with .then and .catch
		async function apiCall(): Promise<any> {
			let openWeatherAPI: string = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=8f02608638b1891744e6b2750a862506`;

			return fetch(openWeatherAPI)
				.then((response) => {
					const body = response.json();
					return body;
				})
				.catch((err: Error) => alert(err.message));
		}

		// CONSUME API CALL
		apiCall()
			.then((data) => {
				setSearched(true);
				setPlace({
					city: data.name,
					// country: data.sys.country,
					temp: data.main.temp,
					temp_min: data.main.temp_min,
					temp_max: data.main.temp_max,
					description: data.weather.description,
				});
			})
			.catch((err: Error) => alert(err.message));
	};

	const card =
		searched === true ? (
			<WeatherCard
				city={place.city}
				temp={place.temp}
				temp_min={place.temp_min}
				temp_max={place.temp_max}
				description={place.description}
			/>
		) : null;

	return (
		<div className='App'>
			<h1>What's the weather like?</h1>
			<Form handleSubmit={handleSubmit} />
			{card}
		</div>
	);
}

export default App;
