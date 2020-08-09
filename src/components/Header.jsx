import { h } from 'preact'
import styled from 'styled-components'

const BottomMargin = styled.div`
	margin-bottom: 4rem;
	@media (max-height: 500px) {
		margin-bottom: 0;
	}
`

const Title = styled.h1`
	font-size: max(10vh, 42pt);
`

export const Header = () => {
	return (
		<BottomMargin>
			<Title>hmd.link</Title>
			<p>Send links to your XR headset, hassle free.</p>
		</BottomMargin>
	)
}
