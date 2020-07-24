import { render } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks'
import { html } from 'htm/preact';
import axios from 'redaxios';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

import { Header } from './components/header'
import { Footer } from './components/footer'

// Code splitting because Firebase is really big
const lazyImports = {
	firebase: import('firebase/app'),
	firestore: import('firebase/firestore'),
	auth: import('firebase/auth')
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

const useUid = (auth) => {
	const [uid, setUid] = useState(null)
	useEffect(async () => {
		if (auth !== null && uid === null) {
			const response = await axios.get('/.netlify/functions/auth')
			const { token } = response.data;
			await auth.signInWithCustomToken(token);
			setUid(auth.currentUser.uid)
		}
	}, [auth, uid])
	return uid
}

const useDoc = (db, uid) => {
	const [doc, setDoc] = useState(null);
	useEffect(() => {
		if (db !== null && uid !== null) {
			db.collection("rooms").doc(uid).onSnapshot(snapshot => {
				setDoc(snapshot.data())
			})
		}
	}, [db, uid])
	return doc
}

const createUniqueName = (seed) => {
	return uniqueNamesGenerator({
		dictionaries: [adjectives, animals],
		separator: '-',
		length: 2,
		seed
	})
}

const useFirebase = () => {
	const [db, setDb] = useState(null);
	const [auth, setAuth] = useState(null)
	useEffect(async () => {
		const firebase = await lazyImports['firebase']
		await Promise.all([lazyImports['firestore'], lazyImports['auth']])
		const firebaseConfig = {
			apiKey: process.env.FIREBASE_API_KEY,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN,
			projectId: process.env.FIREBASE_PROJECT_ID,
		};
		if (firebase.apps.length == 0) firebase.initializeApp(firebaseConfig);
		setDb(firebase.firestore());
		setAuth(firebase.auth())
	}, [])
	return { db, auth }
}

const App = () => {
	const { db, auth } = useFirebase();
	const uid = useUid(auth)
	const authorized = uid !== null;
	const input = useRef(null);
	const doc = useDoc(db, uid);
	const url = doc && doc.url;
	const submitLink = async () => {
		if (authorized) {	
			const payload = {
				url: input.current.value,
				timestamp: Date.now()
			}
			await db.collection("rooms").doc(uid).set(payload)
		}
	}
	const followLink = () => {
		window.open(url, '_blank');
	}
	return html`
	<div class="container">
		<${Header}/>
		<div class="content">
			<p>${uid === null ? 'Connecting...' : 'Room name: ' + createUniqueName(uid)}</p>
			<label for="url-input">Enter a URL:</label>
			<input id="url-input" ref=${input} type="text" />
			<button onClick=${submitLink}>Submit</button>
			${url && html`
			<div>
				<label for="btnSavedLink">Saved link: ${url}</label>
				<button id="btnSavedLink" onClick=${followLink}>Go!</button>
			</div>
			`}
		</div>
		<${Footer}/>
	</div>
	`
}

render(html`<${App} />`, document.body);