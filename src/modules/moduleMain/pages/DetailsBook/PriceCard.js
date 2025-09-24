import React from 'react';
import styled from 'styled-components';
import ArrowImage from '../../../../assets/images/left Arrow.png'; // Adjust the path based on your project structure

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
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  direction:var(--dir-normal);
    @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const Image = styled.img`
  width: 110px;
  height: 75px;
    @media (max-width: 600px) {
  width: 50px;
  height: 30px;  }
`;
const PriceCard = ({total_price}) => {
  return (
    <Card>

      <Footer>
        <Image src={ArrowImage} alt="Arrow" />
        <Price> السعر الاجمالي :<span style={{ color: "#000" }}> UER {total_price}  </span></Price>
      </Footer>
    </Card>
  );
};

export default PriceCard;
