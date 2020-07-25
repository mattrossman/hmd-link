import { h } from 'preact'
import { makeStyles, Paper, Grid, Typography, TextField, Button, Hidden } from '@material-ui/core'
import { FormControl } from '@material-ui/core';
import { LinkIcon } from './icons';


const useStyles = makeStyles(theme => ({
	formContainer: {
		padding: theme.spacing(4),
	},
	form : {
		width: '100%',
		marginTop: theme.spacing(1),
		textAlign: 'center',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		width: 'auto'
	},
	icon: {
		width: '50%',
		height: '50%',
	}
}))

export default () => {
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<Grid container>
				<Hidden only='xs'>
					<Grid container md={3} alignItems="center" justify="center">
						<LinkIcon className={classes.icon} />
					</Grid>
				</Hidden>
				<Grid container xs={12} md={9} justify="center" className={classes.formContainer} >
					<Typography variant="h4" gutterBottom>Step 1: Paste a link</Typography>
					<form noValidate className={classes.form} >
						<TextField required fullWidth placeholder="e.g. www.example.com" variant="outlined" margin="normal" />
						<Button type="submit" className={classes.submit} variant="contained" size="large"
							color="primary"
							onClick={() => window.alert('click')}>Submit</Button>
					</form>
				</Grid>
			</Grid>
		</Paper>
	)
}