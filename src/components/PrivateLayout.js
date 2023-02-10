import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import AppNav from "./AppNav";
import {commonStyles} from './commonStyles'

const Layout = (props) => {
	const classes = commonStyles()
	return (
		<React.Fragment>
			<CssBaseline />
			<Container>
				<AppNav classes={classes} pageTitle={"RentGate Property Management"}/>
				<Paper className={classes.rootPaper}>{props.children}</Paper>
			</Container>
		</React.Fragment>
	);
};
export default Layout;
