import { h } from 'preact'
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

const Description = styled('p')`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 3em;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`

const IconContainer = styled('div')`
    display: grid;
    place-items: center;
	padding: 20px;
`

export const Preview = ({preview}) => {
	// const [preview, setPreview] = useState(null);
	// useEffect(async () => {
	// 	if (url !== null) {
	// 		const response = await axios.post('/.netlify/functions/preview', {url})
	// 		setPreview(response.data);
	// 	}
	// }, [url])
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
			<div class="col-sm-12 col-md-8">
				<h2 class="truncate-width">{preview.title}</h2>
				<Description>{lorem}</Description>
				<div class="row fluid">
					<div class="col-sm-10">
						<p class="vertical-center truncate-width">{preview.url}</p>
					</div>
					<div class="col-sm-2" style="padding: 0; position:relative">
						<Icon className="bottom-right-icon" path={mdiArrowRightCircleOutline} size={2} />
					</div>
				</div>
			</div>
		</Card>
	)
}