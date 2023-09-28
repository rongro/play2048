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
                    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0);
                `;
            case 4:
                return css`
                    background: #eee1c9;
                    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0);
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
            case 32:
                return css`
                    color: #f9f6f2;
                    background: #f77c5f;
                `;
            case 64:
                return css`
                color: #f9f6f2;
                background: #f75f3b;
            `;
            case 128:
                return css`
                    color: #f9f6f2;
                    background: #edd073;
                    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.238095), inset 0 0 0 1px rgba(255, 255, 255, 0.142857);
                    font-size: 45px;
                `;
            case 256:
                return css`
                    color: #f9f6f2;
                    background: #edcc62;
                    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.190476);
                    font-size: 45px;
                `;
            case 512:
                return css`
                    color: #f9f6f2;
                    background: #edc950;
                    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.396825), inset 0 0 0 1px rgba(255, 255, 255, 0.238095);
                    font-size: 45px;
                `;
            case 1024:
                return css`
                    color: #f9f6f2;
                    background: #edc53f;
                    box-shadow: 0 0 30px
                `;
            case 2048:
                return css`
                    color: #f9f6f2;
                    background: #edc22e;
                    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.555556), inset 0 0 0 1px rgba(255, 255, 255, 0.333333);
                    font-size: 35px;
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
