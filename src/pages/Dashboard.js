import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setLogOutDetails } from "./features/adminSlice";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import {BsChevronRight} from "react-icons/bs"
import {Box, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import RevenueChart from "./RevenueChart";
import BookingTrendChart from "./BookingTrendChart";
import userImage from "../pages/assets/images/user_1177568.png"
import adminImage from "../pages/assets/images/about2.jpg"


export default function Dashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const admin = useSelector(state => state.admin);

    // ========= Getter functions for API
    async function getBookings(){
        const response = await axios.get("http://localhost:9000/api/bookings");
        return response.data
    }

    async function getLatestBookings(){
        const response = await axios.get("http://localhost:9000/api/bookings/recentBookings");
        return response.data
    }

    async function getUser(){
        const response = await axios.get("http://localhost:9000/api/users");
        return response.data
    }

    async function getRecentUsers(){
        const response = await axios.get("http://localhost:9000/api/users/recentUsers");
        return response.data
    }

    const { data : bookingsData} = useQuery("bookings-length", getBookings);
    const { data : lastestBookingData} = useQuery("bookings-latest", getLatestBookings);

    let profits = 0;

    // ========= Getting the total Price of the booking Data
    bookingsData?.forEach(booking => {
        profits += booking.itemsTotalPrice;
    })



    const { data : usersData} = useQuery("users-length", getUser);
    const { data : recentUsersData} = useQuery("recent-users", getRecentUsers, {
        // onSuccess: (data) => console.log(data)
    });

    const recentUsers = recentUsersData?.map(user => {
        return <Customer>
        <div>
            <img src={userImage} alt="user-working"></img>
        </div>
        <div>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
        </div>
    </Customer>
    })

    const columns = React.useMemo(() => [
        {field: "_id", headerName: "Booking Id", width: 220, maxWidth: 220},
        {field: "user.firstName", headerName: "User", width: 120, maxWidth: 120, valueGetter: (params) => params.row.user.firstName},
        {
            field: "items",
            headerName: "Items",
            width: 170,
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
        {field: "itemsTotalPrice", headerName: "Price", width: 120, maxWidth: 120, renderCell: (params) => {
            return (
                <div>$ {params.row.itemsTotalPrice}</div>
            )
        }},
        {field: "bookingDate", headerName: "Booking Date", width: 150, maxWidth: 150, renderCell: (params) => {
            return (
                <div>{formatDate(params.row.bookingDate)}</div>
            )
        }},
          {field: "status", headerName: "Status", width: 170, maxWidth: 170, type:"singleSelect", valueOptions: ["Pending", "In progress", "Completed"],  renderCell: (params) => {
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
   ], [])
    
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

    function logOut(){
        queryClient.removeQueries("admin");
        localStorage.removeItem("admin-jwt");
        dispatch(setLogOutDetails());
        console.log("Logged Out");
        if(!localStorage.getItem("admin-jwt")){
            navigate("/");
        }
    }


    return (
        <Container className="p-5">
            <div>
                <h3 className="text-secondaryColor font-bold">DashBoard</h3>
                <AdminProfile>
                  <img src={adminImage}alt=""></img>
                  <div>
                    <h3>{admin.firstName} {admin.lastName}</h3>
                    <p>{admin.email}</p>
                  </div>
                </AdminProfile> 
            </div>
            <main className="main-container">
                {/* <div> */}
                    <TotalAchievements>
                        <TotalBookings>
                            <div>
                                <p className="text-whiteColor">Total Bookings</p>
                                <h3>{bookingsData?.length}</h3>
                            </div>
                            <BookingTrend>
                                <BookingTrendChart bookings={bookingsData}/>
                            </BookingTrend>
                        </TotalBookings>


                        <TotalCustomers>
                            <p className="text-textColor">Total Users</p>
                            <h3>{usersData?.length}</h3>
                        </TotalCustomers>


                        <TotalProfit>
                            <main>
                                <p>Total Profits</p>
                                <h3>${profits.toFixed(2)}</h3>
                            </main>
                        </TotalProfit>
                    </TotalAchievements>

                    <div className="revenue-recents">
                        <RevenueChart/>
                        <Recents>
                            <RecentCustomers>
                                <div>
                                    <h4>Recent Users</h4>
                                    {/* <p>View All <BsChevronRight size={15}/></p> */}
                                </div>
                                {recentUsers}
                            </RecentCustomers>

                            <RecentBookings>

                            </RecentBookings>
                        </Recents>
                    </div>

                    <Box sx={{
                        padding: "1rem",
                        boxShadow: '0 0 16px 2px rgba(52, 52, 124, 0.1)',
                        height: 450,
                        maxWidth: "1000px",
                        margin: "0 auto",
                        border: "0 !important",
                        outline: "0 !important",
                        borderStyle: "0 !important",
                        borderRadius: "10px",
                        marginTop: "3rem",
                        // boxShadow: "0 0 16px 5px rgb(140, 140, 140)",

                        "& ::-webkit-scrollbar" : {
                            width: "10px",
                            height: "5px",
                        }
                    }}>
                        <h4 style={{color: gray, marginBottom: "0.5rem"}}>Latest Bookings</h4>
                        {lastestBookingData ? (
                        <DataGrid

                        sx={{
                            border: "0",
                            outline: "0",
                            borderStyle: "0",
                            background: "#ffffff",
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
                            rows={lastestBookingData}
                            getRowId={(row) => row._id}
                            // pageSizeOptions={[5, 10, 20]}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5, 10, 25]}
                            getRowClassName={(params) => `super-app-theme--${params.row.status}`}
                            //   onCellEditCommit={(params) => setRowId(params.id)}
                        />
                        ) : (
                        <Typography>Loading...</Typography>
                        )}
                    </Box>

                {/* </div> */}
                
          </main>
           
            {/* <button onClick={logOut}>Log Out</button> */}
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
    flex: 1;
    // border: solid 2px red;
    max-width: 100%;
    overflow-x: hidden;
    // display: flex;
    // align-items: center;
    background: hsl(237, 36%, 100%);
    margin-left: 12.8rem;
    padding: 1rem;
    padding-bottom: 2rem;

    >div:first-child{
        // margin-bottom: 2rem;
        padding: 1.7rem 0 2rem;
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
        margin: 0;
        padding: 1rem;
        margin-top: 1rem;
    }

    .main-container{
        /* display: flex; */
        justify-content: center;
        gap: 2rem;

        >div:first-child{
            flex: 1;
        }

        .revenue-recents{
            margin-top: 2rem;
            display: flex;
            gap: 1rem;

            div{
            
            }

            @media screen and (max-width: 1100px) {
                flex-direction: column;

                /* div{
                    width: 80%;
                    margin: 0 auto;
                } */
            }
        }
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

const TotalAchievements = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
    flex: 1;
    margin: 0 auto;

    @media screen and (max-width: 1100px) {
        flex-direction: column;

        div{
            width: 80%;
            margin: 0 auto;
        }
    }

    div{
        transition: all .2s ease-in-out;
        height: fit-content;
    
        &:hover{
            transform: scale(1.01);
            transition: all .2s ease-in-out;
        }
    }
`


const TotalBookings = styled.div`
    padding: 1rem 0.5rem;
    background-color: ${primary};
    border-radius: ${borderRad};
    flex: 1;
    display: flex;

    p{
        font-size: 0.9rem;
        margin-bottom: 2rem;
    }

    h3{
        color: #fff;
    }

    div:first-child{
        flex: .5;
    }   
`

const TotalCustomers = styled.div`
    padding: 1.2rem 1rem;
    background-color: #fff;
    border-radius: ${borderRad};
    flex: 1;
    height: 100%;
    box-shadow: 0 0 16px 2px rgba(52, 52, 124, 0.1);
    /* display: flex; */
    /* align-items: center; */

    p{
        font-size: 0.9rem;
        margin-bottom: 2rem;
        width: 100%;
    }

    h3{
        color: ${primary};
    }

    &:hover{
        transform: scale(1.04);
        transition: all .2s ease-in-out;
    }

    /* div:first-of-type{
        flex: 1;
    }

    div:last-child{
        flex: .5;
        svg{
            color: #fff;
        }
    } */

`
const TotalProfit = styled.div`
    padding: 1.2rem;
    background-color: ${secondary};
    border-radius: ${borderRad};
    flex: 1;
    display: flex;
    align-items: center;

    p{
        font-size: 0.9rem;
        color: #fff;
        margin-bottom: 2rem;
    }

    h3{
        color: #fff;
    }

    main{
        flex: 1;
    }

`

const Recents = styled.div`
    flex: .42;
    color: black;
    /* border: solid 2px red; */
`

const BookingTrend = styled.div`
    flex: .7;
    width: 20%;
`

const RecentBookings = styled.div`

`

const RecentCustomers = styled.div`
    padding: 1rem;
    box-shadow: 0 0 16px 2px rgba(52, 52, 124, 0.1);
    border-radius: ${borderRad};
    
    >div:first-child{
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: space-between;

        h4{
            color: ${gray};
        }

        p{
            display: flex;
            align-items: center;
            font-size: 0.9rem;
            color: gray;
            gap: 0.5rem;
        }
    }
`

const Customer = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0.8rem;
    margin-bottom: 0.7rem;

    div{
        h3{
            color: ${gray};
            font-size: 0.88rem;
        }
        p{
            color: ${lightGray};
            font-size: 0.8rem;
        }
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
` 
