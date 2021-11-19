import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { FiChevronRight } from 'react-icons/fi'

const Path = ({ data }) => {
    return (
        <Container>
            {data.map(el =>
                el.path ? <Link key={Math.random()} href={el.path ? el.path : ''}>
                    <a>{el.title} <FiChevronRight /></a>
                </Link> : <a key={Math.random()}>{el.title} <FiChevronRight /></a>
            )}

        </Container>
    );
};

export default Path;

const Container = styled.div`
    a{
        color:${({ theme }) => theme.blue};
        font-weight:500;
        font-size:${({ theme }) => theme.fontSizeSmall};
        text-decoration:underline;
        svg{
            margin-top:-2px;
        }
        &:last-child{
            color:black;
            text-decoration:none;
            svg{
                display:none;
            }
        }
    }
`