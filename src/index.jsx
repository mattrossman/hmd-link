import { h, render } from 'preact'
import { createMuiTheme, ThemeProvider, CssBaseline, responsiveFontSizes } from "@material-ui/core";

import { MainContent } from './components/main/content.jsx'
import { useUser, useDoc } from './hooks'


const sleep = ms => new Promise(r => setTimeout(r, ms))


// const useDoc = (db, uid) => {
// 	const [doc, setDoc] = useState(null);
// 	useEffect(() => {
// 		if (uid !== null) {
// 			db.collection("rooms").doc(uid).onSnapshot(snapshot => {
// 				setDoc(snapshot.data())
// 			})
// 		}
// 	}, [uid])
// 	return doc
// }

// const App = () => {
// 	const uid = useUid(null)
// 	const authorized = uid !== null;
// 	const input = useRef(null);
// 	const doc = useDoc(uid);
// 	const url = doc && doc.url;
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
// 	return html`
// 	<div class="container">
// 		<${Header}/>
// 		<div class="content">
// 			<p>${uid === null ? 'Connecting...' : 'Room name: ' + getUniqueName(uid)}</p>
// 			<label for="url-input">Enter a URL:</label>
// 			<input id="url-input" ref=${input} type="text" />
// 			<button onClick=${submitLink}>Submit</button>
// 			${url && html`
// 			<div>
// 				<label for="btnSavedLink">Saved link: ${url}</label>
// 				<button id="btnSavedLink" onClick=${followLink}>Go!</button>
// 			</div>
// 			`}
			
// 			<Button variant="contained" color="primary">
// 				Hello World
// 			</Button>
// 		</div>
// 		<!-- <${Footer}/> -->
// 	</div>
// 	`
// }

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	}
});

function NewApp() {
	const theme = responsiveFontSizes(darkTheme)
	const user = useUser()
	const doc = useDoc(user)
	if (user !== null) {
		console.log('Connected to room: ', user.displayName)
	}
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<MainContent />
	<h2>Connected to: {user && user.displayName}</h2>
	<h2>Current URL: {doc}</h2>
		</ThemeProvider>
	);
}

render(<NewApp />, document.body);