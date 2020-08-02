import { h, Fragment } from 'preact'
import styled, { keyframes, css } from 'styled-components'
import { useState, useEffect, useCallback } from 'preact/hooks'
import { mdiPlus, mdiArrowLeft, mdiBomb, mdiClose } from '@mdi/js'

import { useUserContext, useActivityContext } from 'util/context'
import { Form } from 'components/Form'
import { Preview } from 'components/Preview'
import Waiting from './Waiting'
import FadeIn from './FadeIn'

const SpinnerContainer = styled(FadeIn)`
	display: grid;
	place-items: center;
`

const Spinner = () => {
	return (
		<SpinnerContainer>
			<div class="spinner"></div>
		</SpinnerContainer>
	)
}
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

const ContentContainer = styled(FadeIn)`
	min-height: 0;
`

// TODO: remove this, just put stuff directly in the main App
export const Content = () => {
	const user = useUserContext()
	const [editing, setEditing] = useState(false);
	const {setActions} = useActivityContext()
	let content;
	if (user === null) {
		content = <Spinner />
	}
	else {
		useEffect(() => {
			const actions = editing ? {
				rightAction: {
					icon: mdiClose,
					label: 'Cancel',
					action: () => setEditing(false)
				}
			}
			:
			{
				leftAction: {
					icon: mdiPlus,
					label: 'Add link',
					action: () => setEditing(true)
				}
			}
			setActions(actions)
		}, [editing])
		if (editing) {
			content = <Form onComplete={(url) => console.log('hander got url ', url)}/>
		}
		else {
			content = <Waiting />
		}
	}
	return (
		<ContentContainer key={content}>
			{content}
		</ContentContainer>
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