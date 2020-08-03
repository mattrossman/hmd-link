import { h } from 'preact'
import styled from 'styled-components'

const SpinnerContainer = styled.div`
	display: grid;
	place-items: center;
	width: 100%;
	height: 100%;
`

const Spinner = (props) => {
	return (
		<SpinnerContainer {...props}>
			<div class="spinner"></div>
		</SpinnerContainer>
	)
}
export default Spinner