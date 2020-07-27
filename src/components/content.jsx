import { h, Fragment } from 'preact'
import styled, { keyframes, css } from 'styled-components'
import { useState, useEffect, useCallback } from 'preact/hooks'
import axios from 'redaxios'
import { mdiArrowLeftBold, mdiBomb } from '@mdi/js'
import Icon from '@mdi/react'

import { useUser, useDoc, usePreview } from 'hooks'
import { Form } from 'components/Form'
import { Preview } from 'components/Preview'
import { StatusChip } from 'components/StatusChip'

const SpinnerContainer = styled('div')`
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

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const FadeIn = styled.div`
	display: ${props => props.visible ? 'block' : 'none'};
	animation: ${props => props.visible ? fadeIn : null} 0.2s linear;
`

const BackControls = () => {
	return (
		<div class="row">
			<p>Visit this link on your</p>
		</div>
	)
}

const ActionBarContainer = styled.div`
	margin-bottom: 1rem;
`

const ActionBarEditButton = styled.button`
	background: none;
	display: inline-grid;
	grid-auto-flow: column;
	align-items: center;
	margin: 0;
`

// const ActionBarLeftText = styled.``


const LinkStore = ({user}) => {
	const [doc, uploadUrl] = useDoc(user)
	const [editing, setEditing] = useState(false)
	const [imgLoaded, setImgLoaded] = useState(false)
	const [previewData, previewStatus, updatePreviewUrl] = usePreview()
	// const previewStatus = 'done';
	// const doc = {url};

	useEffect(() => {
		// When firestore detects a new record, request a preview update
		if (doc) { updatePreviewUrl(doc.url) }
	}, [doc]);
	const urlHandler = useCallback((url) => {
		uploadUrl(url);
		setEditing(false)
	}, [uploadUrl])

	if (editing) {
		// We don't have a record, and we already tried waiting for a preview
		// TODO: this logic is weird?? Shouldn't I instead be waiting for a signal from useDoc?
		return <Form urlHandler={urlHandler} />
	}
	else {
		if (previewData && previewStatus === 'done') {
			return (
				<FadeIn visible={imgLoaded}>
					<ActionBarContainer class="row">
						<div class="col-sm-6">
							<ActionBarEditButton onClick={() => setEditing(true)}>
								<Icon path={mdiArrowLeftBold} size={2} /><p>Edit link</p>
							</ActionBarEditButton>
						</div>
					</ActionBarContainer>
					<Preview previewData={previewData} onImgLoad={()=>{setImgLoaded(true)}} />
				</FadeIn>
			)
		}
		else {
			return (
				<Spinner />
			)
		}
	}
}

// TODO: remove this, just put stuff directly in the main App
export const Content = () => {
	const user = useUser();
	// const user = null;
	return (
		<>
			{user && <LinkStore user={user} previewData={preview}/>}
			<StatusChip user={user} />
		</>
	)
}

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