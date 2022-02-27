import React from "react";
import Tutor from "../Tutor";
import { Row, Col } from "react-bootstrap";
import { QUERY_TUTORS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import SearchBar from "../SearchBar";

// const filterTutors = (tutors, query) => {
//   if (!query) {
//     return tutors;
//   }

//   return tutors.filter((tutor) => {
//     const tutorName = tutor.name.toLowerCase();
//     return tutorName.includes(query);
//   });
// };

const TutorDisplay = (params) => {
  // const [data, setData] = useState([
  //   { name: "Tom", email: "tbellenger@gmail.com", id: "709283745987045" },
  //   { name: "Tarek", email: "tarek@gmail.com", id: "709283745987045" },
  //   { name: "Alma", email: "alma@gmail.com", id: "709283745987045" },
  // ]);

  //setData(params);

  const [query, setQuery] = useState("");

  const { loading, data } = useQuery(QUERY_TUTORS);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row>

      {/* <SearchBar onChange={(event) => setQuery(event.target.value)}></SearchBar> */}
      <input
        placeholder="Enter search term"
        onChange={(event) => setQuery(event.target.value)}
      />
      {tutors
        .filter((tutors) => {
          console.log(tutors);
          if (query === "") {
            return tutors;
          } else if (
            tutors.email.toLowerCase().includes(query.toLowerCase()) ||
            tutors.username.toLowerCase().includes(query.toLowerCase())
          ) {
            return tutors;
          }
        })
        .map((tutor, index) => {
          return (
            <Col key={index} sm={4}>
              <Tutor data={tutor}></Tutor>
              <p>{tutor.username}</p>
            </Col>
          );
        })}
      {/* <SearchBar query={query} setQuery={setQuery} /> */}
      {/* {tutors
        .filter((tutors) => {
          if (query === "") {
            return tutors;
          } else if (tutors.toLowerCase().includes(query.toLowerCase())) {
            return tutors;
          }
        })
        .map((tutor, index) => (
          <div className="box" key={index}>
            <p>{tutor.username}</p>
          </div>
        ))} */}
      {/* <ul>
        {filteredTutors.map((tutor) => (
          <li key={tutor._id}>
            {" "}
            <Tutor data={tutor}></Tutor>
          </li>
        ))}
      </ul> */}
    </Row>
  );
};

export default TutorDisplay;
