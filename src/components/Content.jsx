import { h, Fragment } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
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
	const didPrefill = useRef(false)

	const onCompleteForm = (url) => {
		upload(url)
		setEditing(false)
		clearPreview()
	}

	useEffect(() => {
		if (didPrefill.current) return
		/**
		 * Handle pre-filled URL in default query param or path
		 * - hmd.link/?example.com
		 * - hmd.link/example.com
		 */
		const prefilledUrl = location.href
			.replace(location.origin, '') // remove https://hmd.link
			.replace(/^\//, "") // remove leading slash from path
			.replace(/^\?/, "") // remove separator for query string
		if (prefilledUrl.length > 0 && upload) {
			upload(prefilledUrl)
			didPrefill.current = true
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
