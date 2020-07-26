import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import axios from 'redaxios'

import styled from 'styled-components'
import Icon from '@mdi/react'
import { mdiArrowRightCircleOutline } from '@mdi/js'

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


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

// Restricts number of vertical lines
const Description = styled('p')`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 3em;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`

const RightContainer = styled('div')`
	height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
	padding: 0;
`
// RightContainer.defaultProps = {className: "col-sm-12 col-md-8"}


const BottomRow = styled('div')`
	display: grid;
	grid-template-columns: 1fr auto;
`


const UrlText = styled('p')`
	margin-top: auto;
`
UrlText.defaultProps = {className: 'truncate-width'}

const UrlContainer = styled('div')`
	min-width: 0;
	display: flex;
`

export const Preview = ({ url }) => {
	const [preview, setPreview] = useState(null);
	useEffect(async () => {
		if (url !== null) {
			const response = await axios.post('/.netlify/functions/preview', {url})
			setPreview(response.data);
		}
	}, [url])
	let thumbnail;
	if (preview !== null) {
		if (preview.images.length > 0) thumbnail = preview.images[0];
		else if (preview.favicons.length > 1) thumbnail = preview.favicons[1];
		else thumbnail = 'https://picsum.photos/id/1025/200';
	}
	return preview && (
		<Card className="row">
			<div class="col-sm-12 col-md-4" style="padding: 0; height: auto;">
				<Thumbnail src={thumbnail} alt="site-preview"></Thumbnail>
			</div>
			<div class="col-sm-12 col-md-8" style="padding: 10px">
				<RightContainer>
					<h2 class="truncate-width">{preview.title}</h2>
					<Description>{preview.description}</Description>
					<BottomRow>
						<UrlContainer>
							<UrlText>{preview.url}</UrlText>
						</UrlContainer>
						<Icon path={mdiArrowRightCircleOutline} size={2} />
					</BottomRow>
				</RightContainer>
			</div>
		</Card>
	)
}