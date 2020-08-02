import { h } from 'preact'
import styled from 'styled-components'
import Icon from '@mdi/react'
import FadeIn from './FadeIn'
import { useActivityContext } from 'util/context'

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

const ActionBar = ({...props}) => {
	// For some reason nested destructuring doesn't work here
	const { activity } = useActivityContext();
	const { leftAction, rightAction } = activity;
	return (
		<ActionBarContainer key={activity} {...props}>
			{leftAction && <ActionBarButtonLeft onClick={leftAction.action}>
				<Icon path={leftAction.icon} size={2} /><p>{leftAction.label}</p>
			</ActionBarButtonLeft>}
			{rightAction && <ActionBarButtonRight  onClick={rightAction.action}>
				<p>{rightAction.label}</p><Icon path={rightAction.icon} size={2} />
			</ActionBarButtonRight>}
		</ActionBarContainer>
	)
}
export default ActionBar