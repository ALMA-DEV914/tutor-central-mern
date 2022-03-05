import React from 'react'
import { Container, Row, Col, Card, Button, Spinner} from 'react-bootstrap'
import Cart from '../Cart';
export const Pricing = () => {

    return (
       
<Container className='text-center mt-4'>
  <Row>
    <Col className='mb-4 mt-4'><h1>Get tutoring at an affordable price</h1>
</Col>
  </Row>

  <Row style={{margin: '5% auto'}}>
 <Col className='mb-4'>
  <Card>
  <Card.Body>
    <Card.Title className='mt-4 mb-4' style={{color: 'green', fontSize: '35px'}}>2 hours</Card.Title>
    <Card.Subtitle>MONHTLY</Card.Subtitle>
    <Card.Text className='mb-4 mt-4'>
        
     24/7 on-demand help<br></br>
      300+ subjects covered<br></br>
     Highest quality tutors
      
    </Card.Text>
    <Card body>$69/month<br></br>
   58¢/additional minute </Card>
   <Button>{<Cart/>}</Button>
  </Card.Body>
</Card>
</Col>


    <Col><Card>
 
  <Card.Body>
    <Card.Title className='mt-4 mb-4' style={{color: 'green', fontSize: '35px'}}>4 hours</Card.Title>
    <Card.Subtitle>MONHTLY</Card.Subtitle>
    <Card.Text className='mb-4 mt-4'>
      24/7 on-demand help<br></br>
      300+ subjects covered<br></br>
     Highest quality tutors
    </Card.Text>
    <Card body>$119/month<br></br>
58¢/additional minute</Card>
<Button>{<Cart/>}</Button>
  </Card.Body>
</Card></Col>
    <Col><Card >
  <Card.Body>
    <Card.Title className='mt-4 mb-4' style={{color: 'green', fontSize: '35px'}}>6 hours</Card.Title>
    <Card.Subtitle>MONHTLY</Card.Subtitle>
    <Card.Text className='mb-4 mt-4'>
      24/7 on-demand help<br></br>
      300+ subjects covered<br></br>
      Highest quality tutors
    </Card.Text>
    <Card body>$209/month<br></br>
58¢/additional minute</Card>
<Button>{<Cart/>}</Button>
  </Card.Body>
</Card></Col>
    <Col><Card>
  
  <Card.Body>
    <Card.Title className='mt-4 mb-4' style={{color: 'green', fontSize: '35px'}}><Spinner animation="grow" variant="primary" />PAY-AS-YOU-GO</Card.Title>
    <Card.Text className='mb-4 mt-4'>
     24/7 on-demand help<br></br>
     300+ subjects covered<br></br>
      Highest quality tutors
      
    </Card.Text>
    <Card body>$1 per minute of tutoring<br></br>
58¢/additional minute</Card>
<Button>{<Cart/>}</Button>
  </Card.Body>
</Card></Col>
</Row>
<Row><Button variant='success' type='submit' href='/student-signup' style={{width:'50%', margin: '3% auto', padding: '12px'}}>START YOUR FREE TRIAL</Button></Row>
</Container>

    );
}
