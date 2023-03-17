import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import MyAnnouncements from "./MyAnnouncements";
import MyPosts from "./Posts";
import MyFeedbacks from "./Feedback";
import AboutMe from "./About";
import "./UserPanel.css";
import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import user from "../../const/profile";
import {Add, } from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {BiEdit} from "react-icons/bi";
import {TiUser} from "react-icons/ti";
import {AiFillNotification} from "react-icons/ai";
import {MdFeedback} from "react-icons/md";
import {HiCamera} from "react-icons/hi";
import {GiTwoCoins} from "react-icons/gi";
import {BsStarHalf} from "react-icons/bs";
import {FiChevronRight} from "react-icons/fi";
function UserPanelPage() {
    const menuItem = [
        {
            name : "About Me",
            component : <AboutMe />,
            icon : <TiUser />,
        },
        {
            name : "Announcements",
            component : <MyAnnouncements />,
            icon : <AiFillNotification />,
        },
        {
            name : "Posts",
            component : <MyPosts />,
            icon : <HiCamera />,
        },
        {
            name : "feedback",
            component : <MyFeedbacks />,
            icon : <MdFeedback />,
        },
    ]
    const [active, setActive] = useState("About Me");
    return (
        <div className="font">
            <Container>
                <Row>
                    <Col md={{span: 3}}>
                        <div className="side-bar">
                            <Row>
                                <Row>
                                    <div className="profile">
                                        <Avatar sx={{width:'8vw', height:'8vw'}} src={user.profile_path}/>
                                    </div>
                                </Row>
                                         <Row>
                                        <div className="profile">
                                            <IconButton className="edit_profileIcon" size="large">
                                                <BiEdit/>
                                            </IconButton>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="profile">
                                            {user.name} {user.last_name}
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="profile">
                                            {user.nationality}
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="profile">
                                             coins: {user.coin} <GiTwoCoins color="#e55405"/>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="profile">
                                             rating: {user.rating} <BsStarHalf color="#e55405"/>
                                        </div>
                                    </Row>
                            </Row>
                            <Row>
                                <ul className="list-section">
                                    {menuItem.map((item, key) => (
                                        <div className="sidebar_list">
                                            <Link className={`section`} onClick={() => setActive(item.name)}>
                                                {active === item.name && (<FiChevronRight />)} {item.icon} {item.name}
                                            </Link>
                                        </div>
                                    ))}
                                </ul>
                            </Row>
                            <Row>
                                    <Add /> New Announcement
                            </Row>
                        </div>
                    </Col>
                    <Col className="content-div">
                        <div>
                            {menuItem.map((item, key) => (
                                <div id={`${item.name}`}>
                                    {active === item.name && item.component}
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
};

export default UserPanelPage;