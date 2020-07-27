import { h, Fragment } from 'preact'
import styled from 'styled-components'
import { useState, useEffect } from 'preact/hooks'
import axios from 'redaxios'


import { useUser, useDoc, usePreview } from 'hooks'
import { Form } from 'components/form'
import { Preview } from 'components/preview'


const Dot = styled('span')`
	height: .5em;
	width: .5em;
	background-color: ${props => props.color || 'white'};
	border-radius: 50%;
	margin-right: 10px;
	display: inline-block;
`

const Spinner = () => {
	return (
		<div class="spinner"></div>
	)
}

const LinkStore = ({user}) => {
	const [doc, uploadUrl] = useDoc(user)
	const [previewData, previewStatus, updatePreviewUrl] = usePreview()

	useEffect(() => {
		if (doc) {
			updatePreviewUrl(doc.url)
		}
	}, [doc]);

	if ((doc === null || doc === undefined) && previewStatus !== null) {
		console.log('Preview status is ', previewStatus);
		// return <p>No saved link</p>
		return <Form urlHandler={uploadUrl}/>
	}
	else {
		if (previewData !== null && previewStatus === 'done') {
			return (
				<Preview previewData={previewData} />
			)
		}
		else {
			return (
				<Spinner />
			)
		}
	}
}

const FixedFooter = styled('div')`
   position:fixed;
   display: grid;
   place-items: center;
   left:0px;
   bottom:0px;
   width:100%;
`

const BottomChip = styled('div')`
	width: max-content;
	display: grid;
	place-items: center;
	height: 3em;
	border-radius: 1.5em;
	background: rgb(50, 50, 50);
	box-shadow: 0 0 5px black;
	padding: 0 20px;
	margin: 20px;
`

export const Content = () => {
	const user = useUser();
	let status;
	let content;
	if (user === null) {
		status = <p><Dot color='orange'/>Connecting...</p>
		content = <Spinner />
	}
	else {
		status = <p><Dot color='#0f0'/><b>{user.displayName}</b></p>
		content = <LinkStore user={user}/>
	}
	return (
		<>
			{content}
			<FixedFooter>
				<BottomChip>
					{status}
				</BottomChip>
			</FixedFooter>
		</>
	)
}

// const previews = [
// 	{"url":"https://github.com/developit","title":"developit - Overview","siteName":"GitHub","description":"Web DevRel at @google. Creator of @preactjs and other tiny libraries. - developit","mediaType":"profile","contentType":"text/html; charset=utf-8","images":["https://avatars0.githubusercontent.com/u/105127?s=400&u=69e33cdaa236c093332f7860106b047bd51fadd4&v=4"],"videos":[],"favicons":["https://github.githubassets.com/favicons/favicon.svg"]},
// 	{"url":"https://hubs.mozilla.com/","title":"Hubs by Mozilla","description":"Share a virtual room with friends. Watch videos, play with 3D objects, or just hang out.","mediaType":"website","contentType":"text/html; charset=utf-8","images":[],"videos":[],"favicons":["https://hubs.mozilla.com/favicon.ico","https://hubs.mozilla.com/app-icon.png"]},
// 	{ "url": "https://andrejgajdos.com/how-to-create-a-link-preview/", "title": "How to Create a Link Preview: The Definite Guide [Implementation and Demo Included] | Andrej Gajdos", "siteName": "Andrej Gajdos", "description": "The whole strategy of creating link previews, including implementation using open-source libraries in node.js. The whole solution is released as npm package.", "mediaType": "article", "contentType": "text/html; charset=UTF-8", "images": ["https://andrejgajdos.com/wp-content/uploads/2019/11/generating-link-preview-1024x562.png"], "videos": [], "favicons": ["https://andrejgajdos.com/wp-content/uploads/2019/05/cropped-andrejgajdos.com_-32x32.jpg?x80378", "https://andrejgajdos.com/wp-content/uploads/2019/05/cropped-andrejgajdos.com_-192x192.jpg?x80378"] }
// ]

// export const Content = () => {
// 	return <Preview url="https://github.com/mattrossman" />
// }