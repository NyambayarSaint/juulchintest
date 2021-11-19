import React from 'react';
import styled from 'styled-components';

const Steps = ({stage}) => {
    const steps = ['1. Алхам сагслах', '2. Алхам Анкет, хаяг', '3. Алхам Төлбөр тооцоо', '4. Алхам Дуусгах']
    return (
        <Container>
            {steps.map((s,i) => <div key={Math.random()} className={`box ${stage === i && 'active'}`}>{s}</div>)}
        </Container>
    );
};

export default Steps;

const Container = styled.div `
    display: flex;
    gap: 30px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    .box{
        background: #5A5A5A;
        color: white;
        border-radius: 4px;
        height: 50px;
        line-height: 50px;
        /* width: 232px; */
        flex:1;
        text-align:center;
        font-weight: bold;
        opacity:0.6;
        &.active{
            opacity: 1;
        }
    }
`