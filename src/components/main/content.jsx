import { h } from 'preact'
import { Container, Paper } from '@material-ui/core';

import Header from './header'
import Step from './step'

export const MainContent = () => {
	return (
		<Container maxWidth="md">
			<Header />
			<Step num="1" />
		</Container>
	)
}