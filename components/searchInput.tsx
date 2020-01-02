import { makeStyles, Theme, createStyles, Grid, TextField } from "@material-ui/core";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { Dispatch, SetStateAction } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    })
);

interface IProps {
    searchField: string,
    setSearchField: Dispatch<SetStateAction<string>>
}

export default function SearchInput(props: IProps) {
    const classes = useStyles();

    return (
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <SearchRoundedIcon />
                </Grid>
                <Grid item>
                    <TextField id="input-with-icon-grid" label="Rechercher une fiche..." onChange={(event) => props.setSearchField(event.target.value)} />
                </Grid>
            </Grid>
        </div>
    )
}