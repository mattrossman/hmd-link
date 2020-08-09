import { h, createContext } from 'preact'
import { useUser, useData, usePreview, useCountdown } from 'util/hooks'
import { useDummyUser, useDummyData } from 'util/hooks-dummy'
import { useContext, useState, useEffect } from 'preact/hooks';

const DUMMY = true;

// Provide Firebase user
const UserContext = createContext(null);
export const UserProvider = ({children}) => {
	// const user = useUser()
	const user = DUMMY ? useDummyUser() : useUser()
	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	)
}
export const useUserContext = () => useContext(UserContext)

const DataContext = createContext({
	snapshot: null,
	upload: () => {},
	clear: () => {}
})
export const DataProvider = ({children}) => {
	const user = useUserContext();
	const [snapshot, upload, clearData] = DUMMY ? useDummyData(user) : useData(user)
	const [preview, setTarget, clearPreview] = usePreview()
	const [timeLeft, setEndTime, clearTimer] = useCountdown()

	useEffect(() => {
		if (snapshot && snapshot.exists()) {
			setTarget(snapshot.child('url').val())
			setEndTime(snapshot.child('timestamp').val() + 1000*60*5)
		}
	}, [snapshot])

	return (
		<DataContext.Provider value={{snapshot, upload, clearData, preview, clearPreview, timeLeft}}>
			{children}
		</DataContext.Provider>
	)
}
export const useDataContext = () => useContext(DataContext)