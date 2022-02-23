import React, { useEffect, useState } from "react";

const LargeModal = (params) => {
    //get params passed in when calling modal, these are ultimately derived form redux store
    let closeModal = params.closeFunction;
    // let openModal = params.openFunction;
    let showModal = params.showModal;
    let BodyComponent = params.bodyComponent;

    const [showBackdrop, setShowBackdrop] = useState(false);

    useEffect(() => {
        if (showModal) {
            //show modal with unique class name based on component name so multiple large generic modals can be used at once on screen
            const btn = document.getElementById(
                `hidden-large-open-modal-button-${BodyComponent.name}`
            );
            btn.click();
            setShowBackdrop(true);
        }
    }, [showModal, BodyComponent.name]);

    const handleBackdropClick = async (event) => {
        //close modal based on user event click
        if (
            event.target.id ===
                `large-modal-id-${BodyComponent.name}` ||
            event.target.id ===
                `close-large-modal-button-${BodyComponent.name}` ||
            event.target.id ===
                `close-large-modal-icon-${BodyComponent.name}`
        ) {
            closeModal();
            const btn = document.getElementById(
                `close-large-modal-button-${BodyComponent.name}`
            );
            btn.click();
            setShowBackdrop(false);
        }
    };

    const submitForm = () => {
        //close the modal on form submit
        closeModal();
        const btn = document.getElementById(
            `close-large-modal-button-${BodyComponent.name}`
        );
        btn.click();
        setShowBackdrop(false);
    };

    return (
        <>
            <button
                type="button"
                id={`hidden-large-open-modal-button-${BodyComponent.name}`}
                className="invisible"
                style={{ display: "none" }}
                data-toggle="modal"
                data-target={`#large-modal-id-${BodyComponent.name}`}
                data-backdrop="false"
            ></button>
            <div
                className={`${showBackdrop ? "modal-backdrop fade show" : ""}`}
                onClick={handleBackdropClick}
            ></div>
            <div
                className="modal fade"
                id={`large-modal-id-${BodyComponent.name}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby={`large--modal-id-${BodyComponent.name}`}
                aria-hidden="true"
                onClick={handleBackdropClick}
            >
                <div
                    className="modal-dialog modal-dialog-centered large-modal "
                    role="document"
                >
                    <div className="modal-content bg-light ">
                        <div className="modal-header justify-content-end ">
                            <button
                                type="button"
                                className="close"
                                id={`close-large-modal-button-${BodyComponent.name}`}
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={handleBackdropClick}
                            >
                                <span
                                    aria-hidden="true"
                                    className="icon-x"
                                    id={`close-large-modal-icon-${BodyComponent.name}`}
                                    onClick={handleBackdropClick}
                                ></span>
                            </button>
                        </div>
                        <BodyComponent
                            closeFunction={closeModal}
                            handleModalExit={submitForm}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LargeModal;
