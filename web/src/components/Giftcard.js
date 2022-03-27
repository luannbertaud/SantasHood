import {
    TextField,
    Paper,
    Grid,
    Typography,
    FormControlLabel,
    Checkbox,
    Slider,
    Box,
    Card,
    CardHeader,
    CardContent,
    Divider
} from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { CurrentCategories, AvailableCategories } from "./Categories";

import "./giftcard.css";

const Item = styled(Paper)(({ theme }) => ({
    padding: "2%",
    textAlign: 'center',
    backgroundColor: "rgba(230, 194, 241, 0.358)",
  }));

export default class Giftcard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            giftUuid: uuidv4(),
            name: undefined,
            description: undefined,
            budget: undefined,
            scope: undefined,
            cluttering: 3,
            shortlived: false,
            categories: [0, 1, 2, 3, 8, 9, 10, 11, 12, 13],
        }
    }

    render() { 
        return (
            <Box
                component={motion.div}
                whileHover={{ scale: 1 }}
                sx={{
                    height:"100%",
                    width:"134%",
                }}
            >
                <Box className='giftcard-outer' >
                    <Card
                        className='giftcard'
                        sx={{
                            borderRadius: "10%",
                        }}
                        elevation={6}
                    >
                        <CardHeader
                            style={{
                                    maxWidth: "40%",
                                    minWidth: 0,
                                    minHeight: 0,
                                
                            }}
                            title={
                                <TextField
                                    InputProps={{
                                        style: {
                                            fontSize: 20,
                                        },
                                    }}
                                    color="secondary"
                                    required
                                    id="name-field"
                                    label="Name"
                                />
                            }
                        />
                        <Divider sx={{borderWidth: "1px", width: "100%"}} />
                        <CardContent
                            sx={{
                                padding: 0,
                                overflowY: "auto",
                                "&:last-child": {
                                    paddingBottom: 0
                                }
                            }}
                        >
                            <Grid container spacing={2} sx={{ height: "100%", width: "100%", marginTop: 0, marginLeft: 0, overflow: "auto", paddingBottom: "2%" }} >
                                <Grid item xs={12}>
                                    <TextField
                                        InputProps={{
                                            style: { fontSize: 20 },
                                        }}
                                        sx={{
                                            minWidth: 0,
                                            maxWidth: "90%",
                                            width: "90%",
                                        }}
                                        multiline
                                        rows={3}
                                        required
                                        color="secondary"
                                        id="description-filed"
                                        label="Description"
                                    />
                                </Grid>
                                <Grid item xs={7} >
                                    <Grid container spacing={0} >
                                        <Grid item xs={12} >
                                            <Box>
                                                <Typography id="input-slider">
                                                    Budget {this.state.cluttering}
                                                </Typography>
                                                <Slider
                                                    defaultValue={3}
                                                    step={1}
                                                    min={1}
                                                    max={10}
                                                    value={this.state.cluttering}
                                                    onChange={event => this.onClutteringChange(event)}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box>
                                                <Typography id="input-slider">
                                                    Cluttering {this.state.cluttering}
                                                </Typography>
                                                <Slider
                                                    defaultValue={3}
                                                    step={1}
                                                    min={1}
                                                    max={10}
                                                    value={this.state.cluttering}
                                                    onChange={event => this.onClutteringChange(event)}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                            sx={{ fontSize: 28 }}
                                                value="end"
                                                control={
                                                    <Checkbox
                                                        defaultChecked
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 28 },
                                                            color: "#ff008c",
                                                            '&.Mui-checked': {
                                                            color: "#ff008c",
                                                            },
                                                        }}
                                                    />
                                                }
                                                labelPlacement="end"
                                                label={
                                                    <Typography id="input-slider">
                                                        Shortlived
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5} sx={{ paddingRight: "2%" }} >
                                    <CurrentCategories
                                        fullWidth="100%"
                                        fullHeight="100%"
                                        fontSize="12px"
                                        fontSizeSecondary="10px"
                                        backgroundColor="rgb(245, 170, 250)"
                                        content={this.state.categories}
                                        setContent={(c) => {this.setState({categories: c})}}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
                <Box
                    sx={{
                        mt: "6%",
                        maxHeight: "50%",
                        width: "24%",
                        scrollbarColor: "rgb(235, 160, 240) transparent",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        float: "left",
                        borderRadius: "10% / 4%",
                        direction: "rtl",
                        scrollbarWidth: "thin",
                    }}
                >
                    <AvailableCategories
                        fullWidth="100%"
                        fullHeight="100%"
                        fontSize="12px"
                        fontSizeSecondary="10px"
                        backgroundColor="rgb(245, 170, 250)"
                        content={this.state.categories}
                        setContent={(c) => {this.setState({categories: c})}}
                    />
                </Box>
            </Box>
        );
    }
}