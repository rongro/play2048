import React from 'react';
import styled, { css } from 'styled-components';

const StyledTile = styled.div`
    width: 106.25px;
    height: 106.25px;
    margin-right: 15px;
    border-radius: 3px;
    margin-bottom: 15px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 55px;
    color: #776e65;
    ${({ value }) => {
        switch (value) {
            case 2:
                return css`
                    background: #eee4da;
                `;
            case 4:
                return css`
                    background: #eee1c9;
                `;
            case 8:
                return css`
                    color: #f9f6f2;
                    background: #f3b27a;
                `;
            case 16:
                return css`
                    color: #f9f6f2;
                    background: #f69664;
                `;
            default:
                return css`
                    background: rgba(238, 228, 218, 0.35);
                `;
        }
    }};
`;

export default function Tile({value}) {
    return <StyledTile value={value}>{value === 0 ? '' : value}</StyledTile>
};
