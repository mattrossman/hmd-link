import { useState, useEffect } from 'preact/hooks'

export const sleep = (ms) => new Promise(r => setTimeout(r, ms))

class SnapshotChild {
	constructor(val) {
		this._val = val
	}

	val() {
		return this._val;
	}
}

class Snapshot {
	constructor(exists, obj = {}) {
		this.exists = () => exists
		this.obj = obj
	}

	child(key) {
		return new SnapshotChild(this.obj[key])
	}
}

export const useDummyData = (user) => {
	const [snapshot, setSnapshot] = useState(null);
	const upload = async (url) => {
		const snapshot = new Snapshot(true, {
			timestamp: Date.now(),
			url
		})
		setSnapshot(snapshot)
	}
	const clear = async () => {
		await sleep(100)
		setSnapshot(new Snapshot(false))
	}
	useEffect(() => {
		clear()
	}, [])
	return [snapshot, upload, clear]
}

export const useDummyUser = () => {
	const [user, setUser] = useState(null)
	useEffect(async () => {
		await sleep(500);
		setUser({
			displayName: 'dummy-room-name',
			uid: 123456789
		})
	}, [])
	return user;
}