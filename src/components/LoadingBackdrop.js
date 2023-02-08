import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

export default function LoadingBackdrop(props) {
	const classes = useStyles();
	return (
		<div>
			<Backdrop className={classes.backdrop} open={props.open}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}
