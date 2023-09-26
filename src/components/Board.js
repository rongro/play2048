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

export default function Board({boardState, setBoardState}) {
    return <StyledBoard>{boardState.map((row, rowIndex) => <StyledRow key={rowIndex}>{row.map((tile, tileIndex) => <Tile key ={tileIndex} value={tile} />)}</StyledRow>)}</StyledBoard>
};
