import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import { UserProvider, ActivityProvider } from 'util/context'

import 'mini.css/dist/mini-dark.min.css'
import 'style.css'
import styled from 'styled-components'

import { Header } from 'components/Header'
import { Content } from 'components/Content'
import { StatusChip } from 'components/StatusChip'
import ActionBar from 'components/ActionBar'

const sleep = ms => new Promise(r => setTimeout(r, ms))

const Grid = styled.div`
	display: grid;
	grid-template-rows: auto auto 1fr auto;
	height: inherit;
`

const Sections = ({children}) => {
	return (
		<div className="container" style="height: inherit;">
			<div class="row" style="height: inherit;">
				<Grid className="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
					{children}
				</Grid>
			</div>
		</div>
	)
}

const App = () => {
	// The app has 4 main sections, labeled below
	return(
		<Sections>
			<Header />  {/* 1 */}
			<UserProvider>
				<Content /> {/* 2, 3 */}
				<StatusChip /> {/* 4 */}
			</UserProvider>
		</Sections>
	)
}



render(<App />, document.body);