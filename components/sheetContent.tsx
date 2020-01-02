import { makeStyles, Theme, createStyles, Chip } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { Sheet } from "../lib/interfaces/sheet.interface";
import { refSheetToType } from "../lib/helpers/refSheetToType";
import { getDateFormated } from "../lib/helpers/getDateFormated";

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
    },
    chip: {
      color: 'white',
      backgroundColor: theme.palette.grey[800],
      height: '25px',
      [theme.breakpoints.down("sm")]: {
        width: '25px',
        color: 'transparent'
      }
    },
    chipConnaissance: {
      backgroundColor: 'blueviolet'
    },
    chipProcedure: {
      backgroundColor: 'royalblue'
    },
    chipTechnique: {
      backgroundColor: 'orange'
    },
    title: {
      marginBottom: '0px'
    },
    metadata: {
      fontStyle: 'italic',
      marginBottom: '10px'
    }
  })
);

export default function SheetContent(props: IProps) {
  const classes = useStyles();
  const type = refSheetToType(props && props.sheet ? props.sheet.reference : '');

  return (
    <>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.open
        })}
      >
        <div className={classes.drawerHeader} />
        <h1 className={classes.title}>{props.sheet ? props.sheet.title : ''}</h1>
        <div className={classes.metadata}>
          Fiche {props.sheet ? props.sheet.reference : ""} ; Version :{" "}
          {props.sheet ? props.sheet.version : ""} ; Mise à jour en {" "}
          {props.sheet ? getDateFormated(new Date(props.sheet.updatedDate)) : ""}
        </div>
        <Chip label={type} className={
          clsx(classes.chip, {
            [classes.chipConnaissance]: (type === 'Connaissances'),
            [classes.chipProcedure]: (type === 'Procédures'),
            [classes.chipTechnique]: (type === 'Techniques'),
          })} />


        <ReactMarkdown source={props.sheet ? props.sheet.content : ""} />
      </main>
    </>
  );
}
