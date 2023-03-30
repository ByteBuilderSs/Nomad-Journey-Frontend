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

import {BiEdit} from "react-icons/bi";
import {FiX} from "react-icons/fi";
import "../UserPanel/RightBar/MyAnnouncement.css";
import {IconButton} from "@mui/material";
function EditAnnouncement()
{
    const [show, setShow] = useState(false);
    return (
        <>
            <IconButton className="edit-announcement"  onClick={() => setShow(true)}>
                <BiEdit className="edit" />
            </IconButton>
            <MDBModal show={show} onHide={() => setShow(false)}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Edit Announcement</MDBModalTitle>
                            <button className="delete-announcement"  onClick={() => setShow(false)}>
                                <FiX className="trash" />
                            </button>
                        </MDBModalHeader>
                        <MDBModalBody>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={() => setShow(false)}>
                                Close
                            </MDBBtn>
                            <MDBBtn> Edit</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>  )
}
export default EditAnnouncement;