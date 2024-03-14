import { h, Fragment } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import { useDataContext } from 'util/context'

import styled from 'styled-components'
import Icon from '@mdi/react'
import { mdiOpenInNew, mdiWeb, mdiArrowLeft, mdiBomb } from '@mdi/js'

import Spinner from 'components/Spinner'
import ActionBar from 'components/ActionBar'
import View from 'components/View'

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


const Thumbnail = styled('img')`
	display: block;
	background-color: white;
  	object-fit: cover;
	height: 100%;
	width: 100%;
	max-height: 200px;
`

const DivLink = styled('a')`
	background-color: rgb(50, 50, 50);
	&&& {
		text-decoration: none;
		color: white;
	}
	transition: transform .2s, box-shadow .2s;
	box-shadow: 0 0 5px rgb(20, 20, 20);
	&:hover, &:focus, &:active {
		transform: scale(1.05);
		box-shadow: 0 0 10px black;
		text-decoration: none;
		outline: 0;
	}
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


const BottomRow = styled('div')`
	display: grid;
	grid-template-columns: 1fr auto;
`


const UrlText = styled('p')`
	margin-top: auto;
	margin-bottom: 0;
`
UrlText.defaultProps = {className: 'truncate-width'}

const UrlContainer = styled('div')`
	min-width: 0;
	display: flex;
`

const Centered = styled.div`
	display: grid;
	align-items: center;
`

const ThumbnailContainer = styled.div`
	padding: 0;
	min-height: 150px;
	display: grid;
	place-items: center;
	background-color: #444;
`
ThumbnailContainer.defaultProps = {className: "col-sm-12 col-md-4"}

const MarginIcon = styled(Icon)`
	margin: 2em;
`

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

export default function Preview ({editAction, deleteAction}) {
	const {preview: data, timeLeft} = useDataContext()
	const [loading, setLoading] = useState(true);
	const img = useRef(null)

	const actions = {
		left: {
			icon: mdiArrowLeft,
			label: 'Edit link',
			action: editAction,
			title: "Edit shared link"
		},
		right: {
			icon: mdiBomb,
			label: msToString(Math.min(timeLeft + 1000, 1000*60*5)),
			action: deleteAction,
			title: "Delete shared link"
		}
	}
	const imgCompleted = () => img && img.current && img.current.complete
	useEffect(() => {
			if (data) {
				if (data.thumbnail && !imgCompleted()) {
					setLoading(true)  // Wait for img to complete rendering
				}
				else {
					setLoading(false)  // No need to wait for fallback icon
				}
			}
			else {
				setLoading(true)  // Wait to receive data
			}
	}, [data])

	const onThumbLoad = () => {
		setLoading(false)
	}

	const preview = data && (
		<div hidden={loading} className="fadeIn" key={data}>
		<DivLink href={data.url} target="_blank" className="row card-container">
			<ThumbnailContainer>
				{ data.thumbnail
					? <Thumbnail src={data.thumbnail} ref={img} alt="site-preview" onLoad={onThumbLoad} onError={onThumbLoad} />
					: <MarginIcon path={mdiWeb} size={3} />
				}
			</ThumbnailContainer>
			<div class="col-sm-12 col-md-8" style="padding: 10px">
				<RightContainer>
					<h2 class="truncate-width">{data.title}</h2>
					<Description>{data.description}</Description>
					<BottomRow>
						<UrlContainer>
							<UrlText>{data.url}</UrlText>
						</UrlContainer>
						<Centered>
							<Icon path={mdiOpenInNew} size={1} />
						</Centered>
					</BottomRow>
				</RightContainer>
			</div>
		</DivLink>
		</div>
	)
	return (
		<View className="fadeIn" key="preview">
			<ActionBar actions={actions} />
			{preview} 
			{loading && <Spinner />}
		</View>
	)
}