import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  direction: rtl;
  background: #F7F7F7;
  border-radius: 12px;
  padding: 20px 25px;
  // max-width: 400px;
  width:50%;
  margin: 0px 20px;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  @media (max-width: 600px) {
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
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 0;
  font-size: 16px;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  color: #555;
  font-size:20px;
  @media (max-width: 600px) {
      font-size: 16px;
  }
  @media (max-width: 600px) {
      font-size: 14px;
  }
`;
const Value = styled.span`
  font-weight: bold;
  color: #222;
`;

const ShipmentDetailsCard = ({
  date,end_date,commodity,containers_details,reference_number,
   weight,commodity_description
}) => {
  return (
    <Card>
      <Title>تفاصيل الشحنة :</Title>
      <Row><Label>الســلعة :</Label> <Value>{commodity}</Value></Row>
      <Row><Label>وصف البضائع :</Label> <Value>{commodity_description}</Value></Row>
      <Row><Label>وزن البضائع :</Label> <Value>{weight}</Value></Row>
      <Row><Label>تفاصيل الحاوية :</Label> <Value>{containers_details}</Value></Row>
      <Row><Label>الرقم المرجعي :</Label> <Value>{reference_number}</Value></Row>
      <Row><Label>المغادرة :</Label> <Value>{end_date}</Value></Row>
      <Row><Label>الوصول  :</Label> <Value>{date}</Value></Row>
    </Card>
  );
};

export default ShipmentDetailsCard;
