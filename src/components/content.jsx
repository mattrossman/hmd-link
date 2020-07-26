import { h } from 'preact'
import { Container, Paper } from '@material-ui/core';

import { Header } from './header'
import { StepOne, StepTwo } from './steps'
import { Status } from 'components/main/status'

export const MainContent = () => {
	return (
		<Container maxWidth="md">
			<Header />
			<Status />
			<StepOne />
			<StepTwo />
		</Container>
	)
}