import React from 'react';
import styled from 'styled-components';
import Tile from './Tile';

const StyledBoard = styled.div`
    margin-top: 40px;
    position: relative;
    padding: 15px;
    gap: 15px ;
    cursor: default;
    background: #bbada0;
    border-radius: 6px;
    width: 470px;
    height: 470px;
`;

const StyledRow = styled.div`
    display: flex;
    position: relative;
`;

const GameOverContainer = styled.div`
    width: 500px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(238, 228, 218, 0.73);
    position: absolute;
    top: 0;
    left: 0;
    font-size: 60px;
    font-weight: bold;
    color: #776e65;
`;

export default function Board({boardState, isGameOverMessage}) {
    return (<StyledBoard>
                {boardState.map((row, rowIndex) => <StyledRow key={rowIndex}>{row.map((tile, tileIndex) => <Tile key ={tileIndex} value={tile} />)}</StyledRow>)}
                {isGameOverMessage && <GameOverContainer>{isGameOverMessage}</GameOverContainer>}
            </StyledBoard>);
};
