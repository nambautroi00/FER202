import React from 'react';
import { useParams } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import AddPaymentForm from '../components/AddPaymentForm';

const EditPaymentPage = () => {
  const { id } = useParams();
  
  return (
    <>
      <NavigationHeader />
      <AddPaymentForm paymentId={id} />
    </>
  );
};

export default EditPaymentPage;

