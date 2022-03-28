import React from 'react';
import { Box, Grid, Paper, Typography, ButtonBase } from '@mui/material';
import { Link, Navigate } from "react-router-dom"
import Gift from '../components/Gifts';
import { motion } from 'framer-motion';

const REACT_APP_SERV_URL = 'http://172.23.0.4:5000/'

export default class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            giftList: [],
            redirect: undefined,
        }
    }

    componentDidMount() {
        this.loadGifts()
    }

    loadGifts() {
        const urlGet = 'http://172.23.0.4:5000/gifts/newcards'

        // axios.get(urlGet, {
        // }).then((response) => {
        //     console.log(response.data.cards);
        //     this.setState({
        //         ...this.state,
        //         giftList: response.data.cards,
        //     })
        // })
    }

    render() {
        return (
            <>
                <Box sx={{p: 2, my: 6}} component={motion.div} whileHover={{ scale: 1.2, rotate: 9 }} whileTap={{rotate: 180}}>
                    <Typography fontFamily={"Rubik"} fontSize={34} textAlign={"center"}>
                        Santa's Hood 🎅
                    </Typography>
                </Box>
                {this.state.redirect !== undefined ? <Navigate to={this.state.redirect}/> : null}
                <Grid sx={{mt: 4}} container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Grid item xs={3} sx={{ textAlign: 'center' }} onClick={() => this.setState({redirect: 'search'})}>
                        <Paper sx={{ mb: 4, mt: 2, borderRadius: 8}} elevation={3} component={motion.div} whileHover={{scale: 1.05, transition: { duration: 0.3 }}} whileTap={{ scale: 0.9 }}>
                            <ButtonBase sx={{ borderRadius: 8 }} onClick={this.onClickAddAction}>
                                <Box sx={{ width: '100%', p: 3, borderRadius: 8 }}>
                                <Typography fontFamily={"Poppins"} fontWeight={500} fontSize={24}>
                                    Search a gift 🔎
                                </Typography>
                                <Typography sx={{mt: 2}} fontFamily={"Poppins"} fontWeight={300} fontSize={18}>
                                    Search the perfect gift for your friends or family !
                                </Typography>
                                </Box>
                            </ButtonBase>
                        </Paper>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: 'center' }} onClick={() => this.setState({redirect: 'submit'})}>
                        <Paper sx={{ mb: 4, mt: 2, borderRadius: 8 }} elevation={3} component={motion.div} whileHover={{scale: 1.05, transition: { duration: 0.3 }}} whileTap={{ scale: 0.9 }}>
                            <ButtonBase sx={{ borderRadius: 8 }} onClick={this.onClickAddAction}>
                                <Box sx={{ width: '100%', p: 3, borderRadius: 8 }}>
                                <Typography fontFamily={"Poppins"} fontWeight={500} fontSize={24}>
                                    Submit a gift idea 🎁
                                </Typography>
                                <Typography sx={{mt: 2}} fontFamily={"Poppins"} fontWeight={300} fontSize={18}>
                                    Submit a gift idea you already got or something you want !
                                </Typography>
                                </Box>
                            </ButtonBase>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    }
}