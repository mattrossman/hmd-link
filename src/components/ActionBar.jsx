import { h } from 'preact'
import styled from 'styled-components'

const ActionBarContainer = styled.div`
	margin-bottom: 1rem;
`

const ActionBarButtonLeft = styled.button`
	background: none;
	display: inline-flex;
	align-items: center;
	margin: 0;
`

const ActionBarButtonRight = styled(ActionBarButtonLeft)`
	float: right;
`

const ActionBar = ({left, right, ...props}) => {
	return (
		<ActionBarContainer {...props}>
			{left && <ActionBarButtonLeft>
				{ left }
			</ActionBarButtonLeft>}
			{right && <ActionBarButtonRight>
				{ right }
			</ActionBarButtonRight>}
		</ActionBarContainer>
	)
}
export default ActionBar