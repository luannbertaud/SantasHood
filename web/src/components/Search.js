import React from 'react';
import { InputLabel, Grid, MenuItem, Select, TextField, Button, OutlinedInput } from '@mui/material';
import axios from 'axios';
import { Link, Navigate } from "react-router-dom"
import Gift from '../components/Gifts';
import { Base64 } from 'js-base64';
import { submit } from '../styles/styles.js'
import { motion } from 'framer-motion';

const REACT_APP_SERV_URL = 'http://172.23.0.3:5000/'
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
            age: undefined,
            sexe: '',
            interests: []
        }
        this.onAgeChange = this.onAgeChange.bind(this);
        this.onSexeChange = this.onSexeChange.bind(this);
        this.onInterestsChange = this.onInterestsChange.bind(this);

        this.onClickSearch = this.onClickSearch.bind(this);
    }

    onAgeChange(event) {
        this.setState({
            age: event.target.value
        })
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
        return this.state.age && this.state.sexe && this.state.interests.length !== 0;
    }

    onClickSearch() {
        const UserGetUrl = REACT_APP_SERV_URL + "gifts/searchfor?usercard="

        const userToGet = {
            cards: {
                age: this.state.age,
                sexe: this.state.sexe,
                interests: this.state.interests,
            }
        }
        const data = Base64.encodeURI(JSON.stringify(userToGet.cards))

        axios.get(UserGetUrl + data)
            .then((response) => {
                console.log(response.data)
            }).catch((err) => {
                console.log(err.response);
            });
    }

    render() {
        console.log('ALO')
        return (
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Grid sx={{ textAlign: 'center' }}>
                    <h1>SEARCH PAGE</h1>
                    <Grid>
                        <form>
                            <TextField
                                required
                                id="outlined-number"
                                label="Age"
                                type="number"
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
                        </form>
                    </Grid>
                    <br></br>
                    <Button disabled={!this.isValid()} variant="contained" onClick={this.onClickSearch}>Chercher</Button>
                </Grid>
            </motion.div>
        )
    }
}