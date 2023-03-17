import my_announcement from "../../const/my_announcements";
import {Container, Card, Col, CardImg, Row} from "react-bootstrap";
import "./MyAnnouncement.css";
import {TiLocation} from "react-icons/ti";
import "../Announcements/DeleteAnnouncement"
import DeleteAnnouncement from "../Announcements/DeleteAnnouncement";
import EditAnnouncement from "../Announcements/EditAnnouncement";
import {Grid3x3} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import {Stack} from "@mui/material";
function MyAnnouncements() {
    const check_EditTrash = (announcementStatus) => {
        if (announcementStatus === "Pending" || announcementStatus === "Accepted")
        {
            return(
                <h1 className="outter">
                    <Row>
                    <Col md='6'>
                        <EditAnnouncement />
                    </Col>
                    <Col md='6'>
                        <DeleteAnnouncement />
                    </Col>
                    </Row>
                </h1>
            );
        }
    }
    return (
        <div>
            <h1>My Announcements</h1>
                <div className="outter">
                <Stack spacing={2} direction="row">
                    {my_announcement.map((announcement) => (
                        <div>
                            salam
                        </div>
                    ))}
                </Stack>
                </div>
            </div>
    );
}

export default MyAnnouncements;