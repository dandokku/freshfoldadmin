import { Box, CircularProgress, Fab } from "@mui/material";
import React from "react";
import styled from "styled-components";
import {Check, Save} from "@mui/icons-material"
import { green } from "@mui/material/colors";
import { FaSave, FaCheck } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

export default function UserActions2({params, rowId, setRowId}) {
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)


    async function updatePrice(price) {
        const response = await axios.put(`https://freshfoldserver.onrender.com/api/prices/${rowId}`, price);
        return response.data
    }


    // console.log("id: ", params.row._id)
    // console.log("row-id", rowId);
    // console.log("name", params.row.name)
    


    const {mutate} = useMutation(updatePrice, 
    {
        onSuccess: (data) => {
            setSuccess(true);
            setRowId(null);
            setLoading(false)
        },
        onError: (err) => console.log(err)
    })


    function handleSubmit(){
        setLoading(true);
        setTimeout(() => {
            const {price, group, name, image} = params.row;

            if (rowId === params.row._id) {
              mutate({
                name: name,
                group: group,
                price: price
              })
            }
        }, 2000)
    }

    React.useEffect(() => {
        if(rowId === params.id && success) setSuccess(false) 
    }, [rowId])

    return (
        <Box
        sx={{
            m: 1,
            position: "relative"
        }}>
            {
                success ? (
                    <Fab
                    color = "red"
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "#E9B609",
                    }}
                    >
                        <FaCheck color="#fff"/>
                    </Fab>
                ) : (
                    <Fab
                    color = "primary"
                    sx={{
                        width: 40,
                        height: 40,
                    }}
                    disabled={params.id !== rowId || loading }
                    onClick={handleSubmit}
                    >
                        <FaSave />
                    </Fab>
                )
            }
            {/* {
                loading && (
                    <CircularProgress 
                    size={52}
                    sx={{
                        color: "#E9B609",
                        position: "absolute",
                        top: -6,
                        left: -6,
                        zIndex: 1
                    }}
                    />
                )
            } */}
        </Box>

    )
}