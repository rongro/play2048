import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Board from './Board';

const StyledGame = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #faf8ef;
`;

const GameContainer = styled.div`
    flex-direction: column;
    align-items: center;
`;


const Score = styled.div`
    font-size: 80px;
    font-weight: bold;
    color: #776e65;
    margin-bottom: 10px;
`;

const NewButton = styled.a`
    background: #8f7a66;
    border-radius: 3px;
    padding: 0 20px;
    color: #f9f6f2;
    height: 40px;
    line-height: 42px;
    cursor: pointer;
    display: block;
    text-align: center;
    font-weight: bold;
    width: fit-content;
`;

const INITIAL_BOARD_STATE = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

function getRandomIndex() {
    return Math.round(Math.random() * 3);
}

export default function Game() {
    const [isGameOn, setIsGameOn] = useState(false);
    const [boardState, setBoardState] = useState(INITIAL_BOARD_STATE);
    const handleKeyEvent = (event) => {
        if (!isGameOn) {
            return;
        }
        const { code } = event;
    
        switch (code) {
            case 'ArrowDown':
                handleDown();
                break;
            case 'ArrowUp':
                handleUp();
                break;
            case 'ArrowRight':
                handleRight();
                break;
            case 'ArrowLeft':
                handleLeft();
                break;
            default:
                break;
            }
    }
        
    useEffect(() => {
        document.addEventListener('keyup', event => handleKeyEvent(event), false);
        return () => {
            document.removeEventListener('keyup', event => handleKeyEvent(event), true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameOn, boardState]);

    const initRandomTiles = (number, board = boardState) => {
        let setItems = 0;

        const newBoardState = structuredClone(board);

        while (setItems < number) {
            const rowIndex = getRandomIndex();
            const colIndex = getRandomIndex();

            if (newBoardState[rowIndex][colIndex] === 0) {
                newBoardState[rowIndex][colIndex] = 2;
                setItems++;
            }
        }

        console.log(JSON.stringify(newBoardState));
        setBoardState(newBoardState);        
    };

    const initBoard = () => {
        setIsGameOn(true);
        initRandomTiles(2, INITIAL_BOARD_STATE);
    };

    const handleDown = () => {
        console.log('Down');
        console.log(JSON.stringify(boardState));
    };

    const handleUp = () => {
        console.log('Up');
        console.log(JSON.stringify(boardState));
    };

    const handleLeft = () => {
        const clonedBoardState = structuredClone(boardState);
        console.log(JSON.stringify(boardState));
        setBoardState(clonedBoardState.map(row => handleMoveLeft(row)));
        initRandomTiles(1);
    };

    const handleRight = () => {
        console.log('Right');
        console.log(JSON.stringify(boardState));
    };

    const handleMoveLeft = (row) => {
        let newRow = [0, 0, 0, 0];
        if (row.reduce((acc, currentValue) => acc + currentValue, 0) !== 0) {
            newRow = row.filter(item => item > 0).concat(row.filter(item => item === 0));
            for (let i = 0; i < newRow.length - 1; i++) {
                if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {
                    newRow[i] = newRow[i] * 2;
                    newRow[i + 1] = 0;
                }
            }
            newRow = newRow.filter(item => item > 0).concat(newRow.filter(item => item === 0));
        }
        return newRow;
    }


    return <StyledGame>
        <GameContainer>
            <Score>2048</Score>
            <NewButton onClick={initBoard}>New Game</NewButton>
            <Board boardState={boardState} onChange={setBoardState} />
        </GameContainer>
    </StyledGame>
};
