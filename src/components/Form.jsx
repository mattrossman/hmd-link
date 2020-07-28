import { h } from 'preact'
import { useState, useRef, useCallback } from 'preact/hooks'
import styled from 'styled-components'


	// TODO: stop autofill
const WideInput = styled('input')`
	width: 100%;
	text-align: center;
`
const MarginForm = styled.form`
	margin-top: 8em;
`


const SubmitButton = styled.button`
	width: 100%;
`

export const Form = ({urlHandler}) => {
	const input = useRef(null);
	const [url, setUrl] = useState('')

	const onClick = (e) => {
    	e.preventDefault();
		if (input.current && input.current.checkValidity()) {
			console.log('dispatching urlHander: ', input.current.value)
			urlHandler(input.current.value)
		}
	}
	const onChange = useCallback((e) => {
		setUrl(e.target.value)
	}, [input])
	const isValid = useCallback(() => {
		return input.current && input.current.checkValidity()
	}, [url])
	return (
		<MarginForm autocomplete="off">
			<div class="row">
				<h2>Enter a URL to broadcast:</h2>
			</div>
			<div class="row">
				<WideInput onChange={onChange} required ref={input} type="text" id="url" title="URL"
					pattern="(https?:\/\/)?.+\..+" placeholder="e.g. www.example.com" />
			</div>
			<div className="row">
				<div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 row">
					<SubmitButton className="primary"
						type="submit" onClick={onClick} disabled={!isValid()} >Submit</SubmitButton>
				</div>
			</div>
		</MarginForm>
	)
}