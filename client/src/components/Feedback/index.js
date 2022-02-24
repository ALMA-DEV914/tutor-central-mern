import { useMutation } from "@apollo/client";
import { ARCHIVE_FEEDBACK } from "../../utils/mutations";
import React, { useState, useEffect } from "react";
import { modalActions } from "../../utils/actions";
import { useDispatch } from "react-redux";

const Feedback = (params) => {
    //params from parent
    let FeedbackData = params.feedback;
    //graphql mutations
    const [archiveFeedback] = useMutation(ARCHIVE_FEEDBACK);
    //local component state
    const [feedbackData, setFeedbackData] = useState(FeedbackData);
    //to save data to redux store

    const dispatch = useDispatch();
    useEffect(() => {
        setFeedbackData(FeedbackData);
    }, [FeedbackData]);

    const handleFeedbackDetailsClick = (event) => {
        event.preventDefault();
        const idSelected = event.target.getAttribute("data-index");
        //get the relevant feedback data for the modal
        const result = feedbackData.filter((obj) => {
            return obj._id === idSelected;
        })[0];
        //put modal options in redux store to show user
        dispatch(
            modalActions.updateAndShowModal(
                `${result.username} - ${new Date(
                    parseInt(result.createdAt)
                ).toLocaleDateString("en-US")}`,
                result.message,
                result.image
            )
        );
    };

    const handleFeedbackArchiveClick = async (event) => {
        event.preventDefault();
        const idSelected = event.target.getAttribute("data-index");
        try {
            // 1. Make a shallow copy of the items
            let items = [...feedbackData];
            // 2. Make a shallow copy of the item you want to mutate
            const foundIndex = items.findIndex((x) => x._id === idSelected);
            let item = { ...items[foundIndex] };
            // 3. Replace the property you're interested in
            item.archived = true;
            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
            items[foundIndex] = item;
            // 5. Set the state to our new copy
            setFeedbackData(items);
            try {
                setFeedbackData(items);
            } catch (error) {
                dispatch(
                    modalActions.updateAndShowModal("Error", error.message)
                );
            }
        } catch (err) {
            dispatch(modalActions.updateAndShowModal("Error", err.message));
        }
    };

    return (
        <>
            <h5 className="mb-2 fs-20 font-weight-normal">Users Feedback</h5>
            <div className="row">
                <div className="col">
                    <div className="table-responsive-md">
                        <table className="table table-lined ">
                            <thead style={{ textAlign: "center" }}>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th
                                        scope="col"
                                        className="d-none d-sm-table-cell"
                                    >
                                        Category
                                    </th>
                                    <th
                                        scope="col"
                                        className="d-none d-sm-table-cell"
                                    >
                                        Message
                                    </th>
                                    <th scope="col">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbackData &&
                                    feedbackData
                                        .filter(
                                            (feedback) => !feedback.archived
                                        )
                                        .map((feedback) => (
                                            <tr key={feedback._id}>
                                                <th scope="row">
                                                    {new Date(
                                                        parseInt(
                                                            feedback.createdAt
                                                        )
                                                    ).toLocaleDateString(
                                                        "en-US"
                                                    )}
                                                </th>
                                                <td className="d-none d-sm-table-cell">
                                                    {feedback.category}
                                                </td>
                                                <td className="d-none d-lg-table-cell">
                                                    {feedback.message.substring(
                                                        0,
                                                        40
                                                    )}
                                                    ...
                                                </td>
                                                <td className="text-center">
                                                    <div className="dropdown">
                                                        <span
                                                            className="btn btn-ico btn-outline-light text-dark rounded btn-sm"
                                                            role="button"
                                                            id="dropdownMenuLink-3"
                                                            data-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="icon-more-vertical fs-22"></i>
                                                        </span>
                                                        <div
                                                            className="dropdown-menu"
                                                            aria-labelledby="dropdownMenuLink-3"
                                                        >
                                                            <button
                                                                className="dropdown-item"
                                                                data-index={
                                                                    feedback._id
                                                                }
                                                                onClick={
                                                                    handleFeedbackDetailsClick
                                                                }
                                                            >
                                                                Details
                                                            </button>
                                                            <button
                                                                className="dropdown-item"
                                                                data-index={
                                                                    feedback._id
                                                                }
                                                                onClick={
                                                                    handleFeedbackArchiveClick
                                                                }
                                                            >
                                                                Archive
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Feedback;
