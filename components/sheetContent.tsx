import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { Sheet } from "../lib/interfaces/sheet.interface";

const drawerWidth = 400;

interface IProps {
  sheet?: Sheet;
  open: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    // modify content when drawer is opened
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
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    }
  })
);

export default function SheetContent(props: IProps) {
  const classes = useStyles();

  return (
    <>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.open
        })}
      >
        <div className={classes.drawerHeader} />
        Référence : {props.sheet ? props.sheet.reference : ""} ; Version :{" "}
        {props.sheet ? props.sheet.version : ""} ; updatedDate :{" "}
        {props.sheet ? props.sheet.updatedDate : ""}
        <ReactMarkdown source={props.sheet ? props.sheet.content : ""} />
      </main>
    </>
  );
}
