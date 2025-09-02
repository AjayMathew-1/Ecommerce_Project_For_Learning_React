import axios from 'axios';
import { useEffect, useState } from 'react';
import { PaymentSummary } from './PaymentSummary.jsx';
import { CheckOutHeader } from './CheckoutHeader';
import { OrderSummmary } from './OrderSummary';
import './CheckoutHeader.css';
import './CheckoutPage.css';

export function CheckoutPage({ loadCart }) {
  const [cart, setCart] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [loadingCart, setLoadingCart] = useState(true);
  const [loadingDelivery, setLoadingDelivery] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(true);

  // Fetch cart
  const fetchCart = async () => {
    try {
      const response = await axios.get(
        'https://ecommerce-project-for-learning-react.onrender.com/api/cart-items?expand=product'
      );
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoadingCart(false);
    }
  };

  // Fetch delivery options
  const fetchDeliveryOptions = async () => {
    try {
      const response = await axios.get(
        'https://ecommerce-project-for-learning-react.onrender.com/api/delivery-options'
      );
      setDeliveryOptions(response.data);
    } catch (error) {
      console.error('Error fetching delivery options:', error);
    } finally {
      setLoadingDelivery(false);
    }
  };

  // Fetch payment summary
  const fetchPaymentSummary = async () => {
    try {
      const response = await axios.get(
        'https://ecommerce-project-for-learning-react.onrender.com/api/payment-summary'
      );
      setPaymentSummary(response.data);
    } catch (error) {
      console.error('Error fetching payment summary:', error);
    } finally {
      setLoadingPayment(false);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchDeliveryOptions();
    fetchPaymentSummary();
  }, []);

  return (
    <>
      <title>Checkout</title>
      <CheckOutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          {loadingCart || loadingDelivery || loadingPayment ? (
            <div>Loading checkout details...</div>
          ) : (
            <>
              <OrderSummmary
                cart={cart}
                deliveryOptions={deliveryOptions}
                loadCart={fetchCart}
              />
              <PaymentSummary
                paymentSummary={paymentSummary}
                loadCart={fetchCart}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
