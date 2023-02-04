import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";


const Layout = (props) => {
	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth={props.maxWidth || "xs"} component="main">
				{props.children}
			</Container>
		</React.Fragment>
	);
};
export default Layout;
