import React, { useState, useReducer} from "react";
import Auth from "../utils/auth";
import { USER_UPDATE_PASSWORD,  SINGLE_FILE_UPLOAD } from "../utils/mutations";
import { QUERY_STUDENT } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
//import { useParams } from "react-router-dom";
import { Container, Col,Row } from "react-bootstrap";

const Profile = (params) => {
    const { loading, data } = useQuery(QUERY_STUDENT);
    console.log(data);
    const user = Auth.getProfile();

    //graphql mutation to update password
    const [updatePassword] = useMutation(USER_UPDATE_PASSWORD);
    const [fileUpload] = useMutation(SINGLE_FILE_UPLOAD);
    //local component state
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [isDisabled] = useState(false);
    // eslint-disable-next-line
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    //update state for password update field inputs
    const handleOldPasswordInputChange = (event) => {
        const { value } = event.target;
        setOldPassword(value);
    };
    const handleNewPasswordInputChange = (event) => {
        const { value } = event.target;
        setNewPassword(value);
    };
    const handleRepeatNewPasswordInputChange = (event) => {
        const { value } = event.target;
        setRepeatNewPassword(value);
    };

    //on update password submit
    const handleSubmit = async (event) => {
        //prevent server reload of page on click
        event.preventDefault();
        //check that client field validation is good
        if (loading) {
            return <div>Loading...</div>;
          }
    
            try {
                //update password via graphql
                const { data } = await updatePassword && fileUpload({
                    variables: {
                        email: user.email,
                        photo: user.photo,
                        oldPassword,
                        newPassword,
                    },
                });
                //give user feedback of action
                if (data) {
                        return ("Success",
                            "Your password has been updated successfully."
                        )
            
                } else {
                    return (
                            "Error",
                            "There was a problem updating your password."
                        )
                }
                
            } catch (err) {
                return ("Error", err.message);
            }
            //force update state to show validation messages to user
        
    } 
    const [selectedImage, setSelectedImage] = useState(null);
                      
    
return (
        
        <Container className="col-xs-12 col-md-12">
            <Row>
            <h1>Welcome to Your Dashboard</h1>
        <Col className="col-xs-6 col-md-4">
          <div className="justify-content-center">
            {selectedImage && (
                <div>
                    <img  alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
            )}
            <br />

            <br />
            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                } }
            >
            </input>
            </div>
            </Col>
            <Col className=" col-xs-8 col-md-8" style={{marginTop: "5%"}}>
                <h5 className="mb-2 fs-20 font-weight-normal">
                    General Information
                </h5>
                <form>
                    <div className="form-row">
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="firstName">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    aria-describedby="username"
                                    placeholder={user.username}
                                    disabled />
                            </div>
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="secondName">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    aria-describedby="email"
                                    placeholder={user.email}
                                    disabled />
                            </div>
                        </div>
                    </div>

                    <hr className="mt-2 mb-2" />
                    <div className="col-lg-6 col-xs-12">
                        <h5 className="mb-2 fs-20 font-weight-normal">
                            Update Password
                        </h5>
                        <div className="form-group">
                            <label htmlFor="userMail">
                                Existing Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                aria-describedby="userMail"
                                placeholder="********"
                                onChange={handleOldPasswordInputChange}
                                value={oldPassword}
                                disabled={isDisabled}
                                required />

                            <label htmlFor="userMail">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                aria-describedby="userMail"
                                placeholder="********"
                                onChange={handleNewPasswordInputChange}
                                value={newPassword}
                                disabled={isDisabled}
                                required />
                            <label htmlFor="userMail">
                                Repeat Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                aria-describedby="userMail"
                                placeholder="********"
                                onChange={handleRepeatNewPasswordInputChange}
                                value={repeatNewPassword}
                                disabled={isDisabled}
                                required />

                        </div>
                    </div>
                    <div className="form-row mt-1 align-items-center">
                        <div className="col-lg-3 col-xs-12">
                            <button
                                className="btn btn-secondary col-lg-12 col-xs-12"
                                onClick={handleSubmit}
                                disabled={isDisabled}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            
            </Col>
         </Row>
       </Container>
    
    );
};
    
export default Profile;
