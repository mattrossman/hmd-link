import { h } from 'preact'
import styled from 'styled-components'
import { InputGroup, GridRow, GridColumn } from 'mini.css-preact'


	// TODO: stop autofill
const WideInput = styled('input')`
	width: 100%;
`
const MarginForm = styled('form')`margin-top: 4em;`

const SubmitButton = () => {
	const handler = (e) => {
    	e.preventDefault();
		alert("hello")
	}
	return (
		<button className="primary col-sm-12"
			type="submit" onClick={handler}>Submit</button>
	)
}

export const Form = () => {
	return (
		<form autocomplete="off">
			<GridRow>
				<WideInput type="text" id="url" placeholder="e.g. www.example.com" />
			</GridRow>
			<div className="row">
				<div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 row">
				<SubmitButton />
				</div>
			</div>
		</form>
	)
}


		// <form>
		// 	<h2 className="row">Enter a URL</h2>
		// 	<input className="row" type="text" id="url" placeholder="e.g. www.example.com"/>
		// </form>