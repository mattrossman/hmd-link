import { h } from 'preact'
import styled from 'styled-components'
import Icon from '@mdi/react'
import FadeIn from './FadeIn'

const ActionBarContainer = styled(FadeIn)`
	margin-bottom: 2vh;
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

const ActionBar = ({actions, ...props}) => {
	const { left, right } = actions;
	return (
		<ActionBarContainer key={actions} {...props}>
			{left && <ActionBarButtonLeft onClick={left.action}>
				<Icon path={left.icon} size={2} /><p>{left.label}</p>
			</ActionBarButtonLeft>}
			{right && <ActionBarButtonRight  onClick={right.action}>
				<p>{right.label}</p><Icon path={right.icon} size={2} />
			</ActionBarButtonRight>}
		</ActionBarContainer>
	)
}
export default ActionBar