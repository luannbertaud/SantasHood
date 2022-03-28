import React from 'react';
import { InputLabel, Grid, MenuItem, Select, TextField, Button, OutlinedInput, Box, Paper, Typography, ButtonBase } from '@mui/material';
import axios from 'axios';
import { Link, Navigate } from "react-router-dom"
import Gift from '../components/Gifts';
import { Base64 } from 'js-base64';
import { submit } from '../styles/styles.js'
import { motion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const REACT_APP_SERV_URL = 'http://172.23.0.4:5000/'
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

export default class Homepage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            age: 0,
            ageError: undefined,
            sexe: '',
            valid: false,
            redirect: undefined,
            interests: []
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
            this.setState({ageError: 'Invalid age ! must be > 0 and < 120'});
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
            }).catch((err) => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <Box sx={{textAlign: 'center'}}>
                {this.state.redirect !== undefined ? <Navigate to={this.state.redirect}/> : null}
                <Box sx={{mx: 2, mt: 2, textAlign: 'start'}} onClick={() => {this.setState({redirect: '/'})}}>
                    <ArrowBackIosIcon />
                </Box>
                <Box sx={{mb: 6, mt: 2}}>
                    <Typography fontFamily={"Poppins"} fontSize={30} fontWeight={500}>
                        Search a gift 🔎
                    </Typography>
                </Box>
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
                    <InputLabel id="gender-label" > Gender </InputLabel>
                    <Select labelId="gender-label"
                        required
                        id="demo-multiple-name"
                        value={this.state.sexe}
                        onChange={event => this.onSexeChange(event)}
                        input={< OutlinedInput label="Gender" />}
                        sx={submit.selectLength}
                        MenuProps={MenuProps}>
                        {
                            names.map((name) => (
                                <MenuItem key={name.name}
                                    value={name.char}>
                                    {name.name} </MenuItem>
                            ))
                        }
                    </Select>
                    <InputLabel id="categories-label" > Centers d'intérets </InputLabel>
                    <Select labelId="categories-label"
                        required
                        id="demo-multiple-categories"
                        multiple
                        value={this.state.interests}
                        onChange={(event) => this.onInterestsChange(event)}
                        input={< OutlinedInput label="interests" />}
                        sx={submit.selectLength}
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
                <br></br>
                <Button disabled={!this.isValid()} variant="contained" onClick={() => this.onClickSearch}>Chercher</Button>
            </Box>
        )
    }
}