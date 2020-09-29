import React, { useState, ChangeEvent } from 'react';
import { countryCodes } from '../countryCodes';

let zipcodeValue: string;
let setZipcodeValue: Function;

let countryCode: string;
let setCountryCode: Function;

interface FormProps {
	handleSubmit: Function;
}

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
	setZipcodeValue(event.target.value);
};

const handleCountryCode = (event: ChangeEvent<HTMLSelectElement>) => {
	setCountryCode(event.target.value);
};

export const Form = (props: FormProps) => {
	[zipcodeValue, setZipcodeValue] = useState('');
	[countryCode, setCountryCode] = useState('');

	const handleSubmit = (e: any) => {
		props.handleSubmit(zipcodeValue, countryCode);
		e.preventDefault();
	};

	const countryOptions = countryCodes.map((code, index) => {
		return <option value={code}>{code}</option>;
	});

	return (
		<>
			<form action='#' onSubmit={handleSubmit}>
				<label htmlFor='zipcode'>Enter zipcode: </label>
				<input onChange={(e) => handleChange(e)} type='text' name='zipcode' />
				<label htmlFor='country'>Select country</label>
				<select
					name='country'
					id='countries'
					onChange={(e) => handleCountryCode(e)}>
					{countryOptions}
				</select>
				<input type='submit' />
			</form>
			<a target='#' href='https://www.iso.org/obp/ui/#search'>
				What's my country code?
			</a>
		</>
	);
};
