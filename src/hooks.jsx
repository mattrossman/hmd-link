import { useState, useEffect } from 'preact/hooks'
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
	console.log('using user')
	return user;
}

export const useDoc = (user) => {
	const [doc, setDoc] = useState(null)
	useEffect(() => {
		if (user !== null) {
			db.collection("rooms").doc(user.uid).onSnapshot(snapshot => {
				setDoc(snapshot.data())
			})
		}
	}, [user])
	return doc
}