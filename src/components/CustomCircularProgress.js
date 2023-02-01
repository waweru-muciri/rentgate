import React from 'react';
import { makeStyles } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        height: 80,
        width: 120,
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
        height: 50,
        width: 50,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function CustomCircularProgress({ open, dialogTitle }) {
    const classes = useStyles();
    
    return (
        <Dialog maxWidth={"md"} aria-labelledby="simple-dialog-title" open={open}>
            <DialogContent>
                <Grid container alignItems="center" direction="column">
                    <Grid item lg>
                        <Typography>{dialogTitle || "Saving..."}</Typography>
                    </Grid>
                    <Grid item lg>
                        <div className={classes.root}>
                            <div className={classes.wrapper}>
                                {open && <CircularProgress size={50} className={classes.buttonProgress} />}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>

    );
}
