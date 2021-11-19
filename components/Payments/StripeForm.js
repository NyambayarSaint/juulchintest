import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Axios from 'axios';
import { Ecommerce } from '../miscs/ContextEcommerceProvider';
import styled from 'styled-components';
import { BiTransfer } from 'react-icons/bi'

const CheckoutForm = () => {

    const [succeeded, setSucceeded] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [processing, setProcessing] = React.useState('');
    const [disabled, setDisabled] = React.useState(true);
    const [clientSecret, setClientSecret] = React.useState('');
    const stripe = useStripe();
    const elements = useElements();

    const { cart } = React.useContext(Ecommerce);

    React.useEffect(() => {
        go();
    }, []);

    const go = async () => {
        let res = await Axios.post(process.env.serverUrl + '/orders/payment', { cart })
        setClientSecret(res.data.client_secret);
    }

    const cardStyle = {
        style: {
            base: {
                color: "black",
                fontSize: "16px",
                "::placeholder": {
                    color: "rgba(0,0,0,0.5)"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    }

    return (
        <Container onSubmit={handleSubmit}>

            {error && <p className="error">{error}</p>}
            <CardElement onChange={handleChange} id="card-element" options={cardStyle} />

            {!disabled && !succeeded && !processing && <button>Finish and pay <BiTransfer /></button>}
            {processing && <p style={{ textAlign: 'center' }}><img style={{width:50}} src="/img/spinner.gif" /></p>}
            {succeeded && <p className="succeeded">Таны худалдан авалт амжилттай боллоо!</p>}

        </Container>

    );
};

export default CheckoutForm;

const Container = styled.form`
    #card-element{
        padding:15px;
        margin-bottom:15px;
        background:rgba(0,0,0,0.05);
    }
    button{
        border:none;
        padding:10px;
        width:100%;
        color:white;
        background-image: linear-gradient(to top right, ${({ theme }) => theme.mainColor}, ${({ theme }) => theme.mainColor2});
        font-weight:500;
        svg{
            margin-top:-1px;
            font-size:20px;
            margin-left:5px;
        }
    }
    .error{
        color:red;
        font-weight:500;
    }
    .succeeded{
        color:green;
    }
`