import { TextField, Paper, Grid, Typography, FormControlLabel, InputLabel, MenuItem, Select, OutlinedInput, Button, Checkbox, Slider, Box } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { submit } from '../styles/styles.js'
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { CurrentCategories, AvailableCategories } from "./Categories";

import "./giftcard.css";

const REACT_APP_SERV_URL = 'http://172.23.0.3:5000/';
const options = ['cado', 'dodo', 'balo', 'nul', 'rien']
const names = [{ name: 'Homme', char: 'M' }, { name: 'Femme', char: 'F' }, { name: 'Autres', char: 'A' }]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
            categories: [0, 1, 2, 3, 8],
        }
    }

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <CurrentCategories
                            fullWidth="110%"
                            fullHeight="100%"
                            fontSize="12px"
                            fontSizeSecondary="8px"
                            content={this.state.categories}
                            setContent={(c) => {this.setState({categories: c})}}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <AvailableCategories
                            fullWidth="110%"
                            fullHeight="100%"
                            fontSize="12px"
                            fontSizeSecondary="8px"
                            content={this.state.categories}
                            setContent={(c) => {this.setState({categories: c})}}
                        />
                    </Item>
                </Grid>
            </Grid>
        );
    };

    rendera() { return (
            <motion.div 
                className='giftcard-outer'
                whileHover={{ scale: 1.1 }}
            >
                <motion.div
                    className='giftcard'
                >
                    <Box sx={{ margin: "8%", height: "84%", width: "84%" }}>
                        <Grid container spacing={2} sx={{ height: "100%", width: "100%", marginTop: 0, marginLeft: 0, overflow: "auto" }} >
                            <Grid item xs={5}>
                                <TextField
                                    InputProps={{
                                        style: {fontSize: 20},
                                    }}
                                    color="secondary"
                                    fullWidth
                                    required
                                    id="name-field"
                                    label="Name"
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    InputProps={{
                                        style: {fontSize: 20},
                                    }}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    required
                                    color="secondary"
                                    id="description-filed"
                                    label="Description"
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <Box>
                                    <Typography id="input-slider">
                                        Budget {this.state.cluttering}
                                    </Typography>
                                    <Slider
                                        fullWidth
                                        defaultValue={3}
                                        step={1}
                                        min={1}
                                        max={10}
                                        value={this.state.cluttering}
                                        onChange={event => this.onClutteringChange(event)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Box>
                                    <Typography id="input-slider">
                                        Cluttering {this.state.cluttering}
                                    </Typography>
                                    <Slider
                                        fullWidth
                                        defaultValue={3}
                                        step={1}
                                        min={1}
                                        max={10}
                                        value={this.state.cluttering}
                                        onChange={event => this.onClutteringChange(event)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
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
                            <Grid item xs={7} 
                                sx={{ display: "flex" }}
                            >
                                <Box
                                    sx={{ padding: 2, height: "100%", width: "100%",}}
                                >
                                    {/* <TransferList
                                        fullWidth="100%"
                                        fullHeight="100%"
                                        fontSize="12px"
                                        fontSizeSecondary="8px"
                                    /> */}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </motion.div>
            </motion.div>
    )}
}