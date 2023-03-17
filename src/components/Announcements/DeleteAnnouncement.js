import React, {useState} from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

import {BiTrash} from "react-icons/bi";
import {FiX} from "react-icons/fi";
import "../UserPanel/MyAnnouncement.css";
function DeleteAnnouncement()
{
    const [show, setShow] = useState(false);
    return (
        <>
            <button className="delete-announcement"  onClick={() => setShow(true)}>
                <BiTrash className="trash" />
            </button>
            <MDBModal show={show} onHide={() => setShow(false)}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Delete Announcement</MDBModalTitle>
                            <button className="delete-announcement"  onClick={() => setShow(false)}>
                                <FiX className="trash" />
                            </button>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <p>
                                Are you sure you want to delete this announcement?
                            </p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={() => setShow(false)}>
                                No
                            </MDBBtn>
                            <MDBBtn> Yes, I do</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>  )
}
export default DeleteAnnouncement;