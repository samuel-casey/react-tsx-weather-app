import React, { useState, ChangeEvent } from 'react';

let zipcodeValue: string;
let setZipcodeValue: Function;
interface FormProps {
	handleSubmit: Function;
}

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
	console.log(event.target.value);
	setZipcodeValue(event.target.value);
};

export const Form = (props: FormProps) => {
	[zipcodeValue, setZipcodeValue] = useState('');

	const handleSubmit = (e: any) => {
		props.handleSubmit(zipcodeValue);
		e.preventDefault();
	};

	// could add an dropdown here to handle country code
	return (
		<form action='#' onSubmit={handleSubmit}>
			<label htmlFor='zipcode'>Enter zipcode: </label>
			<input onChange={(e) => handleChange(e)} type='text' name='zipcode' />
			<input type='submit' />
		</form>
	);
};
