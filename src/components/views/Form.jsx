import { h } from 'preact'
import { useState, useRef, useEffect, useCallback } from 'preact/hooks'
import { useDataContext } from 'util/context'

import styled from 'styled-components'
import Icon from '@mdi/react'
import { mdiClose, mdiAlert, mdiSend } from '@mdi/js'

import ActionBar from 'components/ActionBar'
import View from 'components/View'

const InputContainer = styled.div`
	width: 100%;
	height: 50px;
	display: grid;
	grid-template-columns: 1fr auto;
	box-shadow: 0 0 5px rgb(20, 20, 20);
	background-color: #111;
	border-radius: 25px;
	overflow: hidden;
	margin-top: 20px;
	transition: transform 0.2s, background-color 0.2s;
	transform: scale(0.9);
	&:focus-within  {
		transform: scale(1);
		background-color: #080808;
	}
`

const RawInput = styled.input`
	text-align: center;
	text-indent: 75px;
	&& {
		background: none;
		border: none;
	}
	&:active, &:focus {
		border: none;
        outline: none;
	}
`

const SubmitButton = styled.button`
	width: 75px;
	display: grid;
	place-items: center;
	margin: 0;
	transition: background-color 0.2s;
	overflow: hidden;
	&:disabled {
		background-color: #333;
	}
	& > svg {
		transition: transform .3s ease-in-out;
	}
	&:hover:not([disabled]), &:focus:not([disabled]) {
		background-color: #54a7ff;
		& > svg {
			transform: rotate(-360deg) scale(1.3);
		}
	}
`
SubmitButton.defaultProps = {className: 'primary'}

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

const Error = styled(Warning)`
	color: #cc3300;
`

const isValidLength = (val) => val.length <= 2000
const isUrl = (val) => val.match(/(https?:\/\/)?.+\..+/)

export default function Form ({onComplete, closeAction, ...props}) {
	const input = useRef(null);
	const [url, setUrl] = useState('')
	const { snapshot, timeLeft } = useDataContext()
	const onClickSubmit = (e) => {
    	e.preventDefault();
		if (input.current && input.current.checkValidity()) {
			onComplete(input.current.value)
		}
	}
	const onChangeInput = (e) => {
		setUrl(e.target.value)
	}
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
		if (input && input.current) {
			if (snapshot && snapshot.exists() && timeLeft > 0){
				input.current.value = snapshot.child('url').val()
				input.current.focus();
				input.current.select();
			}
			else {
				input.current.focus();
			}
		}
	}, [snapshot, input])
	const warning = <Warning><Icon path={mdiAlert} size={0.75} /> Don't put sensitive information in shared URLs</Warning>
	const lengthError = <Error><Icon path={mdiClose} size={0.75} /> Please enter a shorter URL</Error>
	return (
		<View className="fadeIn" key="form">
			<ActionBar actions={actions}/>
			<form {...props}>
				<CenterRow>
					<CenteredHeading>Enter a URL</CenteredHeading>
				</CenterRow>
				<CenterRow>
					<InputContainer>
						<RawInput onChange={onChangeInput} required ref={input} type="text" id="url" title="URL" placeholder="www.example.com"
							autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
						<SubmitButton type="submit" onClick={onClickSubmit} disabled={!isValid()} title="Submit URL">
							<Icon path={mdiSend} size={1} />
						</SubmitButton>
					</InputContainer>
				</CenterRow>
				<CenterRow>
					{ tooLong ? lengthError : warning }
				</CenterRow>
			</form>
		</View>
	)
}