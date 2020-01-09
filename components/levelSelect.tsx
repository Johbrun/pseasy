import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import { Dispatch, SetStateAction } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginLeft: "32px"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

interface IProps {
  levelSelected: number;
  setLevelSelected: Dispatch<SetStateAction<number>>;
}

export default function LevelSelect(props: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Filtre par niveau</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={props.levelSelected}
          onChange={event => props.setLevelSelected(event.target.value as number)}
        >
          <MenuItem value={0}>Aucun filtre</MenuItem>
          <MenuItem value={1}>PSE 1</MenuItem>
          <MenuItem value={2}>PSE 2</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
