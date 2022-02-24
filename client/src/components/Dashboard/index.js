import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Profile from "../Profile";
import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import { useLazyQuery } from "@apollo/client";
import { GET_FEEDBACK } from "../../utils/queries";
import LargeModal from "../LargeModal";
import UpdateProfile from "../UpdateProfile";

const Dashboard = (params) => {
  //get user from redux store
  const user = useSelector((state) => state.loggedInUser);
  const [Feedback, setFeedback] = useState(null);
  //use lazy query to pull data from db on demand
  const [getFeedbackData] = useLazyQuery(GET_FEEDBACK, {
    //add data to state once returned
    onCompleted: (data) => setFeedback(data.Feedback),
    //ensures the most up to date data is shown
    fetchPolicy: "network-only",
  });

  const [isTutor, setIsTutor] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isUser, setIsUser] = useState(false);
  // setup component local state and functions to pass to child components (these maybe could move to the child components in the future)
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const history = useHistory();

  useEffect(() => {
    //if the user isn't logged in send them to login screen
    if (!Auth.loggedIn()) {
      history.push("/login");
    }
    //show appropriate nav tabs based on roles the user has
    if (user?.roles.some((e) => e.role === "tutor") && Auth.loggedIn()) {
      setIsTutor(true);
    }
    if (user?.roles.some((e) => e.role === "student") && Auth.loggedIn()) {
      setIsStudent(true);
    }
    if (user?.roles.some((e) => e.role === "user") && Auth.loggedIn()) {
      setIsUser(true);
    }
  }, [user.roles, history]);

  return (
    <>
      <section className='pb-5 pt-5 viewport'>
        <div style={{ backgroundColor: bgColor, height: "5rem" }}></div>
        <div className='d-flex justify-content-center flex-nowrap mb-1 row'>
          <div className='card bg-light col-8 dashboard-card'>
            <div className='mt-n3'></div>
            <div className='mt-n10 mb-6'>
              <div className='card-body p-0 mt-n10'>
                <div className='p-0 mt-n10'>
                  <div className='container mt-n10 '>
                    <div
                      className='row justify-content-center align-items-end mb-5 mt-n10'
                      style={{ height: "28em" }}
                    >
                      <div className='col-sm-12 col-md-10 col-lg-8 mt-n10'>
                        <div className='row align-items-center profile-div'>
                          <div className='col-lg-3'>
                            <img
                              className='mr-3 avatar avatar-xl rounded profile-pic'
                              src={user.profilePic}
                              alt='Generic placeholder'
                              data-toggle='modal'
                              data-target='#update-profile-pic-modal'
                              onClick={() => openModal()}
                            />
                            <span
                              className='control-color circle-icon bg-primary'
                              onClick={() => openModal()}
                            ></span>
                          </div>

                          <div className='col user-name-div'>
                            <div className='row align-items-center'>
                              <div className='col-md-8'>
                                <h2 className='mb-0'>
                                  <b>{user.username}</b>
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-0'>
                  <div className='container'>
                    <div className='row justify-content-center'>
                      <div className='col col-md-10 col-lg-8'>
                        <div className='nav nav-tabs mb-1'>
                          {isUser && (
                            <>
                              <a
                                className='nav-item nav-link active'
                                data-toggle='tab'
                                href='#profile'
                              >
                                Profile
                              </a>
                              <a
                                className='nav-item nav-link'
                                data-toggle='tab'
                                href='#bookmarks'
                              >
                                Bookmarks
                              </a>
                            </>
                          )}
                          {isTutor && (
                            <>
                              <a
                                className='nav-item nav-link'
                                data-toggle='tab'
                                href='#feedback'
                                onClick={() => getFeedbackData()}
                              >
                                Feedback
                              </a>
                              <a
                                className='nav-item nav-link'
                                data-toggle='tab'
                                href='#student-tools'
                              >
                                Student Tools
                              </a>
                            </>
                          )}
                          {isStudent && (
                            <a
                              className='nav-item nav-link'
                              data-toggle='tab'
                              href='#student-tools'
                            >
                              Student Tools
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='pt-2'>
                  <div className='container'>
                    <div className='tab-content' id='demo-2'>
                      <div
                        className='tab-pane show active'
                        id='profile'
                        role='tabpanel'
                        aria-labelledby='profile'
                      >
                        <div className='row justify-content-center'>
                          <div className='col-md-12 col-lg-12'>
                            <Profile />
                          </div>
                        </div>
                      </div>

                      <div
                        className='tab-pane'
                        id='feedback'
                        role='tabpanel'
                        aria-labelledby='feedback'
                      >
                        <div className='row justify-content-center'>
                          <div className='col-md-10 col-lg-8'>
                            <Feedback feedback={Feedback} />
                          </div>
                        </div>
                      </div>

                      <div
                        className='tab-pane'
                        id='bookmarks'
                        role='tabpanel'
                        aria-labelledby='#bookmarks'
                      >
                        <div className='row justify-content-center'>
                          <div className='col-md-10 col-lg-8'></div>
                        </div>
                      </div>

                      <div
                        className='tab-pane'
                        id='mod-tools'
                        role='tabpanel'
                        aria-labelledby='#mod-tools'
                      >
                        <div className='row justify-content-center'>
                          <div className='col-md-10 col-lg-8'>
                            Student Tools will go here...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LargeModal
        closeFunction={closeModal}
        openFunction={openModal}
        showModal={showModal}
        bodyComponent={UpdateProfile}
      />
    </>
  );
};

export default Dashboard;
