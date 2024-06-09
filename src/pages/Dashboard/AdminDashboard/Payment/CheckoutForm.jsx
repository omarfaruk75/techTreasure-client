
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const CheckoutForm = () => {
    const navigate = useNavigate()
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const axiosSecure = useAxiosSecure();
    const mebershipPrice = 200;
    console.log(mebershipPrice);

    useEffect(() => {
        if (mebershipPrice === 200) {
            axiosSecure.post('/create-payment-inten', { price: mebershipPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, mebershipPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log("Payment Method", error);
            setError(error.message)
        } else {
            console.log('Payment Method', paymentMethod);
            setError('')
        }
        //confir payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                }
            }
        })
        if (confirmError) {
            console.log('hello from errorof payment confirem');
        } else {
            console.log('create-payment-inten', paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log('payment confirmed');
                setTransactionId(paymentIntent.id)

            }

            //now save the payment in the database
            const payment = {
                email: user.email,
                price: mebershipPrice,
                transactionId: paymentIntent.id,
                date: new Date(),

                status: 'Verified'
            }
            const res = await axiosSecure.post('/payments', payment);
            if (res.data?.paymentsResult?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank You for Your Payment",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/dashboard/profile');  // Correct navigation to profile
            }
        }
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret} >
                    Paymet submit
                </button>
                <p className="text-red-600">{error}</p>

                {/* {transactionId && <p className="text-green-600"> Your Transaction Id: {transactionId}</p>} */}
            </form>
        </div>
    );
};

export default CheckoutForm;