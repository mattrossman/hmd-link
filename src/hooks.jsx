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
	const [data, setData] = useState(null)
	
	const updateUrl = (url) => {
		setData(null);
		setUrl(url)
		console.log("changed URL")
	}

	useEffect(async () => {
		const fallbackThumbnail = 'https://picsum.photos/id/1025/200';
		if (url !== null) {
			try {
				const response = await axios.post('/.netlify/functions/preview', {url})
				const preview = response.data;

				let thumbnail;
				if (preview.images && preview.images.length > 0) thumbnail = preview.images[0];
				else if (preview.favicons && preview.favicons.length > 1) thumbnail = preview.favicons[1];
				else thumbnail = fallbackThumbnail;
				const title = preview.title || '(No title)'
				const description = preview.description || '(No description)'
				
				setData({title, description, url, thumbnail});
			}
			catch (e) {
				setData({url, title: '(No preview)', description:'', thumbnail: fallbackThumbnail})
			}
		}
	}, [url])
	return [data, updateUrl]
}