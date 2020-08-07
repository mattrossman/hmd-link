import { h, createContext } from 'preact'
import { useUser, useData, usePreview } from 'util/hooks'
import { useDummyUser } from 'util/hooks-dummy'
import { useContext, useState, useEffect } from 'preact/hooks';

// Provide Firebase user
const UserContext = createContext(null);
export const UserProvider = ({children}) => {
	const user = useUser()
	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	)
}
export const useUserContext = () => useContext(UserContext)

// TODO: remove this unused context
// Provide info on the current screen and available actions
const initialActions = {
	leftAction: null,
	rightAction: null
}
const ActivityContext = createContext({
	actions: initialActions,
	setActions: () => {},
	setIntent: () => {},
})
export const ActivityProvider = ({children}) => {
	const [actions, setActions] = useState(initialActions)
	const [intent, setIntent] = useState('wait')
	return (
		<ActivityContext.Provider value={{actions, setActions, intent, setIntent}}>
			{children}
		</ActivityContext.Provider>
	)
}
export const useActivityContext = () => useContext(ActivityContext)


const DataContext = createContext({
	snapshot: null,
	upload: () => {},
	clear: () => {}
})
export const DataProvider = ({children}) => {
	const user = useUserContext();
	const [snapshot, upload, clearData] = useData(user);
	const [preview, setTarget, clearPreview] = usePreview()
	useEffect(() => {
		if (snapshot && snapshot.exists()) {
			setTarget(snapshot.child('url').val())
		}
	}, [snapshot])
	return (
		<DataContext.Provider value={{snapshot, upload, clear: clearData, preview}}>
			{children}
		</DataContext.Provider>
	)
}
export const useDataContext = () => useContext(DataContext)