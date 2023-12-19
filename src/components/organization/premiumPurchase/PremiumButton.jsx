import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { stripePayment } from '../../../api/OrganizationApi';

export const ProductDisplay = () => {
    const stripePromise = loadStripe('pk_test_51OJqAQSD0QFNYJECgjkoW3U7ZLDkQvDHvitr3RqE5Qd5YNrmSFYlnAK9O05yzfbP562g2jNuBIVTIPBq2Emo8bn5006XRjHrfh');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const stripe = await stripePromise;
        const response = await stripePayment();
        const session = response.data.session;

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error(result.error.message);
        }
    }

    return (
        <section>
            <div className="product flex">
                <form onSubmit={handleSubmit}>
                    <button
                        className='text-lg bg-violet-500 text-white uppercase rounded-3xl lg:px-20 px-10 py-2 mt-10 mb-10'
                    >
                        Proceed to pay
                    </button>
                </form>
            </div>
        </section>
    )
}