import { h } from 'preact'
import styled from 'styled-components'
import { useState, useEffect } from 'preact/hooks'


const FixedFooter = styled('div')`
	position:fixed;
	display: grid;
	place-items: center;
	left:0px;
	bottom:0px;
	width:100%;
`

const BottomChip = styled('div')`
	width: max-content;
	display: grid;
	place-items: center;
	height: 3em;
	border-radius: 1.5em;
	background: rgb(50, 50, 50);
	padding: 0 20px;
	margin: 20px;
`

const Dot = styled('span')`
	height: .5em;
	width: .5em;
	background-color: ${props => props.color || 'white'};
	border-radius: 50%;
	margin-right: 10px;
	display: inline-block;
`

export const StatusChip = ({ user }) => {
	const [color, setColor] = useState('orange')
	const [message, setMessage] = useState('Connecting...')
	useEffect(() => {
		if (user) {
			setColor('#0f0')
			setMessage(user.displayName)
		}
	}, [user])
	const tooltipText=`
		This is your room name, determined by your public IP.
		As long as your headset and companion device show the same room name,
		you should be able to share links between them.
	`
	return (
		<FixedFooter>
			<BottomChip className="shadowed tooltip" aria-label={tooltipText}>
				<p><Dot color={color} /> {message}</p>
			</BottomChip>
		</FixedFooter>
	)
}