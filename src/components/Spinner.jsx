import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import styled from 'styled-components'

const SpinnerContainer = styled.div`
	display: grid;
	place-items: center;
	width: 100%;
	height: 100%;
`

const Spinner = (props) => {
	useEffect(() => {
		console.log('mounting spinner')
	}, [])
	return (
		<SpinnerContainer {...props}>
			<div class="spinner"></div>
		</SpinnerContainer>
	)
}
export default Spinner