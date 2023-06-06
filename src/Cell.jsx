import React from 'react';
import { Button, Grid, Box } from '@mui/material';

const cellType = {
    UNKNOWN_CELL: -1,
    BOMB_CELL: -2,
    EXPOSED_BOMB_CELL: -3,
  };

const Cell = ({ value, onClick, win }) => {

    const outputUI = (value) => {
        if(value > 0) {
            return value
        }
        else if (value === 0) {
            return ''
        }
        else if (value === cellType.UNKNOWN_CELL || value === cellType.BOMB_CELL) {
            return '💀'
        }
        else {
            return '💣'
        }
    };
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
                        {outputUI(value)}
                    </span>
                </Box>
            </Button>
        </Grid>
    )
};

export default Cell;