import { h } from 'preact'
import { useUser } from 'hooks'

export const Status = () => {
	const user = useUser();
	return (
		<p>Current room: {user && user.displayName}</p>
	)
}
