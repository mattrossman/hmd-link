import { h, Fragment } from 'preact'
import styled, { keyframes, css } from 'styled-components'
import { useState, useEffect, useCallback } from 'preact/hooks'
import axios from 'redaxios'
import { mdiClose, mdiArrowLeft, mdiBomb } from '@mdi/js'
import Icon from '@mdi/react'

import { useUser, useDoc, usePreview, useCountdown } from 'hooks'
import { useDummyUser, useDummyDoc } from 'hooks-dummy'
import { Form } from 'components/Form'
import { Preview } from 'components/Preview'
import { StatusChip } from 'components/StatusChip'
import Loading from './Loading'

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
	animation: ${props => props.visible ? fadeIn : null} .2s linear;
`

const ActionBarContainer = styled.div`
	margin-bottom: 1rem;
`

const ActionBarEditButton = styled.button`
	background: none;
	display: inline-flex;
	align-items: center;
	margin: 0;
`

const ActionBarDeleteButton = styled(ActionBarEditButton)`
	float: right;
`

// const ActionBarLeftText = styled.``

const useDocDummy = (user) => {
	const [snapshot, setSnapshot] = useState(null);
	const uploadUrl = () => console.log("Running dummy uploadUrl")
	useEffect(() => {
		const snapshot = new Map();
		snapshot.exists = true;
		snapshot.set('url', 'https://github.com/mattrossman')
		snapshot.set('expires', 1595899100855)
		setSnapshot(snapshot)
	}, [])
	return [snapshot, uploadUrl]
}

const useUserDummy = () => {
	const [user, setUser] = useState(null)
	useEffect(() => {
		setUser({
			displayName: 'dummy-room',
			uid: 123456789
		})
	}, [])

	return user;
}

// const useCountdown = () => {
// 	const [endTime, setEndTime] = useState(null)
// 	const [msLeft, setMsLeft] = useState(null)
// 	const [ticking, setTicking] = useState(false)
// 	const getMsLeft = useCallback(() => {
// 		return endTime ? endTime - Date.now() : null
// 	}, [endTime])
// 	useEffect(() => {
// 		if (ticking) {
// 			const timer = setTimeout(() => {
// 				setMsLeft(getMsLeft());
// 			}, 1000);
// 			return () => clearTimeout(timer);
// 		}
// 	}, [msLeft, ticking])
// 	useEffect(() => {
// 		if (getMsLeft() > 0) {
// 			setTicking(true);
// 		}
// 	}, [endTime]);
// 	return [msLeft, setEndTime]
// }

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

const LinkStore = ({user}) => {
	const [snapshot, setDocUrl, deleteDoc] = useDoc(user)
	const [editing, setEditing] = useState(false)
	const [imgLoaded, setImgLoaded] = useState(false)
	const [previewData, updatePreviewUrl, clearPreview] = usePreview()
	const [msLeft, setEndTime, clearTimer] = useCountdown(deleteDoc);
	
	useEffect(() => {
		// When the snapshot changes, request a preview update
		if (snapshot && snapshot.exists) {
			setImgLoaded(false);
			updatePreviewUrl(snapshot.get('url'));
			setEndTime(snapshot.get('expires'))
		}
	}, [snapshot]);

	const urlHandler = useCallback((url) => {
		clearPreview();
		setDocUrl(url);
		setEditing(false)
	}, [setDocUrl])

	const deleteHandler = () => {
		deleteDoc();
		clearTimer()
	}
	const onImgLoad = () => {
		setImgLoaded(true);
		// setEndTime(Date.now() + 1000*3)
	}

	if (editing || (snapshot && !snapshot.exists) || (msLeft && msLeft <= 0)) {
		return <Form urlHandler={urlHandler} />
	}
	else {

		// We are attempting to show a preview
		if (!previewData) {
			return <Spinner />
		}
		else {
			// Show preview with action buttons
			return (
				<FadeIn visible={imgLoaded}>
					<ActionBarContainer class="row">
							<ActionBarEditButton onClick={() => setEditing(true)}>
								<Icon path={mdiArrowLeft} size={2} /><p>Edit link</p>
							</ActionBarEditButton>
							<ActionBarDeleteButton onClick={deleteHandler}>
								<p>{msLeft && msToString(msLeft)}</p><Icon path={mdiBomb} size={2} />
							</ActionBarDeleteButton>
					</ActionBarContainer>
					<Preview data={previewData}  onImgLoad={onImgLoad} />
				</FadeIn>
			)
		}
	}
}

// TODO: remove this, just put stuff directly in the main App
export const Content = () => {
	const user = useDummyUser();
	// const user = null;
	return (
		<>
			<Loading />
		</>
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