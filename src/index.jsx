import { h, render } from 'preact'

import styled from 'styled-components'
// import { MainContent } from './components/main/content.jsx'
import { useUser, useDoc } from './hooks'
import { useEffect } from 'preact/hooks';

import { GridContainer, GridColumn, GridRow } from 'mini.css-preact'
import 'mini.css/dist/mini-dark.min.css'
import './style.css'
import { Header } from 'components/header'
import { Form } from 'components/form'

const sleep = ms => new Promise(r => setTimeout(r, ms))

// const styled = scoped(h);

// 	const submitLink = async () => {
// 		if (authorized) {	
// 			const payload = {
// 				url: input.current.value,
// 				timestamp: Date.now()
// 			}
// 			console.log("Sending payload: " + JSON.stringify(payload))
// 			await db.collection("rooms").doc(uid).set(payload)
// 		}
// 	}
// 	const followLink = () => {
// 		window.open(url, '_blank');
// 	}


const MarginContainer = styled(GridContainer)`
	margin-top: 2em;
`

const Container = ({children}) => {
	return (
		<MarginContainer>
			<GridRow small='12' medium='6'>
				<GridContainer medium={{offset: 3}}>
					{ children }
				</GridContainer>
			</GridRow>
		</MarginContainer>
	)
}

const App = () => {
	return(
		<Container>
			<Header />
			<Form />
		</Container>
	)
}



render(<App />, document.body);