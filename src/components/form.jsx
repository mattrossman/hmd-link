import { h } from 'preact'
import { useRef, useCallback } from 'preact/hooks'
import styled from 'styled-components'


	// TODO: stop autofill
const WideInput = styled('input')`
	width: 100%;
`
const MarginForm = styled('form')`margin-top: 8em;`


export const Form = ({urlHandler}) => {
	const input = useRef(null);
	const handler = (e) => {
    	e.preventDefault();
		if (input.current && input.current.checkValidity()) {
			console.log('dispatching urlHander: ', input.current.value)
			urlHandler(input.current.value)
		}
	}
	return (
		<MarginForm autocomplete="off">
			<div class="row">
				<WideInput required ref={input} type="text" id="url" title="URL" pattern="(https?:\/\/)?.+\..+" placeholder="e.g. www.example.com" />
			</div>
			<div className="row">
				<div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 row">
				<button className="primary col-sm"
					type="submit" onclick={handler}>Submit</button>
				</div>
			</div>
		</MarginForm>
	)
}


		// <form>
		// 	<h2 className="row">Enter a URL</h2>
		// 	<input className="row" type="text" id="url" placeholder="e.g. www.example.com"/>
		// </form>