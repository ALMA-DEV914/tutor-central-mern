import React from "react";
import Container from "react-bootstrap/Container";
import background from '../../assets/background.jpg'

const HomeHero = () => {
  return (
    <>
      <Container className="p-4">
        <h1 className='display-2 p-4' style={{fontWeight: '400'}}>
          The <b style={{color: 'WindowText', fontFamily: ''}}>first place</b> to look when you study.
        </h1>
      </Container>
    </>
  );
};

export default HomeHero;
