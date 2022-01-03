/* eslint-disable react/react-in-jsx-scope */
import {
    makeStyles,
    Theme,
    createStyles,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { toDateFormated } from '../lib/helpers/toDateFormated';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            marginLeft: '32px',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 180,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
);

interface IProps {
    dates: number[];
    dateSelected: number;
    setDateSelected: Dispatch<SetStateAction<number>>;
}

export default function DateSelect(props: IProps) {
    const classes = useStyles();

    return (
        <div className={classes.margin}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">
                    Filtre par mise à jour
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={props.dateSelected}
                    onChange={(event) =>
                        props.setDateSelected(event.target.value as number)
                    }
                >
                    <MenuItem key={0} value={0}>
                        Aucun filtre
                    </MenuItem>
                    {props.dates.map((d) => (
                        <MenuItem key={d} value={d}>
                            {toDateFormated(new Date(d))}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
