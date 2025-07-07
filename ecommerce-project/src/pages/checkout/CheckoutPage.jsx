import axios from 'axios';
import {  useEffect, useState } from 'react';
import { PaymentSummary } from './PaymentSummary.jsx';
import { CheckOutHeader } from './CheckoutHeader';
import { OrderSummmary } from './OrderSummary';
import './CheckoutHeader.css';
import './CheckoutPage.css';


export function CheckoutPage({ cart,loadCart }) {

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);


  useEffect(() => {
    const fetchPaymentData = async () => {
       const response = await axios.get('/api/payment-summary')
          setPaymentSummary(response.data);
    };
    fetchPaymentData();
  },[cart]);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);    
        };

        fetchCheckoutData();

    }, []);

  return (
    <>

      <title>Checkout</title>

      <CheckOutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummmary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
 
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}