import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setLogOutDetails } from "./features/adminSlice";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import { BsChevronRight } from "react-icons/bs";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RevenueChart from "./RevenueChart";
import BookingTrendChart from "./BookingTrendChart";
import userImage from "../pages/assets/images/user_1177568.png";
import adminImage from "../pages/assets/images/about2.jpg";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const admin = useSelector(state => state.admin);

  // API Fetch Functions
  async function getBookings() {
    const response = await axios.get("http://localhost:9000/api/bookings");
    return response.data;
  }

  async function getLatestBookings() {
    const response = await axios.get("http://localhost:9000/api/bookings/recentBookings");
    return response.data;
  }

  async function getUser() {
    const response = await axios.get("http://localhost:9000/api/users");
    return response.data;
  }

  async function getRecentUsers() {
    const response = await axios.get("http://localhost:9000/api/users/recentUsers");
    return response.data;
  }

  // Data Queries
  const { data: bookingsData } = useQuery("bookings-length", getBookings);
  const { data: lastestBookingData } = useQuery("bookings-latest", getLatestBookings);
  const { data: usersData } = useQuery("users-length", getUser);
  const { data: recentUsersData } = useQuery("recent-users", getRecentUsers);

  // Calculate total profits
  let profits = 0;
  bookingsData?.forEach(booking => {
    profits += booking.itemsTotalPrice;
  });

  // Format recent users
  const recentUsers = recentUsersData?.map(user => (
    <Customer key={user._id}>
      <img src={userImage} alt="user" />
      <div>
        <h3>{user.firstName} {user.lastName}</h3>
        <p>{user.email}</p>
      </div>
    </Customer>
  ));

  // DataGrid columns
  const columns = [
    { field: "_id", headerName: "Booking ID", width: 220 },
    { field: "user.firstName", headerName: "User", width: 120, valueGetter: (params) => params.row.user.firstName },
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
            {itemCount > 1 ? `${firstItem?.label} and ${itemCount - 1} more` : firstItem?.label}
          </div>
        );
      },
    },
    { 
      field: "itemsTotalPrice", 
      headerName: "Price", 
      width: 120,
      renderCell: (params) => `$${params.row.itemsTotalPrice}`
    },
    { 
      field: "bookingDate", 
      headerName: "Date", 
      width: 150,
      renderCell: (params) => formatDate(params.row.bookingDate)
    },
    { 
      field: "status", 
      headerName: "Status", 
      width: 170,
      renderCell: (params) => {
        const status = params.row.status;
        const bgColor = {
          "Pending": "#8ac5b4",
          "In progress": "#6aaa98",
          "Completed": "#34CCA1"
        }[status] || "cyan";
        
        return (
          <StatusBadge bgColor={bgColor}>
            {status}
          </StatusBadge>
        );
      }
    }
  ];

  // Helper functions
  function formatDate(date) {
    if (!(date instanceof Date)) date = new Date(date);
    if (isNaN(date.getTime())) return "Invalid Date";
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  function logOut() {
    queryClient.removeQueries("admin");
    localStorage.removeItem("admin-jwt");
    dispatch(setLogOutDetails());
    navigate("/");
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Dashboard Overview</h2>
        {/* <AdminProfile>
          <img src={adminImage} alt="Admin" />
          <div>
            <h3>{admin.firstName} {admin.lastName}</h3>
            <p>{admin.email}</p>
          </div>
        </AdminProfile> */}
      </DashboardHeader>

      <StatsContainer>
        <StatCard bgColor="#34CCA1">
          <div>
            <p>Total Bookings</p>
            <h3>{bookingsData?.length}</h3>
          </div>
          <BookingTrendChart bookings={bookingsData}/>
        </StatCard>

        <StatCard bgColor="#ffffff">
          <div>
            <p>Total Users</p>
            <h3>{usersData?.length}</h3>
          </div>
        </StatCard>

        <StatCard bgColor="#34CCA1">
          <div>
            <p>Total Profits</p>
            <h3>${profits.toFixed(2)}</h3>
          </div>
        </StatCard>
      </StatsContainer>

      <ChartsContainer>
        <RevenueChartWrapper>
          <RevenueChart />
        </RevenueChartWrapper>
        
        <RecentUsersCard>
          <CardHeader>
            <h4>Recent Users</h4>
          </CardHeader>
          <UsersList>
            {recentUsers}
          </UsersList>
        </RecentUsersCard>
      </ChartsContainer>

      <LatestBookings>
        <h4>Latest Bookings</h4>
        <DataGridContainer>
          {lastestBookingData ? (
            <DataGrid
              columns={columns}
              rows={lastestBookingData}
              getRowId={(row) => row._id}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              pageSizeOptions={[5, 10, 25]}
              sx={{
                border: "none",
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: "rgba(52, 204, 161, 0.1)",
                },
              }}
            />
          ) : (
            <Typography>Loading...</Typography>
          )}
        </DataGridContainer>
      </LatestBookings>
    </DashboardContainer>
  );
}

// Styled Components
const DashboardContainer = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 240px;
  background: #f8f9fa;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: #343a40;
    font-size: 1.8rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const AdminProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  h3 {
    font-size: 1rem;
    color: #343a40;
    margin-bottom: 0.25rem;
  }

  p {
    color: #6c757d;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: ${props => props.bgColor};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.bgColor === '#ffffff' ? '#343a40' : 'white'};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    opacity: 0.9;
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
  }

  > div:first-child {
    flex: 1;
  }
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const RevenueChartWrapper = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const RecentUsersCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h4 {
    color: #343a40;
    font-size: 1.1rem;
    font-weight: 600;
  }

  p {
    display: flex;
    align-items: center;
    color: #6c757d;
    font-size: 0.875rem;
    gap: 0.25rem;
    cursor: pointer;

    &:hover {
      color: #34CCA1;
    }
  }
`;

const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  h3 {
    font-size: 0.875rem;
    color: #343a40;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.75rem;
    color: #6c757d;
  }
`;

const LatestBookings = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h4 {
    color: #343a40;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const DataGridContainer = styled.div`
  height: 450px;
  width: 100%;
`;

const StatusBadge = styled.div`
  padding: 0.5rem 1rem;
  background: ${props => props.bgColor};
  color: white;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
`;