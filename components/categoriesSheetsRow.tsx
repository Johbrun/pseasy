/* eslint-disable react/react-in-jsx-scope */
import {
    makeStyles,
    Theme,
    createStyles,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip
} from '@material-ui/core';
import clsx from 'clsx';
import { Category } from '../lib/interfaces/category.interface';
import { SheetLight } from '../lib/interfaces/sheet.interface';
import { refSheetToType } from '../lib/helpers/refSheetToType';
import { getDateFormated } from '../lib/helpers/getDateFormated';
import { sortSheetByProcedure } from '../lib/helpers/sortSheetByProcedure';
import { useRouter } from 'next/router';

interface IProps {
  category: Category;
  sheetsLight: SheetLight[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '54px'
        },
        table: {},
        r: {
            width: 60
        },
        titleCategory: {
            fontSize: '30px',
            textTransform: 'uppercase',
            fontWeight: 600,
            [theme.breakpoints.down('sm')]: {
                fontSize: '24px'
            }
        },
        container: {
            margin: '10px 20px 30px 20px',
            [theme.breakpoints.down('sm')]: {
                margin: '10px 00px 30px 0px;'
            }
        },
        chip: {
            color: 'white',
            backgroundColor: theme.palette.grey[800],
            height: '25px',
            [theme.breakpoints.down('sm')]: {
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
        row: {
            cursor: 'pointer'
        },
        hideSm: {
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        }
    })
);

interface HeadCell {
  id: keyof (SheetLight & { type: string; category: string });
  label: string;
}

const headCells: HeadCell[] = [
    { id: 'reference', label: 'Référence' },
    { id: 'type', label: 'Type ' },
    { id: 'level', label: 'Niveau' },
    { id: 'title', label: 'Titre ' },
    { id: 'version', label: 'Version ' },
    { id: 'updatedDate', label: 'Mise à jour' }
];

export default function CategoriesSheetsRow(props: IProps) 
{
    const classes = useStyles();
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<unknown>, reference: string) => 
    {
        router.push(`/sheets?reference=${reference}`);
    };

    if (props.sheetsLight.length === 0) return <></>;

    return (
        <div key={'div-' + props.category.id}>
            <span key={props.category.id} className={classes.titleCategory}>
                {props.category.number} {props.category.name}
            </span>

            <TableContainer key={'table-' + props.category.id} component={Paper} className={classes.container}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headCells.map(headCell => (
                                <TableCell
                                    key={headCell.id}
                                    variant="head"
                                    className={clsx(classes.r, {
                                        [classes.hideSm]: ['reference', 'level', 'version'].includes(headCell.id)
                                    })}
                                >
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.sheetsLight.sort(sortSheetByProcedure).map(s => 
                        {
                            const type = refSheetToType(s.reference);
                            return (
                                <TableRow key={s.id} onClick={event => handleClick(event, s.reference)} hover className={classes.row}>
                                    <TableCell key={s.id} component="th" scope="row" className={classes.hideSm}>
                                        {s.reference}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            key={s.id}
                                            label={refSheetToType(s.reference)}
                                            className={clsx(classes.chip, {
                                                [classes.chipConnaissance]: type === 'Connaissances',
                                                [classes.chipProcedure]: type === 'Procédures',
                                                [classes.chipTechnique]: type === 'Techniques'
                                            })}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.hideSm}>PSE {s.level}</TableCell>
                                    <TableCell>{s.title}</TableCell>
                                    <TableCell className={classes.hideSm}>{s.version}</TableCell>
                                    <TableCell>{getDateFormated(new Date(s.updatedDate))}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
