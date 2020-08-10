import { h } from 'preact'
import styled from 'styled-components'

const BottomMargin = styled.div`
	margin-bottom: 4rem;
	@media (max-device-height: 850px) {
		margin-bottom: 2rem;
	}
	@media (max-device-height: 500px) {
		margin-bottom: 0;
	}
`

const Title = styled.h1`
	font-size: 60pt;
	@media (max-device-height: 850px) {
		font-size: 48pt
	}
	@media (max-device-height: 500px) {
		font-size: 42pt
	}
`

export default function Header() {
	return (
		<BottomMargin>
			<Title>hmd.link</Title>
			<p>Send links to your XR headset, hassle free.</p>
		</BottomMargin>
	)
}
