import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Input, Radio, RadioGroup, TextField, TextFieldProps, Typography } from "@mui/material"
import Paper from "./Custom/Paper"
import { useState } from "react";
import { useGameContext } from "../hooks/useGameContext";
import { difficulty } from "../models/Settings";
import { useNavigate } from "react-router-dom";
import MotionGrid from "./Custom/Grid";

const helperTexts: Record<difficulty, string> = {
    'Beginner': 'Just for fun!',
    'Intermediate': 'For those who want a balanced experience.',
    'Expert': 'For those seeking a real challenge.',
    'Custom': 'Have it your own way!',
}
export const SettingsForm = () => {
    const {audio,gameState:{settings},setDifficulty, init} = useGameContext();
    const [value, setValue] = useState<difficulty>(settings.difficulty);
    const [rows, setRows] = useState<number>(settings.configuration.size.x);
    const [columns, setColumns] = useState<number>(settings.configuration.size.y);
    const [mines, setMines] = useState<number>(settings.configuration.mines);
    
    const navigate = useNavigate();
    
    const validRows = rows >= 1;
    const validColumns = columns >= 1;
    const validMines = mines < rows*columns;
    if(!validRows && !validColumns && ! validMines){
        debugger;
    }
    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(value === 'Custom' && (!validRows || !validColumns || !validMines)){
            return;
        }
        setDifficulty(value, value === 'Custom' ? {size: {x:columns,y:rows,},mines}: undefined);
        init();
        navigate('/play');
    };
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const radioValue = (event.target as HTMLInputElement).value as difficulty;
        setValue(radioValue);
        switch(radioValue){
            case 'Beginner': audio.playBeginner();
            break;
            case 'Intermediate': audio.playIntermediate();
            break;
            case 'Expert': audio.playExpert();
            break;
            case 'Custom': audio.playCustom();
            break;
        }
    };
    const getTextShadowValue = (label:difficulty) => label === value ? '2px 2px 5px #fff' : 'none';
    
    const textFieldProps: TextFieldProps = {
        required: value==='Custom',
        disabled: value!=='Custom',
        type:'number',
        size:'small' ,
    }
    
    return (
        <Paper
            variant="blue"
            sx={{
                minWIdth: 500,
                width:500,
            }}>
            <form onSubmit={handleSubmit}>
                <FormControl sx={{ m: 3 }} variant="outlined">
                    <FormLabel id="demo-error-radios" sx={{color:'#fff'}}>Difficulty</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-error-radios"
                        name="quiz"
                        value={value}
                        onChange={handleRadioChange}
                    >   
                        {Object.keys(helperTexts).map(difficulty => (
                            <FormControlLabel key={difficulty} sx={{textShadow: getTextShadowValue(difficulty as difficulty)}}value={difficulty} control={<Radio />} label={difficulty} />
                        ))}
                    </RadioGroup>
                    <FormHelperText sx={{color:'#fff'}}>{helperTexts[value]}</FormHelperText>
                    <MotionGrid container spacing={4} sx={{height:90}} variants={{enabled:{scale:1},disabled:{scale:0.975}}} animate={(value==='Custom')? 'enabled': 'disabled'}>
                        <Grid item xs={4}>
                    <TextField onChange={(event) => setRows(parseInt(event.target.value))} label="Rows" placeholder={settings.configuration.size.x} defaultValue={settings.configuration.size.x} {...textFieldProps} helperText={validRows || value!=='Custom' ? '' : 'Rows cannot be less than 1'} error={!validRows}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField onChange={(event) => setColumns(parseInt(event.target.value))} label="Columns" placeholder={settings.configuration.size.y} defaultValue={settings.configuration.size.y} {...textFieldProps} helperText={validColumns || value!=='Custom' ? '' : 'Columns cannot be less than 1'} error={!validColumns}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField onChange={(event) => setMines(parseInt(event.target.value))} label="Mines" placeholder={settings.configuration.mines} defaultValue={settings.configuration.mines} {...textFieldProps} helperText={validMines || value!=='Custom' ? '' : 'Mines should be less than Rows * Columns'} error={!validMines}/>
                    </Grid>
                    </MotionGrid>
                    <Grid container justifyContent="center">
                    <Button sx={{ width: 100, mt: 1, mr: 1 }} type="submit" variant="outlined">
                        Save Changes
                    </Button>
                    </Grid>
                </FormControl>
            </form>
        </Paper>

    )
}