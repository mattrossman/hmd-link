
const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
};

const getFirebaseServices = () => {
	if (firebase.apps.length == 0) {
		firebase.initializeApp(firebaseConfig);
	}
	return {
		db: firebase.firestore(),
		auth: firebase.auth()
	}
}

const getPublicIp = headers => {
	const ip = headers['x-nf-client-connection-ip']
			|| headers['client-ip'];
	return ip === '::1' ? '127.0.0.1' : ip;
}

const randomPin = len => Math.random().toString().substr(2, len)

exports.handler = async event => {
	/* body = {
		url: "www.example.com",
		token: xyz123
	}
	*/
	const body = JSON.parse(event.body);
	const { db, auth } = getFirebaseServices()
	const ip = getPublicIp(event.headers)
	try {
		await auth.signInWithCustomToken(body.token);
		const pin = randomPin(4)
		const payload = {
			url: body.url,
			ip: ip,
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