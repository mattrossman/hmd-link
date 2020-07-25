import { h } from 'preact'
import { Container, Paper } from '@material-ui/core';

import { Header } from './header'
import { StepOne } from './steps'

export const MainContent = () => {
	return (
		<Container maxWidth="md">
			<Header />
			<StepOne />
		</Container>
	)
}