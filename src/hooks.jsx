import { useState, useEffect, useCallback } from 'preact/hooks'
import axios from 'redaxios';
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
}

if (firebase.apps.length == 0) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const auth = firebase.auth()


export const useUser = () => {
	const [user, setUser] = useState(null)
	useEffect(async () => {
		if (auth.currentUser === null) {
			const response = await axios.get('/.netlify/functions/auth')
			const { token } = response.data;
			await auth.signInWithCustomToken(token);
		}
		setUser(auth.currentUser)
	}, [])
	return user;
}

export const useDoc = (user) => {
	const [doc, setDoc] = useState(null)
	const uploadUrl = useCallback(async (url) => {
		console.log('running uploadUrl: ', url)
		if (user !== null) {
			const payload = {
				url,
				timestamp: Date.now()
			}
			console.log('Sending payload: ', payload,' to uid ', user.uid)
			await db.collection("rooms").doc(user.uid).set(payload)
		}
	}, [user])
	useEffect(() => {
		if (user !== null) {
			db.collection("rooms").doc(user.uid).onSnapshot(snapshot => {
				setDoc(snapshot.data())
			})
		}
	}, [user])
	return [doc, uploadUrl]
}

export const usePreview = () => {
	const [url, setUrl] = useState(null);
	const [preview, setPreview] = useState(null)

	/* The status is needed in case the preview endpoint fails, allowing us to fallback
	to a simpler rendering of the preview. */
	const [status, setStatus] = useState(null)
	useEffect(async () => {
		if (url !== null) {
			try {
				const response = await axios.post('/.netlify/functions/preview', {url})
				const preview = response.data;

				let thumbnail;
				if (preview.images && preview.images.length > 0) thumbnail = preview.images[0];
				else if (preview.favicons && preview.favicons.length > 1) thumbnail = preview.favicons[1];
				else thumbnail = 'https://picsum.photos/id/1025/200';
				const title = preview.title || '(No title)'
				const description = preview.description || '(No description)'
				
				setPreview({title, description, url, thumbnail});
				setStatus('success')
			}
			catch (e) {
				console.log('Caught error: ', e)
				setStatus('error')
			}
		}
	}, [url])
	return [preview, status, setUrl]
}