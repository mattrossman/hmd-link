import { h } from 'preact'
import styled, { keyframes } from 'styled-components'

import Icon from './Icon'

const doRipple = keyframes`
	from {
		transform: scale(.1);
		opacity: .5;
	}
	to {
		transform: scale(2);
		opacity: 0;
	}
`

const Ripple = styled.div`
	border: 1px solid white;
	animation: ${doRipple} 4s ease-out infinite;
	border-radius: 50%;
	width: 100px;
	height: 100px;
	position: absolute;
	animation-delay: ${props => props.delay || 0};
`

const IconContainer = styled.div`
	position: absolute;
	box-shadow: 0 0 5px black;
	display: grid;
	place-items: center;
	background-color: #333;
	border-radius: 50%;
	width: 100px;
	height: 100px;
	z-index: 2;
`

const RippleContainer = styled.div`
	display: grid;
	place-items: center;
	position: relative;
	height: 400px;
`

const Loading = (props) => {
	return (
		<RippleContainer {...props}>
			<IconContainer>
				<Icon style="fill: white" />
			</IconContainer>
			<Ripple />
			<Ripple delay="-1s" />
			<Ripple delay="-2s" />
			<Ripple delay="-3s" />
		</RippleContainer>
	)
}
export default Loading