import React from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '@/components/Payments/StripeForm';

const stripePromise = loadStripe('pk_test_51IVR3cK0nK5oXO5V1ddOBtWf9KG2yQug9npzXZSNtSmGZysUVt6NFlr5CZi9HPtB5NSdlBKaR4vMM2ghPEPAqohq00D3UUqYKu');

const Payment = () => {
    return (
        <Container>
            <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>
        </Container>
    );
};

export default Payment;

const Container = styled.div`
    border:1px solid rgba(0,0,0,0.1);
    padding:15px;
`