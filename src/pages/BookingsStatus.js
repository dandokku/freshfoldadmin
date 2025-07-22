import { Box, CircularProgress, Fab} from "@mui/material";
import React from "react";
import styled from "styled-components";
import { FaSave, FaCheck, FaTrash } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import axios from "axios";


export default function BookingStatus({params, rowId, setRowId}) {
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)


    async function updateStatus(status) {
        const response = await axios.put(`https://freshfoldserver.onrender.com/api/bookings/${rowId}`, status);
        return response.data
    }


    // console.log("id: ", params.row._id)
    // console.log("row-id", rowId);
    // console.log("name", params.row.name)
    

    const {mutate} = useMutation(updateStatus, 
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
            const {status} = params.row;

            if (rowId === params.row._id) {
              mutate({
                status: status
              })
            }
        }, 2000)
    }

    React.useEffect(() => {
        if(rowId === params.id && success) setSuccess(false) 
    }, [rowId])

    // console.log("rowId", rowId)

    return (
        <Container>
         <Box
        sx={{
            m: 1,
            position: "relative"
        }}>
            {
                success ? (
                    <Fab
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "#33cca1",
                    }}
                    >
                        <FaCheck color="#fff"/>
                    </Fab>
                ) : (
                    <Fab
                    color = "#33cca1"
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
            {
                loading && (
                    <CircularProgress 
                    size={52}
                    sx={{
                        color: "#33cca1",
                        position: "absolute",
                        top: -6,
                        left: -6,
                        zIndex: 1
                    }}
                    />
                )
            }
        </Box>
        

        </Container>
       
    )
}

const primary =  "#34CCA1";
const secondary = "#34CCA1";
// const bg = "#F4F4F4";
const borderRad = "5px";
const gray = "#04040A";
const lightGray = "#7A8C87"
const Container = styled.div`

`

