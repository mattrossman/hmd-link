import { h, Fragment } from 'preact'
import styled, { keyframes, css } from 'styled-components'
import { useState, useEffect, useCallback } from 'preact/hooks'
import { mdiPlus, mdiArrowLeft, mdiBomb, mdiClose } from '@mdi/js'

import { useUserContext, useDataContext } from 'util/context'
import { Form } from 'components/Form'
import { Preview } from 'components/Preview'
import Waiting from './Waiting'
import FadeIn from './FadeIn'
import ActionBar from './ActionBar'
import Spinner from './Spinner'


// const sleep = ms => new Promise(r => setTimeout(r, ms))


const pad = (n, width, char) => {
	char = char || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(char) + n;
}

const msToString = (ms) => {
	const minutes = Math.floor((ms / 1000 / 60) % 60)
	const seconds = Math.floor((ms / 1000) % 60)
	return `${minutes}:${pad(seconds, 2)}`
}

const MainContent = styled.div`
	display: grid;
	grid-template-rows: auto 1fr;
`

// TODO: remove this, just put stuff directly in the main App
export const Content = () => {
	const user = useUserContext()
	const { snapshot, upload, clearData, clearPreview } = useDataContext();
	const [editing, setEditing] = useState(false);
	let content;
	let actions = { left: null, right: null};
	const onCompleteForm = (url) => {
		upload(url)
		setEditing(false)
		clearPreview()
	}

	if (user == null || snapshot == null) {
		content = <Spinner />
	}
	else if (editing) {
		content = <Form onComplete={onCompleteForm} />
		actions = {
			right: {
				icon: mdiClose,
				label: 'Cancel',
				action: () => setEditing(false)
			}
		}
	}
	else {
		if (snapshot.exists()) {
			content = <Preview />
			actions = {
				left: {
					icon: mdiArrowLeft,
					label: 'Edit link',
					action: () => setEditing(true)
				},
				right: {
					icon: mdiBomb,
					label: 'Delete',
					action: clearData
				}
			}
		}
		else {
			content = <Waiting />
			actions = {
				left: {
					icon: mdiPlus,
					label: 'Add link',
					action: () => setEditing(true)
				}
			}
		}
	}

	return (
		<MainContent>
			<ActionBar actions={actions} />
			<div>
				{content}
			</div>
		</MainContent>
	)
}

			// {user && <LinkStore user={user} previewData={preview}/>}
			// <StatusChip user={user} />

const preview = {
	title: "developit - Overview",
	description: "Web DevRel at @google. Creator of @preactjs and other tiny libraries. - developit",
	url: "https://github.com/developit",
	thumbnail: "https://avatars0.githubusercontent.com/u/105127?s=400&u=69e33cdaa236c093332f7860106b047bd51fadd4&v=4"
}

const previews = [
	{"url":"https://github.com/developit","title":"developit - Overview","siteName":"GitHub","description":"Web DevRel at @google. Creator of @preactjs and other tiny libraries. - developit","mediaType":"profile","contentType":"text/html; charset=utf-8","images":["https://avatars0.githubusercontent.com/u/105127?s=400&u=69e33cdaa236c093332f7860106b047bd51fadd4&v=4"],"videos":[],"favicons":["https://github.githubassets.com/favicons/favicon.svg"]},
	{"url":"https://hubs.mozilla.com/","title":"Hubs by Mozilla","description":"Share a virtual room with friends. Watch videos, play with 3D objects, or just hang out.","mediaType":"website","contentType":"text/html; charset=utf-8","images":[],"videos":[],"favicons":["https://hubs.mozilla.com/favicon.ico","https://hubs.mozilla.com/app-icon.png"]},
	{ "url": "https://andrejgajdos.com/how-to-create-a-link-preview/", "title": "How to Create a Link Preview: The Definite Guide [Implementation and Demo Included] | Andrej Gajdos", "siteName": "Andrej Gajdos", "description": "The whole strategy of creating link previews, including implementation using open-source libraries in node.js. The whole solution is released as npm package.", "mediaType": "article", "contentType": "text/html; charset=UTF-8", "images": ["https://andrejgajdos.com/wp-content/uploads/2019/11/generating-link-preview-1024x562.png"], "videos": [], "favicons": ["https://andrejgajdos.com/wp-content/uploads/2019/05/cropped-andrejgajdos.com_-32x32.jpg?x80378", "https://andrejgajdos.com/wp-content/uploads/2019/05/cropped-andrejgajdos.com_-192x192.jpg?x80378"] }
]

// export const Content = () => {
// 	return <Preview url="https://github.com/mattrossman" />
// }