import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NewRequestForm from "./NewRequestForm";
import { DataTable } from "primereact/datatable";
import "./Header.css";

export default function HeaderComponent(props) {
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [requestData, setRequestData] = useState({});

    const openCreateRequest = (event) => {
        setOpen(true);
        setDisabled(false);
    }
    const header = (
        <div className="table-header">
            <div>
            <Button
                varient="contained"
                size="large"
                style={{ minWidth: 150 }}
                onClick={(e) => openCreateRequest()}>
                    Add New Request
            </Button>
            </div>
        </div>
    )
    return (
        <div className="datatable-crud-demo">
            <div className="card">
                <Grid sx={{ marginTop: 2 }} container spacing={2}>
                    <Grid item xs={12}>
                        <DataTable
                            header={header}>
                        </DataTable>
                    </Grid>
                </Grid>
            </div>
            <NewRequestForm 
                open={open}
                setOpen={setOpen}
                disabled={disabled}
                setDisabled={setDisabled}
                setRequestData={setRequestData}
                requestData={requestData}
            />
        </div>
    );
}