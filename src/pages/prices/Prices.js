import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import {Avatar, Box, Typography, gridClasses} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
// import { darken, lighten, styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import UserActions1 from "./UserActions1";
import { useMutation} from "react-query";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import adminImage from "../assets/images/about2.jpg"



export default function Prices() {

    async function getPrices(){
        const response = await axios.get("http://localhost:9000/api/prices");
        return response.data
   }

   const queryClient = useQueryClient();

   const admin = useSelector(state => state.admin);


//    function formatDate(date) {
//     if (!(date instanceof Date)) {
//       date = new Date(date);
//     }
  
//     if (isNaN(date.getTime())) {
//       return "Invalid Date";
//     }
  
//     const months = [
//       "January", "February", "March", "April", "May", "June", "July",
//       "August", "September", "October", "November", "December"
//     ];
  
//     const day = date.getDate();
//     const month = date.getMonth();
//     const year = date.getFullYear();
  
//     const formatted = `${months[month]} ${day}, ${year}`;
//     return formatted;
//   }

//    const [pageSize, setPageSize] = React.useState(5);
   const [rowId, setRowId] = React.useState(null);
   const [isRowDeleted, setIsRowDeleted] = React.useState(false);

   const [modalOpenClass, setModalOpenClass] = React.useState("popup-modal");
    const [deleteRowId, setDeleteRowId] = React.useState();

   const columns = React.useMemo(() => [
    // {field: "image", headerName: "Item Image", width: 120, maxWidth: 120, renderCell: params=><Avatar src={params.row.userImage}/>, sortable: false, filterable: false},
    {field: "_id", headerName: "Id", width: 220, maxWidth: 220},
    {field: "name", headerName: "Item Name", width: 170, maxWidth: 170, editable: true,},
    {field: "group", headerName: "Service Group", width: 170, maxWidth: 170, editable: true,},
    {field: "price", headerName: "Price", width: 200, maxWidth: 170, renderCell: (params) => {
        return (
            <div>
                <p>$ {params.row.price}</p>
            </div>
        )
    }, editable: true,},
    {field: "actions", headerName: "Actions", type: "actions", renderCell: params => {
        const deleteRowId = params.row._id;
        setDeleteRowId(deleteRowId);
        return <UserActions1 {...{params, rowId, setRowId, deleteRowId, setIsRowDeleted, setModalOpenClass}}/>
    }}
], [rowId])

   const { data : pricesData, error, isLoading} = useQuery("prices", getPrices);
//    console.log(pricesData);


   async function deletePrice(){
    const response = await axios.delete(`http://localhost:9000/api/prices/${deleteRowId}`);
    return response.data;
    }

    const {mutate: deleteMutate} = useMutation(deletePrice, {
        onSuccess: (data) => {
            console.log(data)
            queryClient.refetchQueries("prices");
            setModalOpenClass("popup-modal")
        },
        onError: (err) => {
            console.log(err)
        }
    })

    async function handleDelete() {
        // deleteRow(params.row._id);
        deleteMutate();
        // await queryClient.refetchQueries("prices");
        console.log(deleteRowId);
    }

    

    return (
        <Container>
            <div>
                <h3>Prices</h3>
                <AdminProfile>
                  <img src={adminImage}></img>
                  <div>
                    <h3>{admin.firstName} {admin.lastName}</h3>
                    <p>{admin.email}</p>
                  </div>
                </AdminProfile>
            </div>

            <PricesDiv>
                    <span className="btn-mask">Add Item</span>
                    <PricesLink to="/dashboard/prices/add-price">Add Item</PricesLink>
            </PricesDiv>

            <Box sx={{
                padding: "1rem",
                boxShadow: '0 0 16px 2px rgba(52, 52, 124, 0.1)',
                height: 420,
                maxWidth: "1000px",
                margin: "0 auto",
                border: "0 !important",
                outline: "0 !important",
                borderStyle: "0 !important",
                borderRadius: "10px",
                // boxShadow: "0 0 16px 5px rgb(140, 140, 140)",

                "& ::-webkit-scrollbar" : {
                    width: "10px",
                    height: "5px",
                  }
            }}>
                {/* <Typography 
                variant="h6" 
                component="h6"
                sx={{textAlign: "center", mt: 3, mb:3,color: secondary, fontWeight: 600}}
                >
                    Users
                </Typography> */}
                {pricesData ? (
            <DataGrid

            sx={{
                border: "0",
                outline: "0",
                borderStyle: "0",
                background: "#fff",
                '& .MuiDataGrid-row:hover': {
                //   color: '#fff',
                background: "rgb(250, 250, 250)",
                },
                '& .MuiDataGrid-row': {
                    //   color: '#fff',
                // "&:nth-child(odd)": {
                    // background: "#E9B6091b",

                    "&:hover" : {
                        background: "#E9B6091b"
                    }
                  // },
                },

                "&:nth-child(1)" : {
                    textAlign: 'center'
                },

                ":first-child" : {
                    textAlign: 'center'
                }
              }}
                columns={columns}
                rows={pricesData}
                getRowId={(row) => row._id}
                // pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  getRowClassName={(params) => `super-app-theme--${params.row.status}`}
                //   onCellEditCommit={(params) => {
                //     const rowId = params.api.getRowId(params.rowIndex);
                //     setRowId(rowId);
                //   }}
                onCellEditStop={(params) => setRowId(params.id)}
                  
                // ={params => ({
                //     top: params.isFirstVisible ? 0 : 5,
                //     bottom: params.isLastVisible ? 0 : 5
                // })}
            />
      ) : (
        <Typography>Loading...</Typography>
      )}
            </Box>
            <ServiceModal className={modalOpenClass}>

        <PopUpModal className="modal">
            <h2 style={{marginBottom: "1rem", color: gray}}>Are you sure you want to delete this price item?</h2>
            <div className="btn-controls">
                <button onClick={() => setModalOpenClass("popup-modal")}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            
        </PopUpModal>

        </ServiceModal>
        </Container>
    )
}

const primary =  "#34CCA1";
const secondary = "#34CCA1";
const bg = "#F4F4F4";
const borderRad = "5px";
const gray = "#04040A";
const lightGray = "#7A8C87"
const yellowBtnHover = "rgb(230, 230, 230)";

const Container = styled.div`
    flex: 1;
    // border: solid 2px red;
    max-width: 100%;
    overflow-x: hidden;
    // display: flex;
    // align-items: center;
    background: hsl(237, 36%, 100%);
    margin-left: 12.8rem;
    padding: 1rem;

    .popup-modal.active{
        scale: 1;
        transition: all .3s ease-in-out;
    }

    >div:first-child{
        // margin-bottom: 2rem;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media screen and (max-width: 990px) {
            padding: 0.9rem 1.2rem;
        }

        >h3{
            color: ${secondary};
            font-size: 1.7rem;
            font-weight: bold;
        }
    }

    @media screen and (max-width: 990px) {
        margin-left: 0;
        padding: 1rem;
        margin-top: 1rem;
    }
`

// const TableContainer = styled.div`
//    /* overflow-x: auto; */
//    width: 95%; 
// `;

// const Table = styled.table`
//   border-collapse: collapse;
//   width: 100%;
//   width: 1600px; // ======== come here
//   overflow: scroll;
//   cursor: pointer;


// `;

// const TableRow = styled.tr`
//   display: flex;
// `;

// const TableHeader = styled.th`
//   padding: 8px;
//   background-color: #f2f2f2;
//   flex: 0 0 auto;
//   height: 50px;
//   width: 200px;

//   &:nth-child(1) {
//     /* position: sticky;
//     left: 0;
//     z-index: 2;
//     background-color: #f2f2f2; */

