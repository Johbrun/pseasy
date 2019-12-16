import React from "react";
import { NextPage } from "next";
import axios from "axios";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Head from "next/head";
import Nav from "../../components/nav/nav";
import Link from "next/link";
import { SheetGetDTO } from "../../../dtos/src/";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

interface ISummaryRow {
  title: string;
  reference: string;
}

interface IProps {
  sheet?: SheetGetDTO;
  summaryRows: ISummaryRow[];
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  })
);

const SheetPage: NextPage<IProps> = ({ sheet, summaryRows }) => {
  const router = useRouter();
  console.log(router.query.reference);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>PSEasy</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {sheet.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {summaryRows.map(summaryRow => (
            <ListItem button key={summaryRow.reference}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Link href={`/sheets?reference=${summaryRow.reference}`}>
                    <a>{summaryRow.title}</a>
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          {sheet && sheet.content ? (
            <ReactMarkdown source={sheet.content} />
          ) : (
            "No content for this moment"
          )}
        </Typography>
      </main>
    </div>
  );
};

SheetPage.getInitialProps = async ({ query }) => {
  console.log(query);
  const res = await axios.request({
    url: "http://localhost:3001/sheets?fields[]=title&fields[]=reference"
  });

  const res2 = await axios.request({
    url: `http://localhost:3001/sheets?reference=${query.reference}`
  });

  let summaryRows = res.data as ISummaryRow[];
  console.log(`Show data fetched. Count: ${summaryRows.length}`);

  return {
    sheet: res2.data[0],
    summaryRows
  };
};

export default SheetPage;
