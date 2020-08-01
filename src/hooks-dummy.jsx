import { useState, useEffect } from 'preact/hooks'

export const useDummyDoc = (user) => {
	const [snapshot, setSnapshot] = useState(null);
	const uploadUrl = () => console.log("Running dummy uploadUrl")
	const deleteDoc = () => console.log("Running dummy deleteDoc")
	useEffect(() => {
		const snapshot = new Map();
		snapshot.exists = true;
		snapshot.set('url', 'https://github.com/mattrossman')
		snapshot.set('expires', 1595899100855)
		setSnapshot(snapshot)
	}, [])
	return [snapshot, uploadUrl, deleteDoc]
}

export const useDummyUser = () => {
	const [user, setUser] = useState(null)
	useEffect(() => {
		setUser({
			displayName: 'dummy-room',
			uid: 123456789
		})
	}, [])
	return user;
}