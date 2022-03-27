import * as React from 'react';
import {
    List,
    Card,
    Box,
    CardHeader,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircle from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function createList(title, items, fontSize, fontSizeSecondary, backgroundColor, onItemClick, ItemIcon, viewFunc) {
    return (
        <Box 
            sx={{
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
                    backgroundColor: backgroundColor,
                    margin: 0,
                }}
            >
                <CardHeader
                    sx={{ px: 1, py: 1, textAlign: "center" }}
                    title={title}
                    titleTypographyProps={{fontSize: fontSize }}
                    subheader={`${items.length}`}
                    subheaderTypographyProps={{fontSize: fontSizeSecondary }}
                />
                <Divider />
                <List
                    sx={{
                        bgcolor: backgroundColor,
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
                            onClick={onItemClick(value)}
                            sx={{ width: "100%", height: "100%", textAlign: "center", backgroundColor: backgroundColor }}
                            dense
                            disablePadding
                        >
                            <ListItemIcon sx={{ minWidth: 0}} >
                                <IconButton aria-label="delete">
                                    <ItemIcon/>
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${viewFunc ? viewFunc(value) : value}`} primaryTypographyProps={{fontSize: fontSize}} sx={{ pr: 1 }} />
                        </ListItem>
                        );
                    })}
                </List>
            </Card>
        </Box>
    );
}

export class CurrentCategories extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            content: this.props.content,
            ogcontent: this.props.content,
        }
        this.fullHeight = props.fullHeight;
        this.fullWidth = props.fullWidth;
        this.fontSize = props.fontSize;
        this.fontSizeSecondary = props.fontSizeSecondary;
        this.backgroundColor = props.backgroundColor
        this.removeCallback = props.removeCallback
        this.setContent = props.setContent
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.content !== prevProps.content) {
            this.setState({content: this.props.content});
        }
    }

    handleRemove = (value) => () => {
        this.setContent(this.state.content.concat([value]))
    };


    render(){
        return (
            <Box
                className='current-categories'
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    margin: 0,
                    height: this.fullHeight,
                    width: this.fullWidth,
                }}
            >
                {createList(
                    'Gift categories',
                    not(this.state.ogcontent, this.state.content),
                    this.fontSize,
                    this.fontSizeSecondary,
                    this.backgroundColor,
                    this.handleRemove,
                    DeleteIcon
                )}
            </Box>
        );
    };
}

export class AvailableCategories extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            content: this.props.content,
        }
        this.fullHeight = props.fullHeight;
        this.fullWidth = props.fullWidth;
        this.fontSize = props.fontSize;
        this.fontSizeSecondary = props.fontSizeSecondary;
        this.backgroundColor = props.backgroundColor
        this.setContent = props.setContent
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.content !== prevProps.content) {
            this.setState({content: this.props.content});
        }
    }

    handleAdd = (value) => () => {
        this.setContent(not(this.state.content, [value]))
    };

    render(){
        return (
            <Box
                className='available-categories'
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    margin: 0,
                    height: this.fullHeight,
                    width: this.fullWidth,
                }}
            >
                {createList(
                    'Available categories',
                    this.state.content,
                    this.fontSize,
                    this.fontSizeSecondary,
                    this.backgroundColor,
                    this.handleAdd,
                    AddCircle
                )}
            </Box>
        );
    };
}


export class GiftsList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            content: this.props.content,
        }
        this.fullHeight = props.fullHeight;
        this.fullWidth = props.fullWidth;
        this.fontSize = props.fontSize;
        this.fontSizeSecondary = props.fontSizeSecondary;
        this.backgroundColor = props.backgroundColor
        this.viewFunc = props.viewFunc
        this.setContent = props.setContent
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.content !== prevProps.content) {
            this.setState({content: this.props.content});
        }
    }

    handleRemove = (value) => () => {
        this.setContent(not(this.state.content, [value]))
    };

    render(){
        return (
            <Box
                className='giftslist'
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    margin: 0,
                    height: this.fullHeight,
                    width: this.fullWidth,
                }}
            >
                {createList(
                    'Gifts',
                    this.state.content,
                    this.fontSize,
                    this.fontSizeSecondary,
                    this.backgroundColor,
                    this.handleRemove,
                    CardGiftcardIcon,
                    this.viewFunc
                )}
            </Box>
        );
    };
}