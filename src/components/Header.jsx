import { h } from 'preact'
import styled from 'styled-components'

const BottomMargin = styled.div`
	margin-bottom: 4vh;
`

const Title = styled.h1`
	font-size: 10vh;
`

export const Header = () => {
	return (
		<BottomMargin>
			<Title>hmd.link</Title>
			<p>Send links to your XR headset, hassle free.</p>
		</BottomMargin>
	)
}
