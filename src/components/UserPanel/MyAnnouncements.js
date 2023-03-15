import my_announcement from "../../const/my_announcements";
import {Container, Card, Col, CardImg, Row} from "react-bootstrap";
import "./MyAnnouncement.css";
import {TiLocation} from "react-icons/ti";
import "../Announcements/DeleteAnnouncement"
import DeleteAnnouncement from "../Announcements/DeleteAnnouncement";
import EditAnnouncement from "../Announcements/EditAnnouncement";
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
                <div className="outter">
                {my_announcement.map((announcement) => ( <div>
                    <Row>
                        <Col md = {{offset : 3, span: 6}}>
                            <Card style={{overflow:"hidden", borderRadius:"12px"}}>
                                <Row>
                                    <Col md = '4'>
                                        <div style={{overflow:"hidden"}}>
                                            <Card.Img className= "image" src={require("../../assets/img/" + announcement.city + ".jpg")} />
                                        </div>
                                    </Col>
                                    <Col md = '8'>
                                    <Card.Body>
                                        <Row>
                                            <Col md= '1'>
                                                <h1><TiLocation /></h1>
                                            </Col>
                                            <Col md='9'>
                                                <Card.Title>
                                                    <h1> {announcement.city}</h1>
                                                    {announcement.country}
                                                </Card.Title>
                                            </Col>
                                            <Col md='2'>
                                                {check_EditTrash(announcement.status)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={{offset : 3, span:8}}>
                                            <Row>
                                            <Col md = '8'>
                                                Status: {announcement.status}
                                            </Col>
                                            <Col md = '4'>
                                                <Card.Text>
                                                    <Row>
                                                        Start: {announcement.departureDate}
                                                    </Row>
                                                    <Row>
                                                        End: {announcement.arrivalDate}
                                                    </Row>
                                                </Card.Text>
                                            </Col>
                                            </Row>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    </div>
                    ))}
                </div>
            </div>
    );
}

export default MyAnnouncements;