import { TextField, Paper, Grid, Dialog, IconButton, Snackbar, Slide, DialogActions, DialogTitle, DialogContent, DialogContentText, Typography, FormControlLabel, InputLabel, MenuItem, Select, OutlinedInput, Button, Checkbox, Slider, Box, useControlled } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { submit } from '../styles/styles.js'
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { GiftsList } from "./Categories";
import Giftcard from "./Giftcard";
import Usercard from "./Usercard";
import { FallingEmojis } from 'falling-emojis';

import CloseIcon from '@mui/icons-material/Close';
import AddCircle from '@mui/icons-material/AddCircle';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import "./giftcard.css";
import { Link, Navigate } from "react-router-dom"
import MuiAlert from '@mui/material/Alert';

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

const theme = createTheme({
    palette: {
        primary: {
            main: '#cccc00',
        },
    }
  });

const Item = styled(Paper)(({ theme }) => ({
    padding: "2%",
    textAlign: 'center',
    backgroundColor: "rgba(230, 194, 241, 0.358)",
  }));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
            snackalert: false,
            snackalertmessage: "",
            giftdialog: false,
            giftsdata: [],
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

        this.addGiftData = this.addGiftData.bind(this);
    }

    addGiftData(newgift) {
        this.setState(
            {
                ...this.state,
                giftsdata: [...this.state.giftsdata, newgift]
            }
        );
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
        console.log(this.state.snackalert);
        return (
            <ThemeProvider theme={theme}>
                <FallingEmojis emoji={'🌲'}/>
                <Box sx={{p: 2, my: 6}}>
                    <Typography fontFamily={"Rubik"} fontSize={34} textAlign={"center"}>
                        What did Santa brings you ? 🎉
                    </Typography>
                </Box>
                <Box
                    sx={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Box
                        sx={{
                            width: "20vw",
                            height: "25vw",
                            marginRight: "calc(34*20vw/100)",
                        }}
                    >
                        <Usercard/>
                    </Box>
                    <Box
                        sx={{
                            textAlign: "center",
                            marginLeft: "2%",
                        }}
                    >
                        <IconButton
                            aria-label="addGift"
                            color="primary"
                            onClick={ () => { this.setState({...this.state, giftdialog: true}) }}
                        >
                            🎁 <AddCircle fontSize="medium"/>
                        </IconButton>
                        <GiftsList
                            fullWidth="10vw"
                            fontSize="12px"
                            fontSizeSecondary="10px"
                            backgroundColor="rgb(245, 170, 250)"
                            viewFunc={(val) => val.title}
                            content={this.state.giftsdata}
                            setContent={(c) => {this.setState({giftsdata: c})}}
                        />
                    </Box>
                </Box>
                <Dialog
                    fullWidth={true}
                    maxWidth="xl"
                    scroll="body"
                    open={this.state.giftdialog}
                    onClose={() => { this.setState({...this.state, giftdialog: false}) }}
                    sx={{
                        overflow: "visible",
                        display:"flex",
                        justifyContent: "center",
                        scrollbarColor: "auto transparent",
                        "& .MuiDialog-paper": {
                            display:"inline-block",
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        },
                    }}
                    BackdropProps={{
                        style: { backgroundColor: 'rgba(255, 255, 255, 0.4)' }
                    }}
                >
                <DialogContent
                    sx={{
                        overflow: "visible",
                        display:"flex",
                        alignItems: "center",
                        textALign: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: "70vh",
                            height: "70vh",
                            marginRight: "calc(34*70vh/100)"
                        }}
                    > 
                        <Giftcard/>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ float: "right", mb: "1%", mr: "1%" }}>
                    <Button onClick={() => { this.setState({...this.state, giftdialog: false, giftsdata: [...this.state.giftsdata, {"title": "yessay"}], snackalert: true, snackalertmessage: "Gift registered"}) }}>Validate</Button>
                </DialogActions>
                </Dialog>
                <Snackbar
                    open={this.state.snackalert}
                    autoHideDuration={3000}
                    onClose={() => {return this.state.snackalert ? this.setState({...this.state, snackalert: false}) : null}}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    TransitionComponent={(props) => <Slide {...props} direction="down" /> }
                    sx={{ opacity: 0.8 }}
                    ClickAwayListenerProps={{ onClickAway: false }}
                >
                    <Alert onClose={() => {return this.state.snackalert ? this.setState({...this.state, snackalert: false}) : null}} severity="success" sx={{ width: '100%' }}>
                        {this.state.snackalertmessage}
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        );
    }
}