import { h } from 'preact'
import styled from 'styled-components'
import Icon from '@mdi/react'
import FadeIn from './FadeIn'
import { useActivityContext } from 'util/context'

const ActionBarContainer = styled.div`
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

const tryWrapAnchor = (item, href) => {
	return href ? <a href={href}>{item}</a> : item
}

const ActionBar = ({actions, ...props}) => {
	const { left, right } = actions;
	return (
		<ActionBarContainer {...props}>
			{left && tryWrapAnchor(<ActionBarButtonLeft onClick={left.action} title={left.title}>
				<Icon path={left.icon} size={2} />{left.label && <p>{left.label}</p>}
			</ActionBarButtonLeft>, left.href)}
			{right && tryWrapAnchor(<ActionBarButtonRight  onClick={right.action} title={right.title}>
				{right.label && <p>{right.label}</p>}<Icon path={right.icon} size={2} />
			</ActionBarButtonRight>, right.href)}
		</ActionBarContainer>
	)
}
export default ActionBar