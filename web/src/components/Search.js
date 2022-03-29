import React from 'react';
import { InputLabel, Grid, MenuItem, Select, TextField, Button, OutlinedInput, Box, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { Navigate } from "react-router-dom"
import Gift from '../components/Gifts';
import { Base64 } from 'js-base64';
import { motion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const REACT_APP_SERV_URL = 'http://172.23.0.3:5000/'
const options = ['0', '1', '2', '3', '8', '9', '10', '11', '12', '13']
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

export default class Homepage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            age: 0,
            ageError: undefined,
            sexe: '',
            valid: false,
            redirect: undefined,
            interests: [],
            data: [],
        }
        this.onAgeChange = this.onAgeChange.bind(this);
        this.onSexeChange = this.onSexeChange.bind(this);
        this.onInterestsChange = this.onInterestsChange.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
    }

    onAgeChange(event) {
        this.setState({
            age: event.target.value,
            ageError: undefined,
        });

        const value = parseInt(event.target.value, 10);

        if (value <= 0 || value > 120)
            this.setState({ ageError: 'Invalid age ! must be > 0 and < 120' });
    }

    onSexeChange(event) {
        this.setState({
            sexe: event.target.value
        })
    }
    onInterestsChange(event) {
        this.setState({
            interests: event.target.value
        })
    }

    isValid() {
        if (this.state.ageError !== undefined || this.state.sexe === '' || this.state.interests.length === 0)
            return false;
        return true
    }

    onClickSearch() {
        const UserGetUrl = REACT_APP_SERV_URL + "gifts/searchfor?usercard="

        const userToGet = {
            cards: {
                age: parseInt(this.state.age, 10),
                sexe: this.state.sexe,
                interests: this.state.interests,
            }
        }
        let data = Base64.encodeURI(JSON.stringify(userToGet.cards))
        for (let i = 0; i < data.length % 4; i++) {
            data += '='
        }
        axios.get(UserGetUrl + data)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    data: response.data.data
                })
            }).catch((err) => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <Box sx={{ textAlign: 'center' }}>
                {this.state.redirect !== undefined ? <Navigate to={this.state.redirect} /> : null}
                <Box sx={{ mx: 2, mt: 2, textAlign: 'start' }} onClick={() => { this.setState({ redirect: '/' }) }}>
                    <ArrowBackIosIcon />
                </Box>
                <Box sx={{ mb: 3, mt: 2 }}>
                    <Typography fontFamily={"Poppins"} fontSize={30} fontWeight={500}>
                        Search a gift 🔎
                    </Typography>
                </Box>
                <Box sx={{ m: 'auto' }}>
                    <Grid container justifyContent='center'>
                        <Paper sx={{ mb: 4, borderRadius: 8, py: '2%', width: '50%', textAlign: 'center' }} elevation={3} component={motion.div} whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}>
                            <Box>
                                <TextField
                                    required
                                    error={this.state.ageError !== undefined}
                                    id="outlined-number"
                                    label="Age"
                                    type="number"
                                    helperText={this.state.ageError}
                                    value={this.state.age}
                                    onChange={event => this.onAgeChange(event)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <InputLabel id="gender-label" sx={{ marginTop: '1%' }}> Gender </InputLabel>
                                <Select labelId="gender-label"
                                    required
                                    id="gender-label"
                                    value={this.state.sexe}
                                    onChange={event => this.onSexeChange(event)}
                                    input={< OutlinedInput label="Gender" />}
                                    sx={{ width: '25%' }}
                                    MenuProps={MenuProps}>
                                    {
                                        names.map((name) => (
                                            <MenuItem key={name.name}
                                                value={name.char}>
                                                {name.name} </MenuItem>
                                        ))
                                    }
                                </Select>
                                <InputLabel id="categories-label" sx={{ marginTop: '1%' }}> Interests </InputLabel>
                                <Select labelId="categories-label"
                                    required
                                    id="demo-multiple-categories"
                                    multiple
                                    value={this.state.interests}
                                    onChange={(event) => this.onInterestsChange(event)}
                                    input={< OutlinedInput label="interests" />}
                                    sx={{ width: '40%' }}
                                    MenuProps={MenuProps}>
                                    {
                                        options.map((option) => (
                                            <MenuItem key={option}
                                                value={option} >
                                                {option}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Box>
                        </Paper>
                    </Grid>
                </Box>
                <Button disabled={!this.isValid()} variant="contained" onClick={() => this.onClickSearch()}>Search 🔎</Button>
                <Grid container sx={{ mt: '3%' }}>
                    {this.state.data.map((data, i) => {
                        return (
                            <Grid item xs={2} sx={{ justifyItems: 'center' }}>
                                <Gift data={data} key={i} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        )
    }
}