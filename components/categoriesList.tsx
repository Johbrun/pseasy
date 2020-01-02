import { makeStyles, Theme, createStyles, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@material-ui/core";
import clsx from "clsx";
import { Category } from "../lib/interfaces/category.interface";
import { SheetLight } from "../lib/interfaces/sheet.interface";
import { refSheetToType } from "../lib/helpers/refSheetToType";
import { getDateFormated } from "../lib/helpers/getDateFormated";
import { sortSheetByProcedure } from "../lib/helpers/sortSheetByProcedure";
import { useRouter } from "next/router";
import SearchInput from "./searchInput";
import { useState } from "react";

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
    table: {
      minWidth: 650,
    },
    r: {
      width: 60,
    },
    titleCategory: {
      fontSize: '30px',
      textTransform: 'uppercase',
      fontWeight: 600,
    },
    container: {
      margin: '10px 20px 30px 20px'
    },
    chip: {
      color: 'white',
      backgroundColor: theme.palette.grey[800],
      height: '25px'
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
    row: {
      cursor: 'pointer'
    }
  })
);

export default function CategoriesList(props: IProps) {
  const classes = useStyles();
  const router = useRouter();
  const [filterSheet, setFilterSheet] = useState<string>('');

  const handleClick = (event: React.MouseEvent<unknown>, reference: string) => {
    router.push(`/sheets?reference=${reference}`);
  }

  interface HeadCell {
    id: keyof (SheetLight & { type: string, category: string });
    label: string;
  }

  const headCells: HeadCell[] = [
    { id: 'reference', label: 'Référence' },
    { id: 'type', label: 'Type ' },
    { id: 'level', label: 'Niveau' },
    { id: 'title', label: 'Titre ' },
    { id: 'version', label: 'Version ' },
    { id: 'updatedDate', label: 'Mise à jour' },
  ];

  return (
    <>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.open
        })}
      >
        <div className={classes.drawerHeader} />

        <SearchInput searchField={filterSheet} setSearchField={setFilterSheet} />

        {props.categories.map(category => {
          const sheetsCategoryFiltered = props.sheetsLight
            .filter(s => s.idCategory === category.id)
            .filter(s => filterSheet ? s.title.toLowerCase().includes(filterSheet.toLowerCase()) : true);

          if (sheetsCategoryFiltered.length === 0) return <></>
          return (
            <div key={'div-' + category.id}>
              <span key={category.id} className={classes.titleCategory}>{category.number} {category.name}</span>

              <TableContainer key={'table-' + category.id} component={Paper} className={classes.container}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {headCells.map(headCell => (
                        <TableCell
                          key={headCell.id}
                          variant='head'
                          className={classes.r}
                        >
                          {headCell.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sheetsCategoryFiltered
                      .sort(sortSheetByProcedure)
                      .map(s => {
                        const type = refSheetToType(s.reference);
                        return (
                          <TableRow key={s.id} onClick={event => handleClick(event, s.reference)} hover className={classes.row}>
                            <TableCell key={s.id} component="th" scope="row">
                              {s.reference}
                            </TableCell>
                            <TableCell>

                              <Chip key={s.id} label={refSheetToType(s.reference)} className={
                                clsx(classes.chip, {
                                  [classes.chipConnaissance]: (type === 'Connaissances'),
                                  [classes.chipProcedure]: (type === 'Procédures'),
                                  [classes.chipTechnique]: (type === 'Techniques'),
                                })} />
                            </TableCell>
                            <TableCell>N/C</TableCell>
                            <TableCell>{s.title}</TableCell>
                            <TableCell>{s.version}</TableCell>
                            <TableCell>{getDateFormated(new Date(s.updatedDate))}</TableCell>
                          </TableRow>
                        )
                      }
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>)
        })}
      </main>
    </>
  );
}
