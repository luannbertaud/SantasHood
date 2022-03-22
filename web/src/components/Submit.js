import { TextField } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';

const REACT_APP_SERV_URL = 'http://172.23.0.3:5000/';
const options = ['cado', 'dodo', 'balo', 'nul', 'rien']
const names = ['Homme', 'Femme', 'Autres']

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


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
            cluttering: undefined,
            shortlived: undefined,
            Categories: [],

            userUuid: undefined,
            age: undefined,
            sexe: undefined,
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
    onShortlivedChange(event) {
        this.setState({
            shortlived: event.target.value
        })
    }
    onCategoriesChange(event) {
        this.setState({
            giftCategories: event.target.value
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

    onClickSubmit() {
        console.log('I\'m in!')
        const GiftPostUrl = REACT_APP_SERV_URL + "gifts/newcards"
        const UserPostUrl = REACT_APP_SERV_URL + "users/newcards"

        const giftToSend = {
            cards: [
                {
                    uuid: uuidv4(),
                    name: this.state.name,
                    description: this.state.description,
                    budget: this.state.budget,
                    scope: this.state.scope,
                    cluttering: this.state.cluttering,
                    shortlived: this.state.shortlived,
                    categories: this.state.categories,
                }
            ]
        }

        const userToSend = {
            cards: [
                {
                    uuid: uuidv4(),
                    age: this.state.age,
                    sexe: this.state.sexe,
                    categories: this.state.interests,
                    likedgifts: [this.state.giftUuid],
                }
            ]
        }
        console.log(giftToSend)
        console.log(userToSend)
        axios.post(GiftPostUrl, giftToSend)
            .then((response) => {
                console.log(response.data)
            }).catch((err) => {
                console.log(err.response);
            });

        axios.post(UserPostUrl, userToSend)
            .then((response) => {
                console.log(response.data)
            }).catch((err) => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <>
                <h1>Nik ta mere fdp</h1>
                <div className='row'>
                    <div className='col-lg-6'>
                        <h2>SUBMIT USER FORM</h2>
                        <form onSubmit={event => this.onClickSubmit(event)}>
                            <label>
                                Age:
                                <input
                                    type="number"
                                    name="age"
                                    value={this.state.age}
                                    onChange={event => this.onAgeChange(event)}
                                />
                            </label>
                            <InputLabel id="demo-multiple-name-label">Gender</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={this.state.sexe}
                                onChange={event => this.onSexeChange(event)}
                                input={<OutlinedInput label="Gender" />}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <InputLabel id="demo-multiple-name-label">Categories</InputLabel>
                            <Select
                                labelId="demo-multiple-categories-label"
                                id="demo-multiple-categories"
                                multiple
                                value={this.state.interests}
                                onChange={(event) => this.onInterestsChange(event)}
                                input={<OutlinedInput label="Categories" />}
                                MenuProps={MenuProps}
                            >
                                {options.map((option) => (
                                    <MenuItem
                                        key={option}
                                        value={option}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                            <p>{this.state.age}</p>
                            <p>{this.state.sexe}</p>
                            <p>{this.state.userCategories}</p>
                            <br></br>
                            <br></br>
                            <br></br>
                            <label>Name
                                <input
                                    className="form-control"
                                    autoComplete="off"
                                    value={this.state.name}
                                    onChange={event => this.onNameChange(event)}
                                />
                            </label>
                            <label>description
                                <input
                                    className="form-control"
                                    autoComplete="off"
                                    value={this.state.description}
                                    onChange={event => this.onDescChange(event)}
                                />
                            </label>
                            <label>budget
                                <input
                                    className="form-control"
                                    autoComplete="off"
                                    value={this.state.budget}
                                    onChange={event => this.onBudgetChange(event)}
                                />
                            </label>
                            <label>scope
                                <input
                                    className="form-control"
                                    autoComplete="off"
                                    value={this.state.scope}
                                    onChange={event => this.onScopeChange(event)}
                                />
                            </label>
                            <label>cluttering
                                <input
                                    className="form-control"
                                    autoComplete="off"
                                    value={this.state.cluttering}
                                    onChange={event => this.onClutteringChange(event)}
                                />
                            </label>
                            <label>shortlived
                                <input
                                    className="form-control"
                                    autoComplete="off"
                                    value={this.state.shortlived}
                                    onChange={event => this.onShortlivedChange(event)}
                                />
                            </label>
                            <label>giftCategories
                                <input
                                    className="form-control"
                                    autoComplete="off"
                                    value={this.state.categories}
                                    onChange={event => this.onCategoriesChange(event)}
                                />
                            </label>
                            <p>{this.state.name}</p>
                            <p>{this.state.description}</p>
                            <p>{this.state.budget}</p>
                            <p>{this.state.scope}</p>
                            <p>{this.state.cluttering}</p>
                            <p>{this.state.shortlived}</p>
                            <p>{this.state.categories}</p>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}