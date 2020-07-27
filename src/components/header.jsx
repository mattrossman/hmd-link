import { h } from 'preact'
import styled from 'styled-components'

const BottomMargin = styled.div`
	margin-bottom: 4vw;
`

export const Header = () => {
	return (
		<BottomMargin>
			<h1>hmd.link</h1>
			<p>Send links to your XR headset, hassle free.</p>
		</BottomMargin>
	)
}
