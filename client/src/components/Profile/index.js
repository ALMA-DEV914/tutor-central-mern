import { useState, useContext,useReducer } from "react";
import { USER_UPDATE_PASSWORD } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Container, Row, Form, Button} from "react-bootstrap";

const Profile = () => {
    const state = useContext();
    const user = useState((state) => state.loggedInUser);

    //local component state
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [validatorPassword] = useState(true);

    const [ forceUpdate] = useReducer((x) => x + 1, 0);
    //graphql mutation to update password
    const [updatePassword] = useMutation(USER_UPDATE_PASSWORD);

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
        if (validatorPassword.allValid()) {
            try {
                //update password via graphql
                const { data } = await updatePassword({
                    variables: {
                        email: user.email,
                        oldPassword,
                        newPassword,
                    },
                });
                //give user feedback of action
                if (data) {
                    state(
                        useContext.updateAndShowModal(
                            "Success",
                            "Your password has been updated successfully."
                        )
                    );
                } else {
                    state(
                        useContext.updateAndShowModal(
                            "Error",
                            "There was a problem updating your password."
                        )
                    );
                }
                //disable update button to prevent spamming
                setIsDisabled(true);
                setOldPassword("");
                setNewPassword("");
                setRepeatNewPassword("");
            } catch (err) {
                state(useContext.updateAndShowModal("Error", err.message));
            }
        } else {
            //show issues with validation
            validatorPassword.showMessages();
            //force update state to show validation messages to user
            forceUpdate();
        }
    };

    return (
        <>
        <Container>
            <Row>
               <h5 className="mb-2 fs-20 font-weight-normal">
                Student Dashbaord
            </h5>
            </Row>
            <Row>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                  <Form.Control  
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="username"
                    placeholder={user.username}
                    disabled
                    /></Form.Group>.
               <Form.Group className="mb-3" controlId="formBasicEmail">           
                   <Form.Label> Email Address</Form.Label>
                       <Form.Control             
                           type="email"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="email"
                                        placeholder={user.email}
                                        disabled
                                    />
                     </Form.Group> 

                     <Form.Group className="mb-3" controlId="formBasicCheck">   
                        <Form.Label>Is Verfied</Form.Label>
                        <Form.Control
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheckDisabled"
                            checked={user.isVerified}
                            disabled
                        />
                       </Form.Group>             
                               
                        <h5 className="mb-2 fs-20 font-weight-normal">
                                    Update Password
                        </h5>
                        <Form.Group className="mb-3" controlId="formBasicEmail">   
                            <Form.Label>Existing Password</Form.Label>
                                <Form.Control        
                                        type="password"
                                        className="form-control"
                                        aria-describedby="userMail"
                                        placeholder="********"
                                        onChange={handleOldPasswordInputChange}
                                        value={oldPassword}
                                        disabled={isDisabled}
                                        required
                                    />
                                    {validatorPassword.message(
                                        "password",
                                        oldPassword,
                                        "required|min:5"
                                    )}
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
                                        required
                                    />
                                    {validatorPassword.message(
                                        "password",
                                        newPassword,
                                        `required|in:${repeatNewPassword}|min:5`,
                                        {
                                            messages: {
                                                in: "Passwords need to match.",
                                            },
                                        }
                                    )}
                                    <label htmlFor="userMail">
                                        Repeat Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        aria-describedby="userMail"
                                        placeholder="********"
                                        onChange={
                                            handleRepeatNewPasswordInputChange
                                        }
                                        value={repeatNewPassword}
                                        disabled={isDisabled}
                                        required
                                    />
                                    {validatorPassword.message(
                                        "password",
                                        repeatNewPassword,
                                        `required|in:${newPassword}|min:5`,
                                        {
                                            messages: {
                                                in: "Passwords need to match.",
                                            },
                                        }
                                    )}
            
                        
                            <Button variant="primary"    type="submit"          
                                onClick={handleSubmit}
                                disabled={isDisabled}>
                                    Save Changes
                               </Button>
                       </Form.Group>
                    </Form>
                </Row>
            </Container>
        </>
    );
};

export default Profile;
