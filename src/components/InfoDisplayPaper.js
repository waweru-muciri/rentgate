import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { commonStyles } from "../components/commonStyles";

let InfoDisplayPaper = (props) => {
	const classes = commonStyles();
	return (
		<Grid item xs={props.xs} md>
			<Paper
				className={classes.infoDisplayPaper}
				variant="elevation"
			>
				<Typography component="h3" variant="h6" align="center">
					{props.value}
				</Typography>
				<Typography variant="subtitle1" align="center">
					{props.title}
				</Typography>
			</Paper>
		</Grid>
	);
};

export default InfoDisplayPaper;
