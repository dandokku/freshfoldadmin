import { Box, CircularProgress, Fab} from "@mui/material";
import React from "react";
import styled from "styled-components";
import {Check, Save} from "@mui/icons-material"
import { green } from "@mui/material/colors";
import { FaSave, FaCheck, FaTrash } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";


export default function UserActions1({params, rowId, setRowId,deleteRowId, setIsRowDeleted, setModalOpenClass}) {
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    // const [modalOpenClass, setModalOpenClass] = React.useState("popup-modal");



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
        <Container>
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
                        bgcolor: "#34CCA1",
                    }}
                    >
                        <FaCheck color="#fff"/>
                    </Fab>
                ) : (
                    <Fab
                    color = "#34CCA1"
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
                <Fab
                color="warning"
                sx={{ width: 40, height: 40, marginLeft: "0.5rem" }}
                disabled={loading}
                onClick={() => setModalOpenClass("popup-modal active")}
                >
                    <FaTrash />
                </Fab>
            {
                loading && (
                    <CircularProgress 
                    size={52}
                    sx={{
                        color: "#34CCA1",
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
const bg = "#F4F4F4";
const borderRad = "5px";
const gray = "#04040A";
const lightGray = "#7A8C87"

const Container = styled.div`
    border: solid 2px red;

`

