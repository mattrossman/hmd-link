import { h, Fragment } from "preact";
import { makeStyles, Box, Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(12)
	}
}))


export default () => {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Typography variant="h2" component="h1">
				hmd.link
			</Typography>
			<Typography variant="subtitle1" component="h2">
				Send WebXR links to your headset, instantly.
			</Typography>
		</Box>
	);
}