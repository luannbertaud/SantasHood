import * as React from 'react';
import {
    Grid,
    List,
    Card,
    Box,
    CardHeader,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemAvatar,
    Avatar,
    Checkbox,
    Button,
    Divider,
} from '@mui/material';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export class TransferList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: [],
            left: [0, 1, 2, 3, 8, 8, 8, 8, 8, 8],
            right: [4, 5, 6, 7],
        }
        this.fullHeight = props.fullHeight;
        this.fullWidth = props.fullWidth;
        this.fontSize = props.fontSize;
        this.fontSizeSecondary = props.fontSizeSecondary;
        this.handleToggle = this.handleToggle.bind(this);
        this.handleToggleAll = this.handleToggleAll.bind(this);
        this.numberOfChecked = this.numberOfChecked.bind(this);
        this.handleCheckedRight = this.handleCheckedRight.bind(this);
        this.handleCheckedLeft = this.handleCheckedLeft.bind(this);
        this.customList = this.customList.bind(this);
    }

    handleToggle = (value) => () => {
    let currentIndex = this.state.checked.indexOf(value);
    let newChecked = [...this.state.checked];

    if (currentIndex === -1) {
        newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }
    this.setState({...this.state, checked: newChecked});
    };

    numberOfChecked = (items) => intersection(this.state.checked, items).length;

    handleToggleAll = (items) => () => {
    if (this.numberOfChecked(items) === items.length) {
        this.setState({...this.state, checked: not(this.state.checked, items)});
    } else {
        this.setState({...this.state, checked: union(this.state.checked, items)});
    }
    };

    handleCheckedRight = () => {
    this.setState({
        ...this.state,
        right: this.state.right.concat(this.leftChecked),
        left: not(this.state.left, this.leftChecked),
        checked: not(this.state.checked, this.leftChecked),
    });
    };

    handleCheckedLeft = () => {
    this.setState({
        ...this.state,
        left: this.state.left.concat(this.rightChecked),
        right: not(this.state.right, this.rightChecked),
        checked: not(this.state.checked, this.rightChecked),
    });
    };

    customList = (title, items) => (
        <Box 
            sx={{
                overflow: "auto",
                maxHeight: "100%",
                maxWidth: "100%",
                height: "100%",
                width: "100%",
                minWidth: 0,
                minheight: 0,
            }}
        >
            <Card
                sx={{
                    minWidth: 0,
                    minheight: 0,
                    padding: "3%",
                    my: "3%",
                }}
            >
                <CardHeader
                    sx={{ px: 1, py: 1 }}
                    avatar={
                        <Checkbox
                            onClick={this.handleToggleAll(items)}
                            checked={this.numberOfChecked(items) === items.length && items.length !== 0}
                            indeterminate={
                                this.numberOfChecked(items) !== items.length && this.numberOfChecked(items) !== 0
                            }
                            disabled={items.length === 0}
                            inputProps={{
                                'aria-label': 'all items selected',
                            }}
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: this.fontSize },
                                padding: 0,
                            }}
                        />
                    }
                    title={title}
                    titleTypographyProps={{fontSize: this.fontSize }}
                    subheader={`${this.numberOfChecked(items)}/${items.length} selected`}
                    subheaderTypographyProps={{fontSize: this.fontSizeSecondary }}
                />
                <Divider />
                <List
                    sx={{
                        bgcolor: 'background.paper',
                        overflow: 'auto',
                    }}
                    dense
                    component="div"
                    role="list"
                >
                    {items.map((value) => {
                        let labelId = `transfer-list-all-item-${value}-label`;

                        return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={this.handleToggle(value)}
                            sx={{ width: "100%", height: "100%", textAlign: "center" }}
                            dense
                            disablePadding
                        >
                            <ListItemIcon dense alignItemsFlexStart sx={{ minWidth: 0}} >
                                <Checkbox
                                    checked={this.state.checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                    'aria-labelledby': labelId,
                                    }}
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: this.fontSize }
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`List item ${value + 1}`} primaryTypographyProps={{fontSize: this.fontSize}} sx={{ pr: 1 }} />
                        </ListItem>
                        );
                    })}
                </List>
            </Card>
        </Box>
    );

    render(){
        this.leftChecked = intersection(this.state.checked, this.state.left);
        this.rightChecked = intersection(this.state.checked, this.state.right);

        return (
            <Box
                className='transfer-list'
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    margin: 0,
                    // overflow: "visivl",
                    height: this.fullHeight,
                    width: this.fullWidth,
                }}
            >
                <Grid container spacing={0} sx={{ height: "100%", width: "100%", minWidth: 0, justifyContent: "center", alignItems: "center", flexWrap: "nowrap", padding: 0 }}>
                <Grid item xs={5} sx={{ height: "100%", width: "100%", minWidth: 0, display: "flex" }} >{this.customList('Choices', this.state.left)}</Grid>
                <Grid item xs={2} sx={{ height: "100%", width: "100%", minWidth: 0, display: "flex" }} >
                    <Grid container sx={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center", display: "flex", overflowY: "auto", overflowX: "hidden" }}>
                        <Box sx={{ padding: "25%", minWidth: "100%", alignItems: "center", display: "flex", flexDirection: "column" }} >
                            <Button
                                sx={
                                    { my: 0.5, width: "50%", minWidth: "0px", backgroundColor: "rgba(255, 0, 140, 0.3)",
                                        "&.MuiButton-outlined": {
                                            color: "rgba(0, 0, 0, 0.4)",
                                            fontSize: "14px"
                                        }
                                    }
                                }
                                variant="outlined"
                                onClick={this.handleCheckedLeft}
                                disabled={this.rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                            <Button
                                sx={
                                    { my: 0.5, width: "50%", minWidth: "0px", backgroundColor: "rgba(255, 0, 140, 0.3)",
                                        "&.MuiButton-outlined": {
                                            color: "rgba(0, 0, 0, 0.4)",
                                            fontSize: "14px"
                                        }
                                    }
                                }
                                variant="outlined"
                                onClick={this.handleCheckedRight}
                                disabled={this.leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={5} sx={{ height: "100%", width: "100%", minWidth: 0, display: "flex" }} >{this.customList('Chosen', this.state.right)}</Grid>
                </Grid>
            </Box>
        );
    };
}