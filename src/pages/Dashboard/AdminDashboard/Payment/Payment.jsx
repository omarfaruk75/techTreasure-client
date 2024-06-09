
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';


//todo:add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISH_KEY);

const Payment = () => {

    return (
        <div className='w-[80%] mx-auto'>
            <SectionTitle heading={'Payment'} subHeading={'Please Pay for Subscription'} />
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Payment;