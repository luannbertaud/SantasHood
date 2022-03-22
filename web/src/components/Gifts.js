import React from 'react';
import {Box, Grid } from '@mui/material'

const REACT_APP_SERV_URL = 'http://172.23.0.3:5000/'

export default function Gift({ gift }) {

    const { name, description, budget, scope, cluttering, shortlived, categories} = gift

    return (
        <>
            <div>
                <h1>{name}</h1>
                <h4>{description}</h4>
                <p>{budget}, {scope}, {cluttering}, {shortlived}, {categories}</p>
            </div>
        </>
    )

}