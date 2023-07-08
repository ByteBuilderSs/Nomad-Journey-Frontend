import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    Divider,
    Card,
    Chip,
    Stack,
    Typography
} from '@mui/material';
import About from "../About";
import OverviewV2 from "./Overview-v2";
import {Item} from "semantic-ui-react";

function TabAboutMe(props) {

    return(
        <>
            <div style={{alignItems:"center", justifyContent:"center", display:"flex",
                paddingTop:"5rem"
            }}>
                <Stack
                    spacing={5}
                sx={{width:"75%",
                }}>
                    <Item>
                        <div style={{
                            backgroundColor:"#1A659E",
                            borderRadius:"15px",
                            color:"#EFEFD0",

                        }}>
                            <OverviewV2
                                url_username={props.url_username}
                                local_storage_username={props.local_storage_username}
                            />
                        </div>
                    </Item>
                    <Item>
                    <div style={{
                        backgroundColor:"#1A659E",
                        borderRadius:"15px",
                        color:"#EFEFD0",
                        marginBottom: "2rem"
                    }}>
                        <About
                            url_username={props.url_username}
                            local_storage_username={props.local_storage_username}
                        />
                    </div>
                    </Item>

                </Stack>

            </div>
        </>
    );
}

export default TabAboutMe;