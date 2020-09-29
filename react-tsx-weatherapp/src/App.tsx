import React, { useState, SyntheticEvent } from 'react';
import logo from './logo.svg';
import { Form } from './Components/Form';
import './App.css';

// interfaces & types

const handleSubmit = async (zip: string) => {
	console.log('weathurrrgh');

	console.log(zip);

	let openWeatherAPI: string = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=8f02608638b1891744e6b2750a862506`;

	async function apiCall(request: RequestInfo): Promise<any> {
		const response = await fetch(request);
		const body = await response.json();
		return body;
	}

	// example consuming code
	const data = await apiCall(openWeatherAPI);
	console.log(data);
};

function App() {
	return (
		<div className='App'>
			<h1>What's the weather like?</h1>
			<Form handleSubmit={handleSubmit} />
			<WeatherCard />
		</div>
	);
}

export default App;
