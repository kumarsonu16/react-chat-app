import React from 'react';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';

const TextInput = (props) => {
    const {
        name,
        handleChange,
        handleBlur,
        errors, touched,
        label,
        type = "text",
        grid = 12,
        value = "",
        required=false
    } = props;
    return (
        <Grid xs={grid} item>
            <TextField    
                variant="outlined"
                name={name}
                onBlur={handleBlur}
                helperText={touched[name] ? errors[name] : ''}
                error={touched[name] && Boolean(errors[name])}
                label={label}
                value={value}
                onChange={handleChange}
                fullWidth
                type={type}
                required={required}
            />
        </Grid>
    );
};

export default TextInput;
