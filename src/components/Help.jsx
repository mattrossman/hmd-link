import { h } from 'preact'
import styled from 'styled-components'
import { ContentView } from 'util/ui'
import ActionBar from './ActionBar'
import { mdiClose, mdiArrowLeft } from '@mdi/js'

const Section = styled.div`
	margin-bottom: 40px;
`

export default function Help({closeAction, ...props}) {
	const actions = {
		right: {
			icon: mdiClose,
			label: "Close",
			action: closeAction
		}
	}
	return (
		<ContentView>
			<ActionBar actions={actions} />
			<div>
				<Section>
					<h3>Quickstart</h3>
					<ol>
						<li><b>On your desktop/laptop/phone:</b> click "Add link" and submit a URL</li>
						<li><b>On your XR headset:</b> click the resulting link preview</li>
					</ol>
				</Section>
				<Section>
					<h3>Why?</h3>
					<p>Typing long URLs in XR web browers is a tedious process. With hmd.link you can send links from your primary device
						to your XR headset without any setup or special software.
					</p>
				</Section>
				<Section>
					<h3>How?</h3>
					<p>Inspired by <a href="https://www.sharedrop.io/">sharedrop.io</a>, hmd.link uses your public IP to assign you to a room in
					which you can publish temporary links. A published link is visible for 5 minutes to any device that shares your public IP,
					which effectively limits it to devices on your local network.
					</p>
					<p>
						Be careful about what information you publish, as depending on your network configuration it may be shared with others.
						Don't include sensitive information like login details in your URL. Note that you can delete a link at any time by
						clicking on the countdown timer.
					</p>
				</Section>
			</div>
		</ContentView>
	)
}