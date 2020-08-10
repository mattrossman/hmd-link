import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import styled, { keyframes } from 'styled-components'
import { mdiPlus, mdiInformationOutline } from '@mdi/js'

import Logo from './Logo'
import ActionBar from 'components/ActionBar'
import { ContentView } from 'util/ui'

const size = 75

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
	width: ${size}px;
	height: ${size}px;
	position: absolute;
	animation-delay: ${props => props.delay || 0};
`

const LogoContainer = styled.div`
	position: absolute;
	box-shadow: 0 0 5px black;
	display: grid;
	place-items: center;
	background-color: #333;
	border-radius: 50%;
	width: ${size}px;
	height: ${size}px;
	z-index: 2;
`

const RippleContainer = styled.div`
	display: grid;
	place-items: center;
	position: relative;
	height: ${size}px;
	width: ${size}px;
	margin: 20px;
`

const Centered = styled.div`
	display: grid;
	place-items: center;
	height: 100%;
`

const Rows = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Waiting = ({addAction, helpAction, ...props}) => {
	const actions = {
		left: {
			icon: mdiPlus,
			label: 'Add link',
			action: addAction,
			title: "Add a link to share"
		},
		right: {
			icon: mdiInformationOutline,
			action: helpAction,
			title: "Info"
		}
	}
	return (
		<ContentView>
			<ActionBar actions={actions} />
			<Centered {...props}>
				<Rows>
					<RippleContainer>
						<LogoContainer>
							<Logo style="fill: white" />
						</LogoContainer>
						<Ripple />
						<Ripple delay="-1s" />
						<Ripple delay="-2s" />
						<Ripple delay="-3s" />
					</RippleContainer>
					<p>Waiting for a link...</p>
				</Rows>
			</Centered>
		</ContentView>
	)
}
export default Waiting