import { h, Fragment } from 'preact'
import styled from 'styled-components'
import { useState, useEffect } from 'preact/hooks'
import axios from 'redaxios'

import { useUser, useDoc } from 'hooks'
import { Form } from 'components/form'

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const Dot = styled('span')`
	height: .5em;
	width: .5em;
	background-color: ${props => props.color || 'white'};
	border-radius: 50%;
	margin-right: 10px;
	display: inline-block;
`

const Thumbnail = styled('img')`
	display: block;
  	object-fit: cover;
	height: 100%;
	width: 100%;
	max-height: 200px;
`

const Card = styled('div')`
	background: rgb(50, 50, 50);
	box-shadow: 0 0 5px black;
`

const Description = styled('p')`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: auto;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`

const Preview = ({preview}) => {
	// const [preview, setPreview] = useState(null);
	// useEffect(async () => {
	// 	if (url !== null) {
	// 		const response = await axios.post('/.netlify/functions/preview', {url})
	// 		setPreview(response.data);
	// 	}
	// }, [url])

	return preview && (
		<Card className="row">
			<div class="col-sm-12 col-md-4" style="padding: 0; height: auto;">
				<Thumbnail src={preview.images[0]} alt="site-preview"></Thumbnail>
			</div>
			<div class="col-sm-12 col-md-8">
				<h2 class="truncate-width">{preview.title}</h2>
				<Description>{lorem}</Description>
			</div>
		</Card>
	)
}

const LinkStore = ({user}) => {
	const doc = useDoc(null)
	// const doc = useDoc(user)

	if (doc === null) {
		// return <p>No saved link</p>
		return <Preview url="https://andrejgajdos.com/how-to-create-a-link-preview/" />
	}
	else {
		return (
			<Preview url={doc.url} />
		)
	}
}

// export const Content = () => {
// 	const user = useUser();
// 	let status;
// 	let content;
// 	if (user === null) {
// 		status = <p><Dot color='orange'/>Connecting...</p>
// 		content = null;
// 	}
// 	else {
// 		status = <p><Dot color='#0f0'/>Room name: <b>{user.displayName}</b></p>
// 		content = <LinkStore user={user}/>
// 	}
// 	return (
// 		<>
// 			{status}
// 			{content}
// 		</>
// 	)
// }

const preview = { "url": "https://andrejgajdos.com/how-to-create-a-link-preview/", "title": "How to Create a Link Preview: The Definite Guide [Implementation and Demo Included] | Andrej Gajdos", "siteName": "Andrej Gajdos", "description": "The whole strategy of creating link previews, including implementation using open-source libraries in node.js. The whole solution is released as npm package.", "mediaType": "article", "contentType": "text/html; charset=UTF-8", "images": ["https://andrejgajdos.com/wp-content/uploads/2019/11/generating-link-preview-1024x562.png"], "videos": [], "favicons": ["https://andrejgajdos.com/wp-content/uploads/2019/05/cropped-andrejgajdos.com_-32x32.jpg?x80378", "https://andrejgajdos.com/wp-content/uploads/2019/05/cropped-andrejgajdos.com_-192x192.jpg?x80378"] }
const previews = [
	{"url":"https://github.com/developit","title":"developit - Overview","siteName":"GitHub","description":"Web DevRel at @google. Creator of @preactjs and other tiny libraries. - developit","mediaType":"profile","contentType":"text/html; charset=utf-8","images":["https://avatars0.githubusercontent.com/u/105127?s=400&u=69e33cdaa236c093332f7860106b047bd51fadd4&v=4"],"videos":[],"favicons":["https://github.githubassets.com/favicons/favicon.svg"]}
]

export const Content = () => {
	return <Preview preview={previews[0]}/>
}