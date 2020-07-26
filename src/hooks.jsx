import { useState, useEffect } from 'preact/hooks'
import axios from 'redaxios';

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const useFirebase = () => {
	const [services, setServices] = useState({db: null, auth: null})
	const firebaseConfig = {
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		projectId: process.env.FIREBASE_PROJECT_ID,
	}
	useEffect(() => {
		if (firebase.apps.length == 0) firebase.initializeApp(firebaseConfig);
		const db = firebase.firestore()
		const auth = firebase.auth()
		setServices({ db, auth })
	}, [])
	return services
}


export const useUser = () => {
	const { auth } = useFirebase();
	const [user, setUser] = useState(null)
	useEffect(async () => {
		if (auth !== null) {
			if (auth.currentUser === null) {
				const response = await axios.get('/.netlify/functions/auth')
				const { token } = response.data;
				await auth.signInWithCustomToken(token);
			}
			setUser(auth.currentUser)
		}
	}, [auth])
	return user;
}

export const useDoc = (user) => {
	const { db } = useFirebase() 
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