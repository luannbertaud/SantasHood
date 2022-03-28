import {
    TextField,
    Paper,
    Grid,
    Typography,
    FormControlLabel,
    Checkbox,
    Slider,
    Box,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Container
} from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { CurrentCategories, AvailableCategories } from "./Categories";

import "./giftcard.css";

const Item = styled(Paper)(({ theme }) => ({
    padding: "2%",
    textAlign: 'center',
    backgroundColor: "rgba(230, 194, 241, 0.358)",
  }));

function not(a, b) {
return a.filter((value) => b.indexOf(value) === -1);
}

export default class Giftcard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uuid: uuidv4(),
            name: undefined,
            description: undefined,
            budget: 0,
            cluttering: 3,
            scope: "",
            shortlived: false,
            rootcategories: [0, 1, 2, 3, 8, 9, 10, 11, 12, 13],
            avcategories: [],
            categories: [],
        }
        this.state.avcategories = this.state.rootcategories;
        this.generateCardData = this.generateCardData.bind(this);
        this._child = React.createRef();
        this._props = props;
    }


    generateCardData() {
        return({
            uuid: this.state.uuid,
            name: this.state.name,
            description: this.state.description,
            budget: this.state.budget,
            scope: this.state.scope,
            cluttering: this.state.cluttering,
            shortlived: this.state.shortlived,
            categories: this.state.categories,
        });
    }

    render() {
        return (
            <Box
                ref={this._child}
                component={motion.div}
                whileHover={{ scale: 1 }}
                sx={{
                    ...this._props.sx,
                    height:"100%",
                    width:"134%",
                }}
            >
                <Box className='giftcard-outer' >
                    <Card
                        className='giftcard'
                        sx={{
                            borderRadius: "10%",
                        }}
                        elevation={6}
                    >
                        <CardHeader
                            style={{
                                    maxWidth: "40%",
                                    minWidth: 0,
                                    minHeight: 0,
                                
                            }}
                            title={
                                <TextField
                                    InputProps={{
                                        style: {
                                            fontSize: 20,
                                        },
                                    }}
                                    color="secondary"
                                    required
                                    id="name-field"
                                    label="Name"
                                    onBlur={(e) => { this.setState({...this.state, name: e.target.value}) }}
                                />
                            }
                        />
                        <Divider sx={{borderWidth: "1px", width: "100%"}} />
                        <CardContent
                            sx={{
                                padding: 0,
                                overflowY: "auto",
                                "&:last-child": {
                                    paddingBottom: 0
                                }
                            }}
                        >
                            <Grid container spacing={2} sx={{ height: "100%", width: "100%", marginTop: 0, marginLeft: 0, scrollbarColor: "grey transparent", overflow: "auto", paddingBottom: "2%" }} >
                                <Grid item xs={12}>
                                    <TextField
                                        InputProps={{
                                            style: { fontSize: 20 },
                                        }}
                                        sx={{
                                            minWidth: 0,
                                            maxWidth: "90%",
                                            width: "90%",
                                        }}
                                        multiline
                                        rows={3}
                                        required
                                        color="secondary"
                                        id="description-filed"
                                        label="Description"
                                        onBlur={(e) => { this.setState({...this.state, description: e.target.value}) }}
                                    />
                                </Grid>
                                <Grid item xs={7} >
                                    <Grid container spacing={1} >
                                        <Grid item xs={12} >
                                            <Box>
                                                <Typography id="input-slider">
                                                    Budget {this.state.budget}
                                                </Typography>
                                                <Slider
                                                    defaultValue={3}
                                                    step={1}
                                                    min={1}
                                                    max={10}
                                                    value={this.state.budget}
                                                    onChange={(e) => {this.setState({...this.state, budget: e.target.value})}}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box>
                                                <Typography id="input-slider">
                                                    Cluttering {this.state.cluttering}
                                                </Typography>
                                                <Slider
                                                    defaultValue={3}
                                                    step={1}
                                                    min={1}
                                                    max={10}
                                                    value={this.state.cluttering}
                                                    onChange={(e) => {this.setState({...this.state, cluttering: e.target.value})}}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <FormControl sx={{ width:"80%" }}>
                                                <InputLabel id="demo-simple-select-label">Scope *</InputLabel>
                                                <Select
                                                    value={this.state.scope}
                                                    label="Scope *"
                                                    onChange={(e) => {this.setState({...this.state, scope: e.target.value})}}
                                                    sx={{ fontSize: '18px' }}
                                                >
                                                        {["Family", "Personal", "Group"].map((name, i) => (
                                                            <MenuItem
                                                                key={i}
                                                                value={name}
                                                            >
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                            sx={{ fontSize: 28 }}
                                                control={
                                                    <Checkbox
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 28 },
                                                            color: "#146B3A",
                                                            '&.Mui-checked': {
                                                            color: "#146B3A",
                                                            },
                                                        }}
                                                        onChange={(e) => {console.log(e.target.checked); this.setState({...this.state, shortlived: e.target.checked})}}
                                                    />
                                                }
                                                labelPlacement="end"
                                                label={
                                                    <Typography id="input-slider">
                                                        Shortlived
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5} sx={{ paddingRight: "2%" }} >
                                    <CurrentCategories
                                        fullWidth="100%"
                                        fullHeight="100%"
                                        fontSize="15px"
                                        fontSizeSecondary="12px"
                                        backgroundColor="#F8B229"
                                        content={this.state.avcategories}
                                        setContent={(c) => {this.setState({avcategories: c, categories: not(this.state.rootcategories, c)})}}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
                <Box
                    sx={{
                        mt: "6%",
                        maxHeight: "50%",
                        width: "24%",
                        scrollbarColor: "#5b9775 transparent",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        float: "left",
                        borderRadius: "10% / 4%",
                        direction: "rtl",
                        scrollbarWidth: "thin",
                    }}
                >
                    <AvailableCategories
                        fullWidth="100%"
                        fullHeight="100%"
                        fontSize="15px"
                        fontSizeSecondary="12px"
                        backgroundColor="#5b9775"
                        content={this.state.avcategories}
                        setContent={(c) => {this.setState({avcategories: c, categories: not(this.state.rootcategories, c)})}}
                    />
                </Box>
            </Box>
        );
    }
}