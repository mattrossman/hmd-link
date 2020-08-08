import { h, Fragment } from 'preact'
import { useState, useEffect, useCallback } from 'preact/hooks'
import axios from 'redaxios'

import styled from 'styled-components'
import Icon from '@mdi/react'
import { mdiOpenInNew, mdiWeb, mdiArrowLeft, mdiBomb } from '@mdi/js'

import { usePreview } from 'util/hooks'
import { useDataContext } from '../util/context'
import Spinner from './Spinner'
import ActionBar from 'components/ActionBar'
import { ContentView } from 'util/ui'

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


const Thumbnail = styled('img')`
	display: block;
	background-color: white;
  	object-fit: cover;
	height: 100%;
	width: 100%;
	max-height: 200px;
`

const Card = styled('div')`
	color: white;
	background: rgb(50, 50, 50);
	background-color: none;
  	transition: transform .2s, box-shadow .2s; 
	&:hover {
		transform: scale(1.05);
		box-shadow: 0 0 10px black;
	}
`

const DivLink = styled('a')`
	&:hover {
		text-decoration: none;
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
	height: auto;
	display: grid;
	place-items: center;
	background-color: #444;
`
ThumbnailContainer.defaultProps = {className: "col-sm-12 col-md-4"}

const MarginIcon = styled(Icon)`
	margin: 2em;
`

export const Preview = ({editAction, deleteAction}) => {
	const {preview: data} = useDataContext()
	const [thumbnailReady, setThumbnailReady] = useState(true);

	// useEffect(() => {
	// 	console.log('running data effect', data)
	// 	if (data && data.thumbnail)
	// 		setThumbnailReady(false)
	// 	else
	// 		setThumbnailReady(true)
	// }, [data])
	const actions = {
		left: {
			icon: mdiArrowLeft,
			label: 'Edit link',
			action: editAction
		},
		right: {
			icon: mdiBomb,
			label: 'Delete',
			action: deleteAction
		}
	}

	const preview = data && (
		<DivLink href={data.url} target="_blank">
			<Card className="row card-container shadowed">
				<ThumbnailContainer>
					{ data.thumbnail
						? <Thumbnail src={data.thumbnail} alt="site-preview" />
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
			</Card>
		</DivLink>
	)
	return (
		<ContentView>
			<ActionBar actions={actions} />
			{preview} 
			{(!data || !thumbnailReady) && <Spinner />}
		</ContentView>
	)
}