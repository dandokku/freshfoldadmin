import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import {Avatar, Box, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
// import { darken, lighten, styled } from '@mui/material/styles';
import { useSelector } from "react-redux";
import userImage from "../pages/assets/images/user_1177568.png"
import adminImage from "../pages/assets/images/about2.jpg"


// const getBackgroundColor = (color, mode) =>
//   mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

// const getHoverBackgroundColor = (color, mode) =>
//   mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

// const getSelectedBackgroundColor = (color, mode) =>
//   mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

// const getSelectedHoverBackgroundColor = (color, mode) =>
//   mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   '& .super-app-theme--Open': {
//     backgroundColor: getBackgroundColor(theme.palette.info.main, theme.palette.mode),
//     '&:hover': {
//       backgroundColor: getHoverBackgroundColor(
//         theme.palette.info.main,
//         theme.palette.mode,
//       ),
//     },
//     '&.Mui-selected': {
//       backgroundColor: getSelectedBackgroundColor(
//         theme.palette.info.main,
//         theme.palette.mode,
//       ),
//       '&:hover': {
//         backgroundColor: getSelectedHoverBackgroundColor(
//           theme.palette.info.main,
//           theme.palette.mode,
//         ),
//       },
//     },
//   },
//   '& .super-app-theme--Filled': {
//     backgroundColor: getBackgroundColor(
//       theme.palette.success.main,
//       theme.palette.mode,
//     ),
//     '&:hover': {
//       backgroundColor: getHoverBackgroundColor(
//         theme.palette.success.main,
//         theme.palette.mode,
//       ),
//     },
//     '&.Mui-selected': {
//       backgroundColor: getSelectedBackgroundColor(
//         theme.palette.success.main,
//         theme.palette.mode,
//       ),
//       '&:hover': {
//         backgroundColor: getSelectedHoverBackgroundColor(
//           theme.palette.success.main,
//           theme.palette.mode,
//         ),
//       },
//     },
//   },
//   '& .super-app-theme--PartiallyFilled': {
//     backgroundColor: getBackgroundColor(
//       theme.palette.warning.main,
//       theme.palette.mode,
//     ),
//     '&:hover': {
//       backgroundColor: getHoverBackgroundColor(
//         theme.palette.warning.main,
//         theme.palette.mode,
//       ),
//     },
//     '&.Mui-selected': {
//       backgroundColor: getSelectedBackgroundColor(
//         theme.palette.warning.main,
//         theme.palette.mode,
//       ),
//       '&:hover': {
//         backgroundColor: getSelectedHoverBackgroundColor(
//           theme.palette.warning.main,
//           theme.palette.mode,
//         ),
//       },
//     },
//   },
//   '& .super-app-theme--Rejected': {
//     backgroundColor: getBackgroundColor(
//       theme.palette.error.main,
//       theme.palette.mode,
//     ),
//     '&:hover': {
//       backgroundColor: getHoverBackgroundColor(
//         theme.palette.error.main,
//         theme.palette.mode,
//       ),
//     },
//     '&.Mui-selected': {
//       backgroundColor: getSelectedBackgroundColor(
//         theme.palette.error.main,
//         theme.palette.mode,
//       ),
//       '&:hover': {
//         backgroundColor: getSelectedHoverBackgroundColor(
//           theme.palette.error.main,
//           theme.palette.mode,
//         ),
//       },
//     },
//   },
// }));

export default function Users() {

    async function getUser(){
        const response = await axios.get("http://localhost:9000/api/users");
        return response.data
   }

   const admin = useSelector(state => state.admin);


  //  const [pageSize, setPageSize] = React.useState(5);

   const columns = React.useMemo(() => [
        {field: "userImage", headerName: "Avatar", width: 70, maxWidth: 70, renderCell: params=><Avatar src={userImage}/>, sortable: false, filterable: false},
        {field: "firstName", headerName: "First Name", width: 170, maxWidth: 170},
        {field: "lastName", headerName: "Last Name", width: 170, maxWidth: 170},
        {field: "address", headerName: "Address", width: 200, maxWidth: 170},
        {field: "phoneNo", headerName: "Phone", width: 170, maxWidth: 170},
        {field: "email", headerName: "Email", width: 170, maxWidth: 170},
        {field: "_id", headerName: "Id", width: 220, maxWidth: 170},
   ], [])

   const { data : usersData, error, isLoading} = useQuery("users", getUser);
//    console.log(usersData);


  //  const containerRef = React.useRef(null);


    return (
        <Container>
            <div>
                <h3 className="text-secondaryColor font-bold">Users</h3>
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
                height: 420,
                maxWidth: "1000px",
                margin: "0 auto",
                border: "0 !important",
                outline: "0 !important",
                borderStyle: "0 !important",
                borderRadius: "10px",
                boxShadow: '0 0 16px 2px rgba(52, 52, 124, 0.1)',
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
                {usersData ? (
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
                rows={usersData}
                getRowId={(row) => row._id}
                // pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  getRowClassName={(params) => `super-app-theme--${params.row.status}`}
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
const bg = "#F4F4F4";
const borderRad = "5px";
const gray = "#04040A";
const lightGray = "#7A8C87"

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
            font-size: 1.7rem;
        }
    }

    @media screen and (max-width: 990px) {
        margin-left: 0;
        padding: 1rem;
        margin-top: 1rem;
    }
`



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
