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
import SendIcon from '@mui/icons-material/Send';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
            main: '#F8B229',
        },
        secondary: {
            main: '#146B3A',
        }
    }
  });

const Item = styled(Paper)(({ theme }) => ({
    padding: "2%",
    textAlign: 'center',
    backgroundColor: "rgba(230, 194, 241, 0.358)",
  }));

const Alert = React.forwardRef(function Alert(props, ref) {
    return (
        <MuiAlert
            component={motion.div}
            animate={{ rotate: [0, -10, 95, 180], opacity: [1, 1, 1, 0] }}
            initial={true}
            transition={{ ease: "easeIn", duration: 3, times: [0.72, 0.8, 0.9, 1]}}
            elevation={6}
            ref={ref}
            variant="filled"
            {...props}
        />
    );
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

        this.onClickSubmit = this.onClickSubmit.bind(this);

        this._currentGift = React.createRef();
        this._user = React.createRef();
    }

    onClickSubmit() {
        let userdata = this._user.current.generateCardData();
        console.log(this.state.giftsdata);
        console.log(userdata)
    
        // const GiftPostUrl = REACT_APP_SERV_URL + "gifts/newcards"
        // const UserPostUrl = REACT_APP_SERV_URL + "users/newcards"

        // const giftToSend = {
        //     cards: [{
        //         uuid: uuidv4(),
        //         name: this.state.name,
        //         description: this.state.description,
        //         budget: parseInt(this.state.budget, 10),
        //         scope: this.state.scope,
        //         cluttering: this.state.cluttering,
        //         shortlived: this.state.shortlived,
        //         categories: this.state.categories,
        //     }]
        // }

        // const userToSend = {
        //     cards: [{
        //         uuid: uuidv4(),
        //         age: parseInt(this.state.age, 10),
        //         sexe: this.state.sexe,
        //         interests: this.state.interests,
        //         likedgifts: [giftToSend.cards[0].uuid],
        //     }]
        // }
        // axios.post(GiftPostUrl, giftToSend)
        //     .then((response) => {
        //         console.log(response.data)
        //     }).catch((err) => {
        //         console.log(err.response);
        //     });

        // axios.post(UserPostUrl, userToSend)
        //     .then((response) => {
        //         console.log(response.data)
        //         alert('Successfully submitted')
        //     }).catch((err) => {
        //         console.log(err.response);
        //     });
    }

    render() {
        return (
            <ThemeProvider theme={theme} >
                <Box
                    sx={{ display: "flex", flexDirection: "column", position: "absolute", height: "100vh", width: "100vw"}}
                >
                    <FallingEmojis emoji={'🌲'} />
                    <Box sx={{p: 2, my: 6}}>
                        <Typography fontFamily={"Rubik"} fontSize={34} textAlign={"center"}>
                            What did Santa brings you ? 🎉
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: "5%",
                        }}
                    >
                        <Box
                            component={motion.div}
                            animate={{ rotate: -2 }}
                            whileHover={{ rotate: 0 }}
                            sx={{
                                width: "25vw",
                                height: "25vw",
                                marginRight: "calc(34*25vw/100)",
                                textAlign: "center",
                            }}
                        >
                            <Usercard ref={this._user}/>
                        </Box>
                        <Box
                            component={motion.div}
                            animate={{ x: [400, 0] }}
                            transition={{ type: "inertia", velocity: -400}}
                            sx={{
                                textAlign: "center",
                                marginLeft: "2%",
                            }}
                        >
                            <IconButton
                                component={motion.div}
                                animate={{ x: [80, -80, 80] }}
                                initial={true}
                                transition={{ ease: "easeInOut", duration: 6, repeat: Infinity }}
                                aria-label="addGift"
                                color="primary"
                                onClick={ () => { this.setState({giftdialog: true}) }}
                            >
                                <Typography fontFamily={"Rubik"} fontSize={38} textAlign={"center"} >
                                    🎁 
                                </Typography>
                                <AddCircle fontSize="large"/>
                            </IconButton>
                            <GiftsList
                                fullWidth="15vw"
                                fontSize="28px"
                                fontSizeSecondary="20px"
                                backgroundColor="#c95153"
                                viewFunc={(val) => val.name}
                                content={this.state.giftsdata}
                                setContent={(c) => {this.setState({giftsdata: c})}}
                            />
                            <Box
                                sx={{
                                    textAlign: "end",
                                    "& .MuiSvgIcon-root": {
                                        fontSize: 30,
                                    },
                                }}
                            >
                                <Button
                                    sx={{
                                        marginTop: "80%",
                                        fontSize: 20, 
                                        fontFamily: ["Rubik"]
                                    }}
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    onClick={this.onClickSubmit}
                                >
                                    OK
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Dialog
                        component={motion.div}
                        animate={{ opacity: [0, 1], scale: [0.1, 1] }}
                        transition={{ ease: "backInOut", duration: 0.6 }}
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
                            <Giftcard ref={this._currentGift} />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ float: "right", mb: "1%", mr: "1%" }}>
                        <Button onClick={() => { console.log(this._currentGift.current.generateCardData()); this.setState({...this.state, giftdialog: false, giftsdata: [...this.state.giftsdata, this._currentGift.current.generateCardData()], snackalert: true, snackalertmessage: "Gift registered"}) }}>Validate</Button>
                    </DialogActions>
                    </Dialog>
                    <Snackbar
                        open={this.state.snackalert}
                        autoHideDuration={3000}
                        onClose={() => {return this.state.snackalert ? this.setState({...this.state, snackalert: false}) : null}}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        TransitionComponent={(props) => <Slide {...props} direction="down" /> }
                        sx={{
                            opacity: 0.8,
                            "& .MuiAlert-root": {
                                fontSize: 20,
                                alignItems: "center",
                            },
                            "& .MuiSvgIcon-root": {
                                fontSize: 20,
                            },
                        }}
                        ClickAwayListenerProps={{ onClickAway: () => {} }}
                    >
                        <Alert onClose={() => {return this.state.snackalert ? this.setState({...this.state, snackalert: false}) : null}} severity="success" sx={{ width: '100%' }}>
                            {this.state.snackalertmessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </ThemeProvider>
        );
    }
}