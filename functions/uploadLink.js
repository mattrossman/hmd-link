
const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
};

const getFirestore = () => {
	if (firebase.apps.length == 0) {
		firebase.initializeApp(firebaseConfig);
	}
	return firebase.firestore();
}


const randomPin = len => Math.random().toString().substr(2, len)

exports.handler = async event => {
	const body = JSON.parse(event.body);
	const db = getFirestore();
	try {
		const pin = randomPin(4)
		const payload = {
			url: body.url,
			timestamp: Date.now()
		}
		await db.collection("urls").doc(pin).set(payload)
		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		}
	}
	catch (error) {
		return {
			statusCode: 400,
			body: "Error writing document: " + error,
		}
	}
}