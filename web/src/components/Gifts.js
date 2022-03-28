import React from 'react';

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