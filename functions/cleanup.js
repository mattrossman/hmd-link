const admin = require('firebase-admin');

const init = () => {
	if (admin.apps.length == 0) {
		const key = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
		admin.initializeApp({
			credential: admin.credential.cert(key),
			databaseURL: process.env.FIREBASE_DATABASE_URL
		});
	}
}

exports.handler = async event => {
	try {
		const body = JSON.parse(event.body);
		if (body.adminKey === process.env.ADMIN_KEY) {
			init();
			const db = admin.database()
			const oldestStartTime = Date.now() - 1000*60*5;
			const oldRooms = await db.ref('rooms').orderByChild('timestamp').endAt(oldestStartTime).once('value')
			let removed = 0
			oldRooms.forEach(room => {
				room.ref.remove();
				removed++;
				console.log(room.val())
			})
			return {
				statusCode: 200,
				body: `Removed ${removed} stale entries`
			}
		}
		else {
			return {
				statusCode: 400,
				body: "You need to be admin to perform this action"
			}
		}
	}
	catch (e) {
		return {
			statusCode: 400,
			body: "Bad request"
		}
	}
}