import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useUserContext, useDataContext } from 'util/context'

import View from './View'
import Form from './views/Form'
import Preview  from './views/Preview'
import Waiting from './views/Waiting'
import About from './views/Info'
import Spinner from './Spinner'


export default function Content() {
	const user = useUserContext()
	const { snapshot, upload, clearData, clearPreview, timeLeft } = useDataContext()
	const [editing, setEditing] = useState(false)
	const [showInfo, setShowInfo] = useState(false)

	const onCompleteForm = (url) => {
		upload(url)
		setEditing(false)
		clearPreview()
	}

	useEffect(() => {
		const url = new URL(window.location.href)
		const urlSearchParam = url.searchParams.get('url')
		if (urlSearchParam && upload) {
			console.log('submitting', urlSearchParam)
			upload(urlSearchParam)
			window.history.replaceState(null, '', window.location.origin)
		}
	}, [upload])

	if (user == null || snapshot == null) {
		return <View><div /> <Spinner /></View>
	}
	if (showInfo) {
		return <About closeAction={() => setShowInfo(false)} />
	}
	else if (editing) {
		return <Form onComplete={onCompleteForm} closeAction={() => setEditing(false)}/>
	}
	else {
		if (snapshot.exists() && timeLeft > 0) {
			return <Preview editAction={() => setEditing(true)} deleteAction={clearData} />
		}
		else {
			return <Waiting addAction={() => setEditing(true)} helpAction={() => setShowInfo(true)} />
		}
	}
}
