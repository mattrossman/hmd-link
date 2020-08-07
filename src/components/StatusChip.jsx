import { h } from 'preact'
import styled from 'styled-components'
import { useState, useEffect } from 'preact/hooks'
import { useUserContext } from 'util/context'


const ChipContainer = styled.div`
	display: grid;
	place-content: center;
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

export const StatusChip = () => {
	const user = useUserContext()
	const [color, setColor] = useState('orange')
	const [message, setMessage] = useState('Connecting...')
	useEffect(() => {
		if (user) {
			setColor('#0f0')
			setMessage(user.displayName)
		}
	}, [user])
	const tooltipText=`
		This is your room name, assigned by your public IP.
		As long as your headset and companion device show the same room name,
		you can share links between them.
	`
	return (
		<ChipContainer>
			<BottomChip className="shadowed tooltip" aria-label={tooltipText}>
				<p><Dot color={color} /> {message}</p>
			</BottomChip>
		</ChipContainer>
	)
}