import React from 'react';
import { Box, Grid } from '@mui/material';
import axios from 'axios';
import { Link, Navigate } from "react-router-dom"
import Gift from '../components/Gifts';

const REACT_APP_SERV_URL = 'http://172.23.0.3:5000/'

export default class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            giftList: [],
        }
    }

    loadGifts() {
        const urlGet = 'http://172.23.0.3:5000/gifts/newcards'

        axios.get(urlGet, {
        }).then((response) => {
            console.log(response.data.cards);
            this.setState({
                ...this.state,
                giftList: response.data.cards,
            })
        })
    }

    render() {
        console.log('ALO')
        this.loadGifts()
        console.log('UOI ?')
        return (
            <>
                <h1>HELLO OU QUOII ?</h1>
                <Grid container colums={{ xs: 4, sm: 8, md: 12 }} style={{ gap: '16px', padding: '25px' }}>
                    {
                        this.state.giftList.map((gifts, id) => {
                            return (
                                <Gift gift={gifts} key={id} />
                            )
                        })
                    }
                </Grid>

            </>
        )
    }
}