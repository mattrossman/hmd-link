import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import styled from 'styled-components'
import { useDummyUser } from 'hooks-dummy'

import 'mini.css/dist/mini-dark.min.css'
import 'style.css'
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
	const user = useDummyUser(1000);
	const [actions, setActions] = useState({left: null, right: null})
	return(
		<Sections>
			<Header />
			<ActionBar actions={actions} />
			<Content user={user} setActions={setActions} />
			<StatusChip user={user} />
		</Sections>
	)
}



render(<App />, document.body);