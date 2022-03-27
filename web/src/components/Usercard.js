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
    Divider,
    Select,
    MenuItem,
    InputLabel,
    FormControl
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

export default class Usercard extends React.Component {
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
            age: "",
            sexe: "",
        }
    }

    render() { 
        return (
            <Box
                component={motion.div}
                whileHover={{ scale: 1 }}
                sx={{
                    height:"100%",
                    width:"178%",
                }}
            >
                <Box className='giftcard-outer-free' sx={{ height: "50%", width: "50%" }}>
                    <Card
                        className='giftcard'
                        sx={{
                            borderRadius: "10%",
                        }}
                        elevation={6}
                    >
                        <CardHeader
                            style={{
                                maxWidth: "50%",
                                minWidth: 0,
                                minHeight: 0,
                            }}
                            title={
                                <Typography fontFamily={"Rubik"} fontSize={26} textAlign={"center"} >
                                    You
                                    {/* <div style={{
                                        backgroundColor: "#cccc00",
                                        borderRadius: "50px",
                                        height: "45px",
                                        width: "35px",
                                        float:"right",
                                        marginLeft: "5px",
                                    }}>
                                        👀
                                    </div> */}
                                </Typography>
                            }
                        />
                        <Divider sx={{borderWidth: "1px", width: "100%"}} />
                        <CardContent
                            sx={{
                                padding: 0,
                                overflowY: "auto",
                                "&:last-child": {
                                    paddingBottom: 0
                                },
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <Grid container spacing={2} sx={{ height: "100%", width: "100%", marginTop: 0, marginLeft: 0, overflow: "auto", paddingBottom: "2%" }} >
                                <Grid item xs={7} >
                                    <Grid container spacing={0} >
                                        <Grid item xs={12} >
                                            <FormControl sx={{width:"90%"}}>
                                                <InputLabel id="demo-simple-select-label">Age *</InputLabel>
                                                <Select
                                                    value={this.state.age}
                                                    label="Age *"
                                                    onChange={(e) => {this.setState({...this.state, age: e.target.value})}}
                                                    >
                                                        {Array.from(Array(120).keys()).map((name) => (
                                                            <MenuItem
                                                                key={name}
                                                                value={name}
                                                            >
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sx={{ marginTop: "15%" }} >
                                            <FormControl sx={{ width:"90%" }}>
                                                <InputLabel id="demo-simple-select-label">Sexe *</InputLabel>
                                                <Select
                                                    value={this.state.sexe}
                                                    label="Sexe *"
                                                    onChange={(e) => {this.setState({...this.state, sexe: e.target.value})}}
                                                >
                                                    <MenuItem key={"F"} value={"F"} >F</MenuItem>
                                                    <MenuItem key={"M"} value={"M"} >M</MenuItem>
                                                    <MenuItem key={"A"} value={"A"} >A</MenuItem>
                                                </Select>
                                            </FormControl>
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
                        mt: "3%",
                        maxHeight: "50%",
                        width: "20%",
                        scrollbarColor: "rgb(235, 160, 240) transparent",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        float: "left",
                        borderRadius: "10% / 4%",
                        direction: "rtl",
                        scrollbarWidth: "thin"
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