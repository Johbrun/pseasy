import { makeStyles, Theme, createStyles } from "@material-ui/core";
import clsx from "clsx";
import { Category } from "../lib/interfaces/category.interface";
import { SheetLight } from "../lib/interfaces/sheet.interface";
import SearchInput from "./searchInput";
import { useState } from "react";
import CategoriesSheetsRow from "./categoriesSheetsRow";

const drawerWidth = 400;

interface IProps {
  categories: Category[];
  sheetsLight: SheetLight[];
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      fontFamily: "Roboto",
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
  })
);

export default function CategoriesSheetsList(props: IProps) {
  const classes = useStyles();
  const [filterSheet, setFilterSheet] = useState<string>('');

  return (
    <>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.open
        })}
      >
        <div className={classes.drawerHeader} />

        <SearchInput searchField={filterSheet} setSearchField={setFilterSheet} />

        {props.categories.map(category => (
          <CategoriesSheetsRow category={category} sheetsLight={props.sheetsLight
            .filter(s => s.idCategory === category.id)
            .filter(s => filterSheet ? s.title.toLowerCase().includes(filterSheet.toLowerCase()) : true)
          } />
        ))}
      </main>
    </>
  );
}
