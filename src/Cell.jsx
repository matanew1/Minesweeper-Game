import React from 'react';
import { Button, Grid, Box } from '@mui/material';

const cellType = {
    UNKNOWN_CELL: 'c',
    BOMB_CELL: 'b',
    REVEALED_CELL: 'r'
};

const Cell = ({ value, onClick }) => {
    return (
        <Grid item>
            <Button
                variant="contained"
                color={value === cellType.REVEALED_CELL || value > 0 ? 'inherit' : 'info'}
                className="cell"
                disabled={value === cellType.REVEALED_CELL || value > 0}
                style={{ color: 'inherit' }}
                onClick={onClick}
            >
                <Box display="flex" justifyContent="center" alignItems="center" height={50}>
                    <span style={{ fontSize: '1.5rem' }}>{
                        value > 0 ? (value) : (value === cellType.REVEALED_CELL ? ('') : ('💀'))}
                    </span>
                </Box>
            </Button>
        </Grid>
    )
};

export default Cell;