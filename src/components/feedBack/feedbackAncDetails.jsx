import {Rating, Stack} from "@mui/material";
import {Item} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import axios from "axios";


export default function FeedbackAncDetails(props){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState({});
    useEffect( () =>
    {
        axios(`https://api.nomadjourney.ir/api/v1/feedback/feedback-anc/${props.announcement_id}`)
            .then((data) => {
                setFeedback(data.data.data)})
            .catch(error =>
            {
                console.error("error fetching data:", error);
                setError(error);
            })
            .finally( () => {
                setLoading(false);
                console.log(feedback);
                console.log(props.announcement_id);
            })
    }, []);
    if(!loading)
        return(
        <>
            <div style={{fontSize:"85%", marginBottom:"3.5rem", marginLeft:"-1rem"}}>
                <Stack>
                    <Item>
                        host's treatment
                    </Item>
                    <Item>
                        <Rating sx={{color:"#FF6B35"}}
                                value={feedback.question_1} precision={0.5} readOnly />
                    </Item>
                    <Item>
                        level of your well-being on this trip
                    </Item>
                    <Item>
                        <Rating sx={{color:"#FF6B35"}}
                                value={feedback.question_2} precision={0.5} readOnly />
                    </Item>
                    <Item>
                        access to public transportation
                    </Item>
                    <Item>
                        <Rating sx={{color:"#FF6B35"}}
                                value={feedback.question_3} precision={0.5} readOnly />
                    </Item>
                    <Item>
                        cleanness
                    </Item>
                    <Item>
                        <Rating sx={{color:"#FF6B35"}}
                                value={feedback.question_4} precision={0.5} readOnly />
                    </Item>
                    <Item>
                        extra facilities (Guest parking lot)
                    </Item>
                    <Item>
                        <Rating sx={{color:"#FF6B35"}}
                                value={feedback.question_5} precision={0.5} readOnly />
                    </Item>
                </Stack>
            </div>
        </>
    )
}
