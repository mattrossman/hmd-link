import { h, render } from 'preact'

import styled from 'styled-components'
// import { MainContent } from './components/main/content.jsx'
import { useUser, useDoc } from './hooks'
import { useEffect } from 'preact/hooks';


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

const Container = styled.div`
	margin-top: 2em;
`

const App = () => {
	return(
		<Container className="container">
			<div className="row cols-sm-12 cols-md-8">
				<div className="col-md-offset-2">
					<h1>hmd.link</h1>
					<p>Send WebXR links to your headset, fast.</p>
				</div>
			</div>
		</Container>
	)
}



render(<App />, document.body);