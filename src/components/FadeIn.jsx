import styled, { keyframes } from 'styled-components'

const doFadeIn = keyframes`
	from {opacity: 0;}
	to {opacity: 1;}
`

export const FadeIn = styled.div`
	animation: doFadeIn .3s forwards;
`