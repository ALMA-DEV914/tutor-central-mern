import {  useHistory } from "react-router-dom";
import React, { useState, useReducer} from "react";
import Auth from "../utils/auth";
import { ADD_STUDENT, USER_UPDATE_PASSWORD, UPDATE_PROFILE_PIC, GET_S3_URL_AUTHENTICATED } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

const Profile = (params) => {
    //to save and get data
    const {loading, data} = useQuery(ADD_STUDENT);
    console.log(data);
    const user = useHistory((state) => state.loggedInUser);

    //local component state
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [validatorPassword] = useState(new useState());
    // eslint-disable-next-line
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

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
        if (loading) {
            return <div>Loading...</div>;
          }
        
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
                    useState.updateAndShowModal(
                            "Success",
                            "Your password has been updated successfully."
                        )
                } else {
                    useState.updateAndShowModal(
                            "Error",
                            "There was a problem updating your password."
                        )
                }
                //disable update button to prevent spamming
                setIsDisabled(true);
                setOldPassword("");
                setNewPassword("");
                setRepeatNewPassword("");
            } catch (err) {
                useState.updateAndShowModal("Error", err.message);
            }
        } else {
            //show issues with validation
            validatorPassword.showMessages();
            //force update state to show validation messages to user
            forceUpdate();
        }
    };
    const handleModalExit = params.handleModalExit;
    const [imageFile, setImageFile] = useState(null);
    const [imageIsSquare, setImageIsSquare] = useState(true);

     const [validatorProfilePic] = useState(
        new useState({
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
                            useState.updateAndShowModal(
                                    "Success",
                                    "Your profile pic has been updated."
                                )
                        }, 250);

                        //exist the modal and clear image that was attached to form
                        handleModalExit();
                        setImageFile(null);
                        const fileInput = document.getElementsByClassName(
                            "profile-pic-file-input"
                        )[0];

                        fileInput.value = null;

                    } catch (err) {
                        setTimeout(function () {
                           useState.updateAndShowModal(
                                    "Error",
                                    "There was an error either with graphQL, MongoDB, or Amazon s3. Please try again later."
                                )
                        }, 250);
                    }
                }
            } catch (error) {
                console.log(error);
               useState.updateAndShowModal("Error", error.message)

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
            <div className="modal-body text-left mt-n1">
                <div className="container">
                    <div>
                        <img
                            className="img-fluid mx-auto d-block large-profile-pic"
                            src={data.user.student.profilePic}
                            alt="profile pic"
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <form className="mt-2">
                                <hr className="mb-2" />
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="image">
                                            Image Upload
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control profile-pic-file-input"
                                            name="image"
                                            accept="image/*"
                                            onChange={(event) => {
                                                handleImageSelection(event);
                                            }}
                                        />
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
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary w-100"
                                        onClick={(event) => {
                                            onSubmit(event);
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
        <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
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
                                        placeholder={data.user.student.username}
                                        disabled
                                    />
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
                                        placeholder={data.user.student.email}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-row mt-1 mb-3">
                            <div className="col">
                                <div className="custom-control custom-checkbox ml-1">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheckDisabled"
                                        checked={data.user.student.isVerified}
                                        disabled
                                    />
                                    <label
                                        className="custom-control-label is-verified-label"
                                        htmlFor="customCheckDisabled"
                                    >
                                        Is Verified
                                    </label>
                                </div>
                            </div>
                        </div>
                        <hr className="mt-2 mb-2" />
                        <div className="form-row">
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
                                        `required|in:${newPassword}|min:6`,
                                        {
                                            messages: {
                                                in: "Passwords need to match.",
                                            },
                                        }
                                    )}
                                </div>
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
                </div>
            </div>
        </>
    );
};

export default Profile;
