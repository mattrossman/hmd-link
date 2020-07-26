import { h, Fragment } from 'preact'
import { Form } from 'components/form'

import { useUser, useDoc } from 'hooks'
import styled from 'styled-components'

const Dot = styled('span')`
	height: .5em;
	width: .5em;
	background-color: ${props => props.color || 'white'};
	border-radius: 50%;
	margin-right: 10px;
	display: inline-block;
`

const LinkStore = ({user}) => {
	const doc = useDoc(user)
	if (doc === null) {
		return <p>No saved link</p>
	}
	else {
		return <p>Saved: {doc.url}</p>
	}
}

export const Content = () => {
	const user = useUser();
	let status;
	let content;
	if (user === null) {
		status = <p><Dot color='orange'/>Connecting...</p>
		content = null;
	}
	else {
		status = <p><Dot color='#0f0'/>Room name: <b>{user.displayName}</b></p>
		content = <LinkStore user={user}/>
	}
	return (
		<>
			{status}
			{content}
		</>
	)
}