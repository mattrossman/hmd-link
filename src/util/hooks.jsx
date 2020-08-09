import { useState, useEffect, useCallback } from 'preact/hooks'
import axios from 'redaxios';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { sleep } from './hooks-dummy'

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
}

if (firebase.apps.length == 0) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db = firebase.database()


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

export const useData = (user) => {
	const [snapshot, setSnapshot] = useState(null);
	const [ref, setRef] = useState(null);

	useEffect(() => {
		if (user !== null) {
			const ref = db.ref('rooms/' + user.uid)
			setRef(ref)
			ref.on('value', (snapshot) => {
				setSnapshot(snapshot);
			})
			return () => ref.off('value')
		}
	}, [user])

	const upload = useCallback(async (url) => {
		if (ref !== null) {
			console.log('setting url ', url)
			try {
				await ref.set({
					url,
					timestamp: firebase.database.ServerValue.TIMESTAMP
				})
				console.log('set succeeded')
			}
			catch (e) {
				console.log('failed to upload: ', e)
			}
		}
	}, [ref]);

	const clear = useCallback((url) => {
		if (ref !== null) {
			ref.remove();
		}
	}, [ref])

	return [snapshot, upload, clear]
}

export const usePreview = () => {
	const [data, setData] = useState(null)
	
	const clearPreview = () => setData(null)
	const getPreview = async (url) => {
		setData(null)
		const prefix = url.match(/https?:\/\//) ? '' : 'http://'
		const target = prefix + url
		try {
			// await sleep(1000)
			const response = await axios.post('/.netlify/functions/preview', {url: target})
			const preview = response.data;

			let thumbnail;
			if (preview.images && preview.images.length > 0) thumbnail = preview.images[0];
			else if (preview.favicons && preview.favicons.length > 1) thumbnail = preview.favicons[1];
			const title = preview.siteName || preview.title || '(No title)'
			const description = preview.description || ''
			const url = preview.url || target;
			if (!preview.url) console.warning("Preview URL was missing");
			
			setData({title, description, url, thumbnail});
		}
		catch (e) {
			setData({url: target, title: '(No preview)', description:'', thumbnail: null})
		}
	}
	return [data, getPreview, clearPreview]
}

const useServerOffset = () => {
	const [offset, setOffset] = useState(null)

	useEffect(() => {
		const offsetRef = db.ref('/.info/serverTimeOffset')
		offsetRef.on('value', (snap) => {
			setOffset(snap.val())
		})
		return () => offsetRef.off('value')
	}, [])
	return offset
}

export const useCountdown = (onComplete) => {
	const [timeLeft, setTimeLeft] = useState(0)
	const [timer, setTimer] = useState(null)
	const [endTime, setEndTime] = useState(null)
	const offset = useServerOffset()

	const getTimeLeft = useCallback(() => {
		return endTime && offset && Math.max(endTime - (Date.now() + offset), 0)
	}, [endTime, offset])

	useEffect(() => {
		if (timer && timeLeft === 0) {
			clearTimer()
			onComplete && onComplete()
		}
	}, [timeLeft, timer])

	const clearTimer = useCallback(() => {
		setTimeLeft(0)
		clearInterval(timer)
		setTimer(null)
	}, [timer])
	
	useEffect(() => {
		if (endTime && offset) {
			clearTimer()
			setTimeLeft(getTimeLeft())
			const timer = setInterval(() => {
				setTimeLeft(getTimeLeft())
			}, 1000)
			setTimer(timer)
		}
	}, [endTime, offset])
	
	return [timeLeft, setEndTime, clearTimer]
}
