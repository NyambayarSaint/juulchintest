import React from 'react';
import styled from 'styled-components';

const elasticPagination = ({ pages, activePage, onClick, color }) => {
    return (
        <Pag color={color}>
            {pages.map(page => {
                const isActivePage = activePage === page
                return (
                    <div
                        key={Math.random()}
                        onClick={() => onClick(page)}
                        active={isActivePage}
                        className={isActivePage ? 'active' : ''}
                    />
                )
            })}
        </Pag>
    )
}

export default elasticPagination;

const Pag = styled.div`
display:flex;
div{
    transition: all 250ms ease 0s;
    border: none;
    margin: 5px;
    font-size: 1.3em;
    content: "";
    height: 15px;
    width: 15px;
    box-shadow: ${({ theme }) => theme.mainColor} 0px 0px 1px 3px;
    border-radius: 50%;
    outline: none;
    ${({ color }) => color === 'black' && `
        box-shadow: black 0px 0px 1px 3px;
        opacity:0.3;
    `};
    &.active{
        box-shadow:rgb(177 149 79) 0px 0px 1px 3px;
        background:white;
        ${({ color }) => color === 'black' && `
            opacity:1;
        `};
    }
}
`