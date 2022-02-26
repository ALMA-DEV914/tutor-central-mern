import { useState, useReducer, useContext } from "react";
import { useMutation } from "@apollo/client";
import {
    GET_S3_URL_AUTHENTICATED,
    UPDATE_PROFILE_PIC,
} from "../../utils/mutations";
import Auth from "../../utils/auth";
import { Container, Col, Form, Row, Button } from 'react-bootstrap';

const UpdateProfilePic = (params) => {
    //get user data 
    const user = useContext((state) => state.loggedInUser);
    //get the modal exit function passed from parents
    const handleModalExit = params.handleModalExit;
    //local component state
    const [imageFile, setImageFile] = useState(null);
    const [imageIsSquare, setImageIsSquare] = useState(true);
    //validator for image file size
    const [validatorProfilePic] = useState(
            ({
            validators: {
                maxFileSize: {
                    // name the rule
                    message: "The max file size is 250kb.",
                    rule: (val, params, validator) => {
                        if (val) {
                            const fileSize = val.size / 1024 / 1024; // in MiB
                            if (fileSize > 0.25) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    },
                    required: true, // optional
                },
            },
        })
    );
    // eslint-disable-next-line
    const [forceUpdate] = useReducer((x) => x + 1, 0);
    const state = useContext();
    //mutations to upload the file to s3 and update db with its URL
    const [getS3UrlAuthenticated] = useMutation(GET_S3_URL_AUTHENTICATED);
    const [updateProfilePic] = useMutation(UPDATE_PROFILE_PIC);

    const onSubmit = async (event) => {
        event.preventDefault();
        //check both SimpleReactValidator and custom image is square validator
        if (validatorProfilePic.allValid() && imageIsSquare) {
            try {
                let imageUrl = "";
                if (imageFile) {
                    //get secure url from our server
                    const urlReturnObject = await getS3UrlAuthenticated({
                        variables: {
                            isLoggedIn: Auth.loggedIn(),
                        },
                    });
                    const urlObject = urlReturnObject.data;
                    const url = urlObject.getS3UrlAuthenticated;
                    //post the image directly to the s3 bucket
                    await fetch(url, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        body: imageFile,
                    });
                    //get back image url from s3
                    imageUrl = url.split("?")[0];
                    try {
                        //update db with s3 URL
                        await updateProfilePic({
                            variables: {
                                userId: user.id,
                                profilePic: imageUrl,
                            },
                        });
                        //let user know it was updated
                        setTimeout(function () {
                            state(
                                useContext.updateAndShowModal(
                                    "Success",
                                    "Your profile pic has been updated."
                                )
                            );
                        }, 250);

                        //exist the modal and clear image that was attached to form
                        handleModalExit();
                        setImageFile(null);
                        const fileInput = document.getElementsByClassName(
                            "profile-pic-file-input"
                        )[0];
                        fileInput.value = null;
                        //update redux store for user object with new image URL
                        state(
                            useContext.updateProfilePicRedux(user.id, imageUrl)
                        );
                    } catch (err) {
                        setTimeout(function () {
                            state(
                                useContext.updateAndShowModal(
                                    "Error",
                                    "There was an error either with graphQL, MongoDB, or Amazon s3. Please try again later."
                                )
                            );
                        }, 250);
                    }
                }
            } catch (error) {
                console.log(error);
                state(
                    useContext.updateAndShowModal("Error", error.message)
                );
            }
        } else {
            //show issues with validation
            validatorProfilePic.showMessages();
            //force update state to show validation messages to user
            forceUpdate();
        }
    };

    const getImageDimensions = async (file) => {
        //create a function to render image and then get its height and width
        const getDimensions = () => {
            //use current browser window
            const _URL = window.URL || window.webkitURL;
            //create image object
            const image = new Image();
            //add the source from the file the user entered
            image.src = _URL?.createObjectURL(file);
            //return a promise that will resolve the dimensions of the image once it has loaded
            return new Promise(function (resolve, reject) {
                image.onload = function () {
                    resolve([image.height, image.width]);
                };
            });
        };
        //ensure something was passed
        if (file) {
            //await the dimensions of the file after it is loaded
            const finalResults = await getDimensions(file);
            //return results
            return finalResults;
        }
    };

    const handleImageSelection = async (event) => {
        //get the file that was submitted by user and add to state
        const input = event.target;
        setImageFile(input.files[0]);
        //get the dimensions of the file asynchronously
        const imageDimensions = await getImageDimensions(input.files[0]);
        //if there are dimensions and if they equal each other, set state letting the page know that the image is valid to true
        if (imageDimensions && imageDimensions[0] === imageDimensions[1]) {
            setImageIsSquare(true);
        } else {
            setImageIsSquare(false);
        }
    };

    return (
        <>
            <Container>
                    <Col>
                        <img
                            className="img-fluid mx-auto d-block large-profile-pic"
                            src={user.profilePic}
                            alt="profile pic"
                        />
                    </Col>
                    <Row>
                        <Form.Group>
                            <Form.Label>
                              Image Upload
                              </Form.Label>
                            <Form.Control
                                type="file"
                                className="form-control profile-pic-file-input"
                                name="image"
                                accept="image/*"
                                onChange={(event) => {
                                    handleImageSelection(event);
                                    }}
                                >
                                {validatorProfilePic.message(
                                "maxFileSize",
                                imageFile,
                                "maxFileSize"
                                )}
                                {imageIsSquare ? (
                                 <></>
                                ) : (
                                    <>
                                    The image must be a perfect
                                    square.
                                    </>
                                    )}
                                </Form.Control>
                                <Button 
                                        type="submit"
                                        className="btn btn-lg btn-primary w-100"
                                        onClick={(event) => {
                                        onSubmit(event);
                                        }}
                                    >
                                        Update
                                    </Button>
                               </Form.Group>
                        </Row>
                </Container>
        </>
    );
};

export default UpdateProfilePic;
