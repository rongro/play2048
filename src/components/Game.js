import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Board from './Board';
import { getRandomIndex, replaceRowsToCols, isEqualMatrixes, isMatrixFull } from '../utils/helpers';

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

export default function Game() {
    const [isGameOn, setIsGameOn] = useState(false);
    const [isGameOverMessage, setIsGameOverMessage] = useState('');
    const [boardState, setBoardState] = useState(INITIAL_BOARD_STATE);

    const initRandomTiles = useCallback((number, board = boardState) => {
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

        setBoardState(newBoardState);        
    }, [boardState]);

    const handleMoveLeft = useCallback((row) => {
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
    }, []);

    const handleKeyPress = useCallback(code => {
        let clonedBoardState;
        let newBoardState;
        switch (code) {
            case 'ArrowDown':
                clonedBoardState = replaceRowsToCols(boardState);
                newBoardState = replaceRowsToCols(clonedBoardState.map(row => handleMoveLeft(row.reverse()).reverse()));;
                break;
            case 'ArrowUp':
                clonedBoardState = replaceRowsToCols(boardState);
                newBoardState = replaceRowsToCols(clonedBoardState.map(row => handleMoveLeft(row)));;
                break;
            case 'ArrowRight':
                clonedBoardState = structuredClone(boardState);
                newBoardState = clonedBoardState.map(row => handleMoveLeft(row.reverse()).reverse());
                break;
            case 'ArrowLeft':
            default:
                clonedBoardState = structuredClone(boardState);
                newBoardState = clonedBoardState.map(row => handleMoveLeft(row));
                break;
        }

        if (isEqualMatrixes(boardState, newBoardState)) {
            return null;
        }

        initRandomTiles(1, newBoardState);
    }, [boardState, handleMoveLeft, initRandomTiles]);

    const handleKeyEvent = useCallback((event) => {
        // console.log(`boardState is:\n${boardState[0]}\n${boardState[1]}\n${boardState[2]}\n${boardState[3]}\n`);
        if (!isGameOn) {
            return;
        }
        const { code } = event;

        handleKeyPress(code);
    
    },[handleKeyPress, isGameOn]);
        
    useEffect(() => {
        if (isGameOn) {
            window.addEventListener('keyup', handleKeyEvent, false);
            return () => {
                window.removeEventListener('keyup', handleKeyEvent, false);
            }
        }
    }, [isGameOn, handleKeyEvent]);

    useEffect(() => {
        boardState.forEach(row => {
            row.forEach(tile => {
                if (tile === 2048) {
                    setIsGameOverMessage('You Won! :-)');
                    setIsGameOn(false);
                    return null;
                }
            })
        });

        if (isMatrixFull(boardState)) {
            const clonedBoardState = structuredClone(boardState);
            if (isEqualMatrixes(clonedBoardState.map(row => handleMoveLeft(row)), boardState) && 
                isEqualMatrixes(clonedBoardState.map(row => [...handleMoveLeft([...row].reverse())].reverse()), boardState) &&
                isEqualMatrixes(replaceRowsToCols(replaceRowsToCols(clonedBoardState).map(row => handleMoveLeft(row))), boardState) &&
                isEqualMatrixes(replaceRowsToCols(replaceRowsToCols(clonedBoardState).map(row => [...handleMoveLeft([...row].reverse())].reverse())), boardState)) {
                    setIsGameOverMessage('Game Over! :-(');
                    setIsGameOn(false);
                }
        }
    }, [boardState, handleMoveLeft]);

    const initBoard = () => {
        setIsGameOn(true);
        setIsGameOverMessage('');
        initRandomTiles(2, INITIAL_BOARD_STATE);
    };

    return <StyledGame>
        <GameContainer>
            <Score>2048</Score>
            <NewButton onClick={initBoard}>New Game</NewButton>
            <Board boardState={boardState} isGameOverMessage={isGameOverMessage} />
        </GameContainer>
    </StyledGame>
};
