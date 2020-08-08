import { h } from 'preact'
import { useState, useRef, useEffect, useCallback } from 'preact/hooks'
import styled from 'styled-components'
import ActionBar from 'components/ActionBar'
import { ContentView } from 'util/ui'
import { mdiClose } from '@mdi/js'
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
`

const CenterRow = styled.div`
	display: flex;
	justify-content: center;
`
CenterRow.defaultProps = {className: 'row'}

const Warning = styled.p`
	color: red;
	width: 100%;
	text-align: center;
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
			label: 'Cancel',
			action: closeAction
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
					<WideInput onChange={onChangeInput} autoFocus required ref={input} type="text" id="url" title="URL"
						pattern="(https?:\/\/)?.+\..+" placeholder="e.g. www.example.com" autocapitalize="off" value={url}/>
				</CenterRow>
				<div className="row">
					<div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 row">
						{tooLong && <Warning>URL too long :(</Warning>}
						<SubmitButton className="primary"
							type="submit" onClick={onClickSubmit} disabled={!isValid()} >Submit</SubmitButton>
					</div>
				</div>
			</form>
		</ContentView>
	)
}