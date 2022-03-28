import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function Gift({data}) {

    const { name, description, budget, cluttering, shortlived } = data

    return (
        <>
            <Card sx={{ minWidth: 275, borderRadius: 5, mx: '5px', my: '5px' }} component={motion.div} whileHover={{ scale: 1.05, transition: { duration: 0.3 }}} whileTap={{ scale: 0.9 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {description}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        Price: {budget}
                    </Typography>
                    <Typography variant="body2">
                        Size: {cluttering}
                        <br />
                        One-time use: {shortlived === true ? 'Yes' : 'No'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large" onClick={() => {window.open('https://www.google.com/search?q=' + name, "_blank")}} >Learn More</Button>
                </CardActions>
            </Card>
        </>
    );
}