import React, { useState } from "react";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { UPDATE_USER } from "../utils/mutations";

function TutorProfile() {
  // return <div>Profile</div>;
  // let navigate = useNavigate();

  const { loading, data } = useQuery(QUERY_ME);
  console.log(data);
  // const [errorMessage, setErrorMessage] = useState("");
  const [formState, setFormState] = useState({
    // username: `${data.me.user.username}`,
    // username: data.me.user.username,
    // password: `${data.me.user.password}`,
    username: ``,
    password: ``,
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // if (!event.target.value.length) {
    //   setErrorMessage(`${event.target.name} is required.`);
    // } else {
    //   setErrorMessage("");
    // }
    console.log(data.me.user);
    console.log(event.target.value);
    if (!event.target.value.length) {
      setFormState({
        // ...formState,
        formState: { ...data.me.user },
      });
      // return { ...data.me.user };
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await updateUser({
        variables: { ...formState },
      });
      // console.log(data);
      Auth.loggedIn(data.updateUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // const user = data?.me ||  {};
  // console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>Viewing {data.me.user.username} profile</h2>
      </div>

      <div>
        <div>
          <p>{data.me.user.username}</p>
          <p>{data.me.user.email}</p>
          <p>{data.me.user.chats}</p>
          {/* <p>{data.me.tutor._id}</p> */}
        </div>
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="username"
            name="username"
            type="username"
            id="username"
            value={formState.username}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
          />
          {/* {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )} */}
          <button className="btn d-block w-100" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default TutorProfile;
