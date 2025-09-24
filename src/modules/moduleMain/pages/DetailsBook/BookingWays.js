import React from 'react';
import styled from 'styled-components';
import ArrowImage from '../../../../assets/images/left Arrow.png'; // Adjust the path based on your project structure
import { getCurrency } from '../../../../utils/portUtils';
import { useSelector } from 'react-redux';

const Card = styled.div`
  direction: rtl;
  background: #F7F7F7;
  border-radius: 12px;
  padding: 20px 25px;
  width: 50%;
  margin: 0px 20px;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  @media (max-width: 600px) {
    width: 100%;
    margin: 10px 0; // Optional: reduce side margin on small screens
  };
  @media (max-width: 400px) {
    width: 100%;
    margin: 10px 0; // Optional: reduce side margin on small screens
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    font-size: 18px;
  }
  @media (max-width: 400px) {
      font-size: 16px;


  }
`;const Row = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 0;
  font-size: 16px;
`;

const Label = styled.span`
  color: #555;
  font-size:20px;
  @media (max-width: 600px) {
    font-size: 16px;
  }
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const Value = styled.span`
  font-weight: bold;
  color: #222;
  direction: ltr;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
  direction:var(--dir-inverse);
  background-color:#fff;
`;

const Price = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  direction:var(--dir-normal);
    @media (max-width: 600px) {
    font-size: 17px;
  }
`;

const Image = styled.img`
  width: 110px;
  height: 75px;
    @media (max-width: 600px) {
  width: 50px;
  height: 30px;  }
`;
const BookingWays = ({total_price,full_name,email,phone_number}) => {
    const {
    portsObject,
} = useSelector((state) => state.moduleMain.homeSlice);
const currency = getCurrency(portsObject?.portFrom, portsObject?.portTo);

  return (
    <Card>
      <Title> معلومات الاتصال :</Title>

      <Row><Label>الاسم :</Label><Value>{full_name}</Value></Row>
      <Row><Label>الإيميل :</Label><Value>{email}</Value></Row>
      <Row><Label>الرقم :</Label><Value>{phone_number}</Value></Row>

      <Footer>
        <Image src={ArrowImage} alt="Arrow" />
        <Price> السعر الاجمالي :<span style={{ color: "#000" }}> {currency} {total_price}  </span></Price>
      </Footer>
    </Card>
  );
};

export default BookingWays;
