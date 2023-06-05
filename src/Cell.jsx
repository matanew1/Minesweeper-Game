import React from 'react';
import { Button, Grid, Box } from '@mui/material';

const Cell = ({ value, onClick, win }) => {
    return (
        <Grid item>
            <Button
                variant="contained"
                color={value >= 0 ? 'inherit' : 'info'}
                className="cell"
                disabled={value >= 0 || win}
                style={{ color: 'inherit' }}
                onClick={onClick}
            >
                <Box display="flex" justifyContent="center" alignItems="center" height={50}>
                    <span style={{ fontSize: '1.5rem' }}>
                        {value >= 0 ? (value) : ('💀')}
                    </span>
                </Box>
            </Button>
        </Grid>
    )
};

export default Cell;