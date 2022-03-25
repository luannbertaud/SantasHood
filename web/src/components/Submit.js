import { TextField, Grid, InputLabel, MenuItem, Select, OutlinedInput, Button, Checkbox, Slider } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { submit } from '../styles/styles.js'
import { motion } from 'framer-motion';
import { Link, Navigate } from "react-router-dom"

const REACT_APP_SERV_URL = 'http://172.23.0.4:5000/';
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

export default class Submit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            giftUuid: undefined,
            name: undefined,
            description: undefined,
            budget: undefined,
            scope: undefined,
            cluttering: 3,
            shortlived: false,
            categories: [],

            userUuid: undefined,
            age: undefined,
            sexe: '',
            interests: [],
            linkedUuid: [],
        }

        this.onNameChange = this.onNameChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
        this.onBudgetChange = this.onBudgetChange.bind(this);
        this.onScopeChange = this.onScopeChange.bind(this);
        this.onClutteringChange = this.onClutteringChange.bind(this);
        this.onShortlivedChange = this.onShortlivedChange.bind(this);
        this.onCategoriesChange = this.onCategoriesChange.bind(this);

        this.onAgeChange = this.onAgeChange.bind(this);
        this.onSexeChange = this.onSexeChange.bind(this);
        this.onInterestsChange = this.onInterestsChange.bind(this);

        this.onClickSubmit = this.onClickSubmit.bind(this);
    }
    onNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }
    onDescChange(event) {
        this.setState({
            description: event.target.value
        })
    }
    onBudgetChange(event) {
        this.setState({
            budget: event.target.value
        })
    }
    onScopeChange(event) {
        this.setState({
            scope: event.target.value
        })
    }
    onClutteringChange(event) {
        this.setState({
            cluttering: event.target.value
        })
    }
    onShortlivedChange(status) {
        this.setState({
            shortlived: status
        })
    }
    onCategoriesChange(event) {
        this.setState({
            categories: event.target.value
        })
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
        return this.state.name && this.state.description && this.state.budget && this.state.scope && this.state.cluttering && this.state.categories.length !== 0 && this.state.age && this.state.sexe && this.state.interests.length !== 0;
    }

    onClickSubmit() {
        const GiftPostUrl = REACT_APP_SERV_URL + "gifts/newcards"
        const UserPostUrl = REACT_APP_SERV_URL + "users/newcards"

        const giftToSend = {
            cards: [{
                uuid: uuidv4(),
                name: this.state.name,
                description: this.state.description,
                budget: parseInt(this.state.budget, 10),
                scope: this.state.scope,
                cluttering: this.state.cluttering,
                shortlived: this.state.shortlived,
                categories: this.state.categories,
            }]
        }

        const userToSend = {
            cards: [{
                uuid: uuidv4(),
                age: parseInt(this.state.age, 10),
                sexe: this.state.sexe,
                interests: this.state.interests,
                likedgifts: [giftToSend.cards[0].uuid],
            }]
        }
        axios.post(GiftPostUrl, giftToSend)
            .then((response) => {
                console.log(response.data)
            }).catch((err) => {
                console.log(err.response);
            });

        axios.post(UserPostUrl, userToSend)
            .then((response) => {
                console.log(response.data)
                alert('Successfully submitted')
            }).catch((err) => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Nik ta mere fdp</h1>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item md={6}>
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
                    <Grid item md={6}>
                        <form>
                            <TextField
                                required
                                id="outlined-name"
                                label="Name"
                                value={this.state.name}
                                onChange={event => this.onNameChange(event)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                required
                                id="outlined-desc"
                                label="Description"
                                value={this.state.description}
                                onChange={event => this.onDescChange(event)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                required
                                id="outlined-Budget"
                                label="Budget"
                                type='number'
                                value={this.state.budget}
                                onChange={event => this.onBudgetChange(event)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                required
                                id="outlined-scope"
                                label="Theme"
                                value={this.state.scope}
                                onChange={event => this.onScopeChange(event)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <InputLabel id="gender-label" > Taille </InputLabel>
                            <Slider
                                defaultValue={3}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={10}
                                value={this.state.cluttering}
                                onChange={event => this.onClutteringChange(event)}
                                sx={submit.sliderLength}
                            />
                            <InputLabel id="gender-label" > Cadeau Temporaire </InputLabel>
                            <Checkbox
                                size="large"
                                checked={this.state.shortlived}
                                onChange={(event, status) => this.onShortlivedChange(status)}
                            />
                            <InputLabel id="gender-label" > Catégories </InputLabel>
                            <Select labelId="categories-label"
                                id="demo-multiple-categories"
                                multiple
                                value={this.state.categories}
                                onChange={(event) => this.onCategoriesChange(event)}
                                input={< OutlinedInput label="Categories" />}
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
                </Grid>
                <Link to={"/"}>
                    <Button disabled={!this.isValid()} variant="contained" onClick={this.onClickSubmit}>Soumettre votre idée !</Button>
                </Link>
            </motion.div>
        )
    }
}