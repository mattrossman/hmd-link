import { h } from 'preact'
import { useState, useRef, useEffect, useCallback } from 'preact/hooks'
import styled from 'styled-components'
import ActionBar from 'components/ActionBar'
import { ContentView } from 'util/ui'
import { mdiClose, mdiAlert } from '@mdi/js'
import Icon from '@mdi/react'
import { useDataContext } from 'util/context'

	// TODO: stop autofill
const WideInput = styled('input')`
	width: 90%;
	text-align: center;
	height: 50px;
	border-radius: 25px;
	/* background-color: #222; */
	/* Override mini.css */
	transform: scale(0.9);
	transition: transform .3s;
	margin-bottom: 20px;
	&:focus {
		transform: scale(1);
    	outline: none;
	}
	&&&&& { 
		border: 2px solid white;
		box-shadow: 0 0 5px black;
		&:invalid {
			border: 2px solid white;
		}
	}
`

const SubmitButton = styled.button`
	width: 100%;
	&:disabled {
		background-color: #333;
	}
	transition: transform .3s;
	&:hover:not([disabled]) {
		transform: scale(1.1);
	}
	&:focus:not([disabled]) {
		transform: scale(1.1);
	}
`

const CenteredHeading = styled.h2`
	text-align: center;
	margin-bottom: 0;
	@media(max-height: 500px) {
		margin-top: -30px;
	}
`

const CenterRow = styled.div`
	display: flex;
	justify-content: center;
`
CenterRow.defaultProps = {className: 'row'}

const ValidationMessage = styled.p`
	color: red;
	width: 100%;
	text-align: center;
`

const Warning = styled.p`
	color: #ffcc00;
	font-size: 10pt;
	display: flex;
	align-items: center;
	justify-content: center;
	& > * {
		margin: 0 10px;
	}
`

const isValidLength = (val) => val.length <= 2000
const isUrl = (val) => val.match(/(https?:\/\/)?.+\..+/)

export const Form = ({onComplete, closeAction, ...props}) => {
	const input = useRef(null);
	const [url, setUrl] = useState('')
	const { snapshot, timeLeft } = useDataContext()
	useEffect(() => {
		if (input.current) {
			input.current.focus();
		}
	}, [])
	const onClickSubmit = (e) => {
    	e.preventDefault();
		if (input.current && input.current.checkValidity()) {
			console.log('dispatching onComplete: ', input.current.value)
			onComplete(input.current.value)
		}
	}
	const onChangeInput = useCallback((e) => {
		setUrl(e.target.value)
	}, [input])
	const isValid = useCallback(() => {
		return input.current && isValidLength(input.current.value) && isUrl(input.current.value)
	}, [url])
	const tooLong = input.current && !isValidLength(input.current.value)

	const actions = {
		right: {
			icon: mdiClose,
			label: 'Close',
			action: closeAction,
			title: "Close"
		}
	}
	useEffect(()=> {
		if (snapshot && snapshot.exists() && timeLeft > 0){
			setUrl(snapshot.child('url').val());
		}
	}, [snapshot])
	return (
		<ContentView>
			<ActionBar actions={actions}/>
			<form autocomplete="off" {...props}>
				<CenterRow>
					<CenteredHeading>Enter a URL</CenteredHeading>
				</CenterRow>
				<CenterRow>
					<Warning><Icon path={mdiAlert} size={0.75} /> Don't put sensitive information in shared URLs</Warning>
				</CenterRow>
				<CenterRow>
					<WideInput onChange={onChangeInput} autoFocus required ref={input} type="text" id="url" title="URL"
						pattern="(https?:\/\/)?.+\..+" placeholder="e.g. www.example.com" autocapitalize="off" value={url}/>
				</CenterRow>
				<div className="row">
					<div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 row">
						{tooLong && <ValidationMessage>URL too long :(</ValidationMessage>}
						<SubmitButton className="primary"
							type="submit" onClick={onClickSubmit} disabled={!isValid()} >Submit</SubmitButton>
					</div>
				</div>
			</form>
		</ContentView>
	)
}