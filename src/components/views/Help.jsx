import { h } from 'preact'

import styled from 'styled-components'
import { mdiClose, mdiGithub  } from '@mdi/js'

import { ContentView } from './common'
import ActionBar from '../ActionBar'

const Section = styled.div`
	margin-bottom: 40px;
`

const CenterSection = styled(Section)`
	text-align: center;
`

const Step = styled.li`
	margin-left: 20px;
`

export default function Help({closeAction, ...props}) {
	const actions = {
		left: {
			icon: mdiGithub,
			label: "Source",
			href: 'https://github.com/mattrossman/hmd-link',
			title: "Source"
		},
		right: {
			icon: mdiClose,
			label: "Close",
			action: closeAction,
			title: "Close"
		}
	}
	return (
		<ContentView>
			<ActionBar actions={actions} />
			<div>
				<CenterSection>
					<i>(HMD) = head-mounted display</i>
				</CenterSection>
				<Section>
					<h2>Instructions</h2>
					<p>Visit <b>hmd.link</b> on both your 2D device and XR headset:</p>
					<ol>
						<Step><b>On your 2D device:</b> click "Add link" and submit a URL</Step>
						<Step><b>On your XR headset:</b> verify room name and click link preview</Step>
					</ol>
					<p>Consider bookmarking the page in your XR browser for easy access.</p>
				</Section>
				<Section>
					<h2>Why?</h2>
					<p>Typing long URLs with virtual XR keyboards is a tedious process. With <b>hmd.link</b> you can send links from your primary device
						to your XR headset without any setup or special software.
					</p>
					<p>Now you can spend less time typing and more time experiencing!
					</p>
				</Section>
				<Section>
					<h2>How?</h2>
					<p>Inspired by <a href="https://www.sharedrop.io/">sharedrop.io</a>, <b>hmd.link</b> uses your public IP to assign you to a room in
					which you can publish temporary links. A published link is visible for 5 minutes to any device that shares your public IP,
					which effectively limits it to devices on your local network.
					</p>
					<p>
						Be careful about what information you publish, as depending on your network configuration it may be visible to others.
						Don't include sensitive information like login details in your URL. Note that you can delete a link at any time by
						clicking on the countdown timer.
					</p>
				</Section>
			</div>
		</ContentView>
	)
}