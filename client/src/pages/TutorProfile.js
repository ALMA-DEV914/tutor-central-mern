import React from "react";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
// import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER } from "../utils/mutations";

function TutorProfile() {
  // return <div>Profile</div>;
  // let navigate = useNavigate();
  // const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || data?.user || {};
  console.log(user);

  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   navigate("/tutor-profile");
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>Viewing {user.username} profile.</h2>
      </div>

      <div>
        <div>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      </div>
    </>
  );
}

export default TutorProfile;
