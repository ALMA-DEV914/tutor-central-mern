import React, { useState, useEffect} from "react";
import Auth from "../../utils/auth";
import { Container, Button,Form, FormControl } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_BETA_FEEDBACK} from "../../utils/mutations";
import { GET_BETA_FEEDBACK } from "../../utils/queries";



const BetaNoticeModalBody = (params) => {
    //local component state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [isDisabled, setIsDisabled] = useState(false);
    const [isMuted, setIsMuted] = useState("");
    //this mutation also refetches the beta feedback so things stay current
    const [addBetaFeedback] = useMutation(ADD_BETA_FEEDBACK, {
        refetchQueries: [{ query: GET_BETA_FEEDBACK }],
    });
   
    const user = Auth.loggedIn();
    //params from parent component
    const selectedCategory = document
    .querySelector(".feedback-type")
    .querySelector(".selectric")
    .querySelector(".label").innerHTML;
    useEffect(() => {
        //populate and disable fields for user and email if a user is logged in
        if (user.email) {
            setIsDisabled(true);
            setEmail(user.email);
            setUsername(user.username);
            setIsMuted("text-muted");
        } else {
            setIsDisabled(false);
            setEmail("");
            setUsername("");
            setIsMuted("");
        }
    }, [user]);

    const onSubmit = async (event) => {
        //prevent server reload of page on click
        event.preventDefault();
                //write to db via graphql mutation
                try {
                    await addBetaFeedback({
                        variables: {
                            username,
                            email,
                            category: selectedCategory,
                            message,
                            archived: false,
                        },
                    });
                    //let user know what happened
                }catch(err){
                    return(err)
                }
            }

    return (
        <>
        <Container>
        <div className="text-center">
            <h2>Write Us</h2>
            <p className="lead">
                Did you find a bug? Want to make a suggestion? If you have any feedback please let us know.
                        </p>
                </div>
                  <div className="row">
                        <div className="col-md-12">
                            <Form className="mt-2">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <Form.Label htmlFor="firstName">
                                            Username
                                       </Form.Label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    @
                                                </span>
                                            </div>
                                            <FormControl
                                                type="text"
                                                className={`form-control ${isMuted}`}
                                                onChange={(event) => {
                                                    setUsername(
                                                        event.target.value
                                                    );
                                                }}
                                                value={username}
                                                placeholder="Username"
                                                disabled={isDisabled}
                                            />
                                        </div>
                        
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <Form.Label htmlFor="lastName">Email</Form.Label>
                                        <FormControl
                                            type="email"
                                            className={`form-control ${isMuted}`}
                                            placeholder="user@tutor-student-connect.com"
                                            onChange={(event) => {
                                                setEmail(event.target.value);
                                            }}
                                            value={email}
                                            disabled={isDisabled}
                                        />
                    
                                    </div>
                                </div>

                                <div className="mb-3 mt-n5">
                                    <Form.Label htmlFor="email">Category</Form.Label>
                                    <div className="form-group feedback-type">
                                        <Form.Select className="form-control">
                                            <option>Suggestion</option>
                                            <option>Bug</option>
                                            <option>Other</option>
                                        </Form.Select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <Form.Label htmlFor="address">Message</Form.Label>
                                    <Form.Control as='textarea'
                                        type="text"
                                        className="form-control"
                                        rows="6"
                                        style={{
                                            height: "100%",
                                        }}
                                        placeholder="I noticed that..."
                                        onChange={(event) => {
                                            setMessage(event.target.value);
                                        }}
                                        value={message}
                                    />
                            
                                </div>
                                <hr className="mb-2" />
                                <div>
                                    <Button
                                        type="submit"
                                        className="btn btn-lg btn-primary w-100"
                                        onClick={onSubmit}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>

             </Container>
        </>
    );
};

export default BetaNoticeModalBody;
