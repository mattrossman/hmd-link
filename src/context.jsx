import { h, createContext } from 'preact'
import { useDummyUser } from 'hooks-dummy'
import { useContext } from 'preact/hooks';

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
	const user = useDummyUser(1000);
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
	delete: () => {}
})