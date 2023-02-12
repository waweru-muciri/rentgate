import React from "react";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { commonStyles } from "../components/commonStyles";

let TenantInfoDisplayCard = (props) => {
    const classes = commonStyles();
    const {title, avatar, avatarSrc, subheader, cardContent} = props
    return (
        <Card className={classes.fullHeightWidthContainer} variant="outlined" elevation={1}>
            <CardHeader
                avatar={
                    <Avatar aria-label="contact avatar" src={avatarSrc ? avatarSrc : ''} className={classes.avatar}>
                        {avatar}
                    </Avatar>
                }
                title={title}
                subheader={subheader}
            />
            <CardContent>
               {
                   cardContent.map((content, contentIndex) => 
                   <Typography key={contentIndex} gutterBottom variant="body2">
                    {content.name} : {content.value}
                   </Typography>)
               }
            </CardContent>
        </Card>
    );
};

export default TenantInfoDisplayCard;
