import { render } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks'
import { html } from 'htm/preact';
import axios from 'redaxios';

import { Header } from './components/header'
import { Footer } from './components/footer'

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
};

if (firebase.apps.length == 0) firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();


const sleep = ms => new Promise(r => setTimeout(r, ms))

const useUid = (initialState) => {
	const [uid, setUid] = useState(initialState)
	useEffect(async () => {
		if (uid === null) {
			const response = await axios.get('/.netlify/functions/auth')
			const { token } = response.data;
			await auth.signInWithCustomToken(token);
			setUid(auth.currentUser.uid)
		}
	}, [uid])
	return uid
}

const useDoc = (uid) => {
	const [doc, setDoc] = useState(null);
	useEffect(() => {
		if (uid !== null) {
			db.collection("rooms").doc(uid).onSnapshot(snapshot => {
				setDoc(snapshot.data())
			})
		}
	}, [uid])
	return doc
}

const App = () => {
	const uid = useUid(null)
	const authorized = uid !== null;
	const input = useRef(null);
	const doc = useDoc(uid);
	const url = doc && doc.url;
	const submitLink = async () => {
		if (authorized) {	
			const payload = {
				url: input.current.value,
				timestamp: Date.now()
			}
			console.log("Sending payload: " + JSON.stringify(payload))
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
			<p>Current room: ${uid}</p>
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