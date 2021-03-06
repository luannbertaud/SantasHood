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

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

export default class Usercard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uuid: uuidv4(),
            age: 0,
            sexe: "",
            rootcategories: [0, 1, 2, 3, 8, 9, 10, 11, 12, 13],
            avcategories: [],
            categories: [],
        }
        this.state.avcategories = this.state.rootcategories;
        this.generateCardData = this.generateCardData.bind(this);
        this._child = React.createRef();
        this._props = props;
    }

    generateCardData() {
        return ({
            uuid: this.state.uuid,
            age: this.state.age,
            sexe: this.state.sexe,
            interests: this.state.categories,
        });
    }


    render() {
        return (
            <Box
                ref={this._child}
                sx={{
                    ...this._props.sx,
                    height: "100%",
                    width: "134%",
                }}
            >
                <Box className='giftcard-outer'>
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
                                <div>
                                    <Typography fontFamily={"Rubik"} fontSize={28} textAlign={"center"} sx={{ float: "left" }}>
                                        About You
                                    </Typography>
                                    <div style={{
                                        backgroundColor: "#cccc00",
                                        borderRadius: "50px",
                                        height: "40px",
                                        width: "35px",
                                        float: "right",
                                        marginLeft: "5px",
                                    }}>
                                        ????
                                    </div>
                                </div>
                            }
                        />
                        <Divider sx={{ borderWidth: "1px", width: "100%" }} />
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
                            <Grid container spacing={2} sx={{ height: "100%", width: "100%", marginTop: 0, marginLeft: 0, scrollbarColor: "grey transparent", overflow: "auto", paddingBottom: "2%" }} >
                                <Grid item xs={7} >
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} >
                                            <FormControl sx={{ width: "90%" }}>
                                                <InputLabel id="demo-simple-select-label">Age *</InputLabel>
                                                <Select
                                                    value={this.state.age}
                                                    label="Age *"
                                                    onChange={(e) => { this.setState({ ...this.state, age: parseInt(e.target.value) }) }}
                                                    sx={{ fontSize: '20px' }}
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
                                        <Grid item xs={12} >
                                            <FormControl sx={{ width: "90%" }}>
                                                <InputLabel id="demo-simple-select-label">Sexe *</InputLabel>
                                                <Select
                                                    value={this.state.sexe}
                                                    label="Sexe *"
                                                    onChange={(e) => { this.setState({ ...this.state, sexe: e.target.value }) }}
                                                    sx={{ fontSize: '20px' }}
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
                                        fontSize="20px"
                                        fontSizeSecondary="15px"
                                        backgroundColor="#F8B229"
                                        content={this.state.avcategories}
                                        setContent={(c) => { this.setState({ avcategories: c, categories: not(this.state.rootcategories, c) }) }}
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
                        width: "24%",
                        scrollbarColor: "#5b9775 transparent",
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
                        fontSize="20px"
                        fontSizeSecondary="15px"
                        backgroundColor="#5b9775"
                        content={this.state.avcategories}
                        setContent={(c) => { this.setState({ avcategories: c, categories: not(this.state.rootcategories, c) }) }}
                    />
                </Box>
            </Box>
        );
    }
}