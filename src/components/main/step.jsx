import { h } from 'preact'
import { makeStyles, Paper, Grid, Typography, TextField, Button, Hidden } from '@material-ui/core'
import { FormControl } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';


const useStyles = makeStyles(theme => ({
	formContainer: {
		padding: theme.spacing(2),
	},
	form : {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	icon: {
		width: '50%',
		height: '50%',
	}
}))

export default ({num}) => {
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
					<FormControl noValidate autoComplete="off" className={classes.form} >
						<TextField id="outlined-basic" variant="outlined" margin="normal" />
					</FormControl>
					<Button xs={8} className={classes.submit} type="submit" variant="contained" size="large" >Submit</Button>

				</Grid>
			</Grid>
		</Paper>
	)
}