import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Link, Navigate } from "react-router-dom"
import Gift from '../components/Gifts';
import { motion } from 'framer-motion';

const REACT_APP_SERV_URL = 'http://172.23.0.4:5000/'

export default class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            giftList: [],
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
        console.log('ALO')
        return (
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>HELLO OU QUOII ?</h1>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item md={6}>
                        <Box sx={{ textAlign: 'center' }}>
                            <motion.div sx={{ textAlign: 'center' }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.9 }} onClick={{}}>
                                <Link to={"/submit"}>
                                    <Paper elevation={20} sx={{ height: '100px', width: '200px' }}>
                                        {"Go to Submit !"}
                                    </Paper>
                                </Link>
                            </motion.div>
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Box sx={{ textAlign: 'center' }}>
                            <motion.div sx={{ textAlign: 'center' }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.9 }} onClick={{}}>
                                <Link to={"/search"}>
                                    <Paper elevation={20} sx={{ height: '100px', width: '200px' }}>
                                        {"Go to Search !"}
                                    </Paper>
                                </Link>
                            </motion.div>
                        </Box>
                    </Grid>
                </Grid>

            </motion.div>
        )
    }
}