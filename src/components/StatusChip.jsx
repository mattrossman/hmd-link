import { h } from 'preact'
import { useUserContext } from 'util/context'

import styled from 'styled-components'

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
	box-shadow: 0 0 5px rgb(20, 20, 20);
`

const Dot = styled('span')`
	height: .5em;
	width: .5em;
	background-color: ${props => props.color || 'white'};
	border-radius: 50%;
	margin-right: 10px;
	display: inline-block;
`

export default function StatusChip() {
	const user = useUserContext()
	const color = user ? '#0f0' : 'orange'
	const message = user ? user.displayName : 'Connecting...'
	const tooltipText=`
		This is your room name, assigned by your public IP.
		As long as your headset and companion device show the same room name,
		you can share links between them.
	`
	return (
		<ChipContainer>
			<BottomChip className="tooltip" aria-label={tooltipText}>
				<p><Dot color={color} /> {message}</p>
			</BottomChip>
		</ChipContainer>
	)
}