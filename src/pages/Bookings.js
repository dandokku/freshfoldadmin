import React from "react";
import style from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import {Box, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
// import { darken, lighten, styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BookingStatus from "./BookingsStatus";

import adminImage from "../pages/assets/images/about2.jpg"



export default function Bookings() {

    const admin = useSelector(state => state.admin);


    async function getUser(){
        const response = await axios.get("https://freshfoldserver.onrender.com/api/bookings");
        return response.data
   }

   function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
  
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
  
    const months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
  
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
  
    const formatted = `${months[month]} ${day}, ${year}`;
    return formatted;
  }

   const [pageSize, setPageSize] = React.useState(5);
   const [rowId, setRowId] = React.useState(null);


   const columns = React.useMemo(() => [
        {field: "_id", headerName: "Booking Id", width: 220, maxWidth: 220},
        {field: "user.firstName", headerName: "User Id", width: 170, maxWidth: 170, valueGetter: (params) => params.row.user._id},
        {
            field: "items",
            headerName: "Items",
            width: 200,
            renderCell: (params) => {
              const items = params.value || [];
              const firstItem = items[0];
              const itemCount = items.length;
              return (
                <div style={{ margin: "0.1rem" }}>
                    {
                        itemCount > 1 ? <span>{firstItem?.label} and {itemCount - 1} more</span> :
                        <span>{firstItem?.label}</span>
                    }
                </div>
              );
            },
        },
        {field: "itemsTotalPrice", headerName: "Total Price", width: 170, maxWidth: 170, renderCell: (params) => {
            return (
                <div>$ {params.row.itemsTotalPrice}</div>
            )
        }},
        {field: "bookingDate", headerName: "Booking Date", width: 200, maxWidth: 170, renderCell: (params) => {
            return (
                <div>{formatDate(params.row.bookingDate)}</div>
            )
        }},
        {field: "pickUpDate", headerName: "Pickup Date", width: 200, maxWidth: 170, renderCell: (params) => {
            return (
                <div>{formatDate(params.row.pickUpDate)}</div>
            )
        }},
        {field: "deliveryDate", headerName: "Delivery Date", width: 200, maxWidth: 170, renderCell: (params) => {
            return (
                <div>{formatDate(params.row.deliveryDate)}</div>
            )
        }},
          {field: "status", headerName: "Status", width: 170, maxWidth: 170, type:"singleSelect", valueOptions: (params) => params.row.status !== "Canceled" ? ["Pending", "In progress", "Completed"] : [], editable: true, renderCell: (params) => {
            const status = params.row.status;
        
            return (
              <div
                style={{
                  padding: "0.5rem 1rem",
                    background:
                      status === "Pending"
                        ? "#8ac5b4"
                        : status === "In progress"
                        ? "#6aaa98"
                        : status === "Completed"
                        ? "#33cca1"
                        : "cyan",
                  color: "#fff",
                  borderRadius: "5px"
                }}
              >
                {params.row.status}
              </div>
            );
          }},  
          {
            field: "actions",
            headerName: "Actions",
            width: 170,
            maxWidth: 170,
            renderCell: (params) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    <BookingStatus {...{params, rowId, setRowId}}/>
                    <Link to={`/dashboard/bookings/${params.row._id}`} style={{background: secondary, color: "#fff", textDecoration: "none", padding: "0.5rem 1rem", borderRadius: "5px"}}>
                    View
                    </Link>
                </div>
              
            ),
          }, 
        //   {field: "save", headerName: "Save", type: "actions", renderCell: params => {
        //     return <BookingStatus {...{params, rowId, setRowId}}/>
        // }}     
   ], [rowId])

  //  console.log(rowId)

   const { data : bookingsData, error, isLoading} = useQuery("bookings", getUser);
  //  console.log(bookingsData);




    return (
        <Container>
            <div>
                <h3>Bookings</h3>
                <AdminProfile>
                  <img src={adminImage}></img>
                  <div>
                    <h3>{admin.firstName} {admin.lastName}</h3>
                    <p>{admin.email}</p>
                  </div>
                </AdminProfile> 
            </div>

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
                {bookingsData ? (
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
                rows={bookingsData}
                getRowId={(row) => row._id}
                // pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  getRowClassName={(params) => `super-app-theme--${params.row.status}`}
                  onCellEditStop={(params) => setRowId(params.id)}
                //   onCellEditCommit={(params) => setRowId(params.id)}
            />
      ) : (
        <Typography>Loading...</Typography>
      )}
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

const Container = style.div`
    flex: 1;
    // border: solid 2px red;
    max-width: 100%;
    overflow-x: hidden;
    // display: flex;
    // align-items: center;
    background: hsl(237, 36%, 100%);
    margin-left: 12.8rem;
    padding: 1rem;

    >div:first-child{
        // margin-bottom: 2rem;
        padding: 2.5rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        

        @media screen and (max-width: 990px) {
            padding: 0.9rem 1.2rem;
        }

        >h3{
            color: #33cca1;
            font-weight: bold;
            font-size: 1.7rem;
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


const AdminProfile = style.div`
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

    div{
        h3{
          font-size: 1rem;
          text-align: start;
        }
      }

    @media screen and (max-width: 990px) {
        display: none;
    }
`
