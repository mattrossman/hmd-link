import { h, render } from 'preact'

import styled from 'styled-components'
// import { MainContent } from './components/main/content.jsx'
import { useUser, useDoc } from 'hooks'
import { useEffect } from 'preact/hooks';

import { GridContainer, GridColumn, GridRow } from 'mini.css-preact'
import 'mini.css/dist/mini-dark.min.css'
import 'style.css'
import { Header } from 'components/header'
import { Content } from 'components/content'
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


const MarginContainer = styled.div`
	margin-bottom: 6em;
`

const Container = ({children}) => {
	return (
		<MarginContainer className="container">
			<div class="row" >
				<div class="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
					{ children }
				</div>
			</div>
		</MarginContainer>
	)
}

const App = () => {
	const user = useUser();
	return(
		<Container>
			<Header />
			<Content />
		</Container>
	)
}



render(<App />, document.body);