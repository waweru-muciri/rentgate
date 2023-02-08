import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        fontWeight: 700,
    },
}));

export default function PageHeading(props) {
    const styles = useStyles();
    return (
        <Typography
            align="left"
            variant="h5"
            className={styles.root}
            gutterBottom
        >
            {props.text ? props.text : "Page Heading"}
        </Typography>
    );
}