//     width: 160px;
//     height: 20px;
//     position: absolute;
//     z-index: 2;

//   }
// `;

// const TableCell = styled.td`
//   padding: 8px;
//   border: 1px solid #ddd;
//   flex: 0 0 auto;
//   width: 200px;
//   height: 40px;
//   text-align: center;

//   &:nth-child(1) {
//     /* position: sticky;
//     left: 0;
//     z-index: 1;
//     background-color: #f2f2f2; */
//     width: 110px;
//     position: absolute;
//     z-index: 2;

//   }

//   &:nth-child(1) {
//     /* position: sticky;
//     left: 0;
//     z-index: 1;
//     background-color: #f2f2f2; */
//     width: 200px;
//   }
// `;


const AdminProfile = styled.div`
    /* border: solid 2px green; */
    text-align: center;
    display: flex;
    align-items: center;
    gap: 0.6rem;

    img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    p{
        color: ${gray};
    }

    @media screen and (max-width: 990px) {
        display: none;
    }

    div{
      h3{
        font-size: 1rem;
        text-align: start;
      }
    }
`

const PricesDiv = styled.div`
    text-align: end;
    width: 100%;
    padding: 2rem 0;
    position: relative;
    /* margin-top: 1rem; */
    padding-right: 2rem;


    .btn-mask{
        border-radius: ${borderRad};
        position: absolute;
        color: ${secondary};
        text-align: center;
        position: absolute;
        border: solid 2px ${secondary};
        text-decoration: none;
        padding: 15px 20px;
        top: 50%;
        transform: translateY(-50%);
    }
    
    @media (max-width: 568px) {
        width: 100%;
    }
`

const PricesLink = styled(Link)`
    width: 100%;
    position: relative;
    text-decoration: none;
    color: #fff;
    padding: 15px 20px;
    -webkit-mask: url(${require("../assets/images/btn-mask.png")});
    mask: url(${require("../assets/images/btn-mask.png")});
    -webkit-mask-size: 3000% 100%;
    mask-size: 3000% 100%;
    border: solid 2px ${secondary};
    border-radius: ${borderRad};
    -webkit-animation: ani2 0.7s steps(29) forwards;
    animation: ani2 0.7s steps(29) forwards;
    cursor: pointer;
    background-color: transparent;
    color: ${secondary};
    
    &:hover{
        color: #fff;
        background: ${secondary};
        font-weight: "bold";
    }


   
    @keyframes ani {
        from{
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
        }
        to{
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0%;
        }
    }

    @keyframes ani2{
        from{
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
        }
        to{
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
        }
    }

    

`

const ServiceModal = styled.div`
    position: fixed;
    z-index: 999999999999999999999;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    scale: 0;
    transition: all .3s ease-in-out;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const PopUpModal = styled.div`
    background-color: ${bg};
    border-radius: ${borderRad};
    width: 50%;
    padding: 1rem;
    max-height: 450px;
    overflow: auto;

    @media screen and (max-width: 1000px) {
        width: 80%;
    }

    @media screen and (max-width: 515px) {
        width: 90%;
    }

    @media screen and (max-width: 415px) {
        width: 95%;
    }

    
        .btn-controls{
            display: flex;
            align-items: center;
            gap: 1rem;

            button:first-child{
                background-color: ${secondary};
                padding: 0.4rem 1.2rem;
                outline: none;
                border: none;
                color: #fff;
                border-radius: ${borderRad};
                cursor: pointer;
                &:hover{
                    background-color: ${yellowBtnHover};
                }
            }

            button:last-child{
                background-color: red;
                padding: 0.4rem 1.2rem;
                outline: none;
                border: none;
                color: #fff;
                border-radius: ${borderRad};
                cursor: pointer;

                &:hover{
                    background-color: tomato;
                }
            }
        }

        &::-webkit-scrollbar {
        width: 10px;
        height: 12px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #C1C1C1;
        border-radius: 6px;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #858488;
      }
`
