import React, {useState} from "react";
import { Container } from "react-bootstrap";
import { QUERY_TUTORS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import HomeHero from "../Homehero";

const TutorSlide = (props) => {
  const [query] = useState("");
 
  const { loading, data} = useQuery(QUERY_TUTORS);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container className="p-4">
        <h1 className='display-2 p-4' style={{fontWeight: '400'}}>
         Get <b style={{color: 'WindowText', fontFamily: ''}}>1.1 Live</b> Help online from our Top Tutors.
        </h1>

        
        {data.tutors
        // eslint-disable-next-line array-callback-return
        .filter((tutor) => {
          if (query === '') {
            return tutor;
          } else if (
            tutor.userId.email.toLowerCase().includes(query.toLowerCase()) ||
            tutor.userId.username.toLowerCase().includes(query.toLowerCase())
          ) {
            return tutor;
          }
        })
        .map((tutor, index) => {
          return (
            <Container key={index} sm={6}>
      
              <HomeHero tutor={tutor}></HomeHero>
  
              </Container>
          );
        })}
       
      </Container>
    </>
  );
};

export default TutorSlide;
