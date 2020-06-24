import React from 'react';
import './Board.css';

const cellSize = 20;
const wide = 800;
const high = 600;

class Game extends React.Component {
    constructor(){
        super();
        this.rows = high/cellSize
        this.cols = wide/cellSize
    }
    
    render () {


        return(
            <>
            <div className='Board' style={{
                width: wide,
                height: high,
                backgroundSize: `${cellSize}px ${cellSize}px`
            }}>

            </div>
            </>
        )
    }
}

export default Game