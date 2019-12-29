import { makeStyles, Theme, createStyles } from "@material-ui/core";
import clsx from "clsx";
import { Category } from "../lib/interfaces/category.interface";
import { SheetLight } from "../lib/interfaces/sheet.interface";
import { refSheetToType } from "../lib/helpers/refSheetToType";
import Link from "next/link";

const drawerWidth = 400;

interface IProps {
  categories: Category[];
  sheetsLight: SheetLight[];
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

export default function CategoriesList(props: IProps) {
  const classes = useStyles();

  return (
    <>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.open
        })}
      >
        <div className={classes.drawerHeader} />
        {props.categories.map(category => (
          <div>
            <span key={category.id}>{category.name}</span>
            {props.sheetsLight
              .filter(s => s.idCategory === category.id)
              .map(s => (
                <div>
                  <Link href={`/sheets?reference=${s.reference}`}>
                    <span key={s.id}>
                      * {s.title} ({refSheetToType(s.reference)?.toUpperCase()})
                    </span>
                  </Link>
                </div>
              ))}
          </div>
        ))}
      </main>
    </>
  );
}
