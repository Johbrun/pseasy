import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {
    createStyles,
    fade,
    Theme,
    makeStyles
} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Link } from '@material-ui/core';
import clsx from 'clsx';

interface IProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            height:'64px'

        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerButtonShift: {
            display: 'none'
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        hide: {
            display: 'none'
        },
        title: {
            flexGrow: 1,
            marginLeft: '30px',
            fontSize: '25px'
        },
        items : {
            flexGrow: 1,
            justifyContent: 'left',
            display: 'flex',
            fontWeight : 500,
            
        },
        item : {
            fontSize : '17px',
            marginLeft : '30px',
            textTransform: 'uppercase',
            color : 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
                color: 'rgba(255, 255, 255, 1)',
                cursor : 'pointer',
                textDecoration: 'none'
            },
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        },
        mobileMenu: {
            position: 'relative',
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25)
            },

            marginRight: theme.spacing(5),
            [theme.breakpoints.up('sm')]: {
                display: 'none'
            }

            // [theme.breakpoints.up('md')]: {
            //     marginRight: theme.spacing(2),
            //     backgroundColor: fade(theme.palette.common.white, 0.15),
            //     width: 'auto'
            // },
            // [theme.breakpoints.between('xs', 'sm')]: {
            //     width: 'auto',
            //     backgroundColor: fade(theme.palette.common.white, 0)
            //}
        },
        mobileMenuIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        /* version: {
            width: 'auto',
            fontSize : '1rem',
            marginLeft: theme.spacing(1),

            [theme.breakpoints.up('md')]: {
                marginRight: theme.spacing(2),
            },
            [theme.breakpoints.between('xs', 'sm')]: {
                marginRight: theme.spacing(0),
            }
        },*/
        /* search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,

            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25)
            },

            width: '100%',
            marginLeft: theme.spacing(1),

            [theme.breakpoints.up('md')]: {
                marginRight: theme.spacing(2),
                backgroundColor: fade(theme.palette.common.white, 0.15),
                width: 'auto'
            },
            [theme.breakpoints.between('xs', 'sm')]: {
                width: 'auto',
                backgroundColor: fade(theme.palette.common.white, 0)
            }
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },*/
        logo : {
            width : '170px',
            '& img': {
                display: 'block',
                width: '80%'
            }
        },
        extraLeftMargin: {
            marginLeft: '50px',
        },
        /* inputRoot: {
            color: 'inherit'
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200,
                '&:focus': {
                    width: 240
                }
            },
            [theme.breakpoints.between('xs', 'sm')]: {
                width: 0,
                '&:focus': {
                    width: 120
                }
            }
        },*/
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0
        },
        
    })
);
export default function SearchAppBar(props: IProps) 
{
    const classes = useStyles();

    const handleDrawerOpen = () => 
    {
        if (props.setOpen) props.setOpen(true);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: props.open
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, props.open && classes.hide, {
                            [classes.drawerButtonShift]: typeof props.open === 'undefined'
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={clsx(classes.logo, {
                        [classes.extraLeftMargin]: typeof props.open === 'undefined'
                    })}>
                        <img src="logo.png"/>
                    </div>
                    {/* <Typography className={classes.title} variant="h6" noWrap>
                        PSEasy
                    </Typography> */}

                    <div className={classes.items}>
                        <Link className={classes.item}><a>Fiches PSE</a></Link>
                        <Link className={classes.item}><a>Quizz</a></Link>
                        <Link className={classes.item}><a>A propos</a></Link>
                    </div>


                    <div className={classes.mobileMenu}>
                        <div className={classes.mobileMenuIcon}>
                            <MoreVertIcon />
                        </div>
                    </div> 
                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Rechercher..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div> */}
                  
                </Toolbar>
            </AppBar>
        </div>
    );
}
