import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { useUserContext, useDataContext } from 'util/context'

import { ContentView } from './views/common'
import Form from './views/Form'
import Preview  from './views/Preview'
import Waiting from './views/Waiting'
import Help from './views/Help'
import Spinner from './Spinner'


export default function Content() {
	const user = useUserContext()
	const { snapshot, upload, clearData, clearPreview, timeLeft } = useDataContext()
	const [editing, setEditing] = useState(false)
	const [showHelp, setShowHelp] = useState(false)

	const onCompleteForm = (url) => {
		upload(url)
		setEditing(false)
		clearPreview()
	}

	if (user == null || snapshot == null) {
		return <ContentView><div /> <Spinner /></ContentView>
	}
	if (showHelp) {
		return <Help closeAction={() => setShowHelp(false)} />
	}
	else if (editing) {
		return <Form onComplete={onCompleteForm} closeAction={() => setEditing(false)}/>
	}
	else {
		if (snapshot.exists() && timeLeft > 0) {
			return <Preview editAction={() => setEditing(true)} deleteAction={clearData} />
		}
		else {
			return <Waiting addAction={() => setEditing(true)} helpAction={() => setShowHelp(true)} />
		}
	}
}
