import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Link, List } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

interface ISummaryRow {
  title: string;
  reference: string;
}

interface IProps {
  summaryRows: ISummaryRow[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },

    title: {
      flexGrow: 1
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
    }
    // // modify content when drawer is opened
    // content: {
    //   flexGrow: 1,
    //   padding: theme.spacing(3),
    //   transition: theme.transitions.create("margin", {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen
    //   }),
    //   marginLeft: -drawerWidth
    // }
  })
);
export default function SideDrawer(props: IProps) {
  const classes = useStyles();

  const handleDrawerClose = () => {
    props.setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <List>
          {props.summaryRows.map(summaryRow => (
            <ListItem button key={summaryRow.reference}>
              {/* <ListItemIcon><InboxIcon /></ListItemIcon> */}
              <ListItemText
                primary={
                  <Link href={`/sheets?reference=${summaryRow.reference}`}>
                    {summaryRow.title ? summaryRow.title : "NOPE NOPE"}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
