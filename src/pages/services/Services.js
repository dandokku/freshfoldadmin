import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import UserActions1 from "./UserActions1";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import adminImage from "../assets/images/about2.jpg";

export default function Services() {
  const queryClient = useQueryClient();
  const admin = useSelector(state => state.admin);
  const [pageSize, setPageSize] = React.useState(5);
  const [rowId, setRowId] = React.useState(null);
  const [isRowDeleted, setIsRowDeleted] = React.useState(false);
  const [modalOpenClass, setModalOpenClass] = React.useState("popup-modal");
  const [deleteRowId, setDeleteRowId] = React.useState();

  // Fetch services data
  const { data: servicesData, isLoading } = useQuery("services", async () => {
    const response = await axios.get("http://localhost:9000/api/services");
    return response.data;
  });

  // Delete service mutation
  const { mutate: deleteMutate } = useMutation(
    async () => {
      const response = await axios.delete(`http://localhost:9000/api/services/${deleteRowId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries("services");
        setModalOpenClass("popup-modal");
      },
      onError: (err) => {
        console.log(err);
      }
    }
  );

  // Handle delete confirmation
  const handleDelete = () => {
    deleteMutate();
  };

  // DataGrid columns
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "serviceName", headerName: "Service Name", width: 170, editable: true },
    { field: "description", headerName: "Description", width: 250, editable: true },
    {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <UserActions1
            params={params}
            rowId={rowId}
            setRowId={setRowId}
            setDeleteRowId={setDeleteRowId}
            setIsRowDeleted={setIsRowDeleted}
            setModalOpenClass={setModalOpenClass}
          />
        )
      }
      
  ];

  return (
    <DashboardContainer>
      {/* Header Section */}
      <DashboardHeader>
        <h2>Services Management</h2>
        {/* <AdminProfile>
          <img src={adminImage} alt="Admin" />
          <div>
            <h3>{admin.firstName} {admin.lastName}</h3>
            <p>{admin.email}</p>
          </div>
        </AdminProfile> */}
      </DashboardHeader>

      {/* Add Service Button */}
      <AddServiceButton to="/dashboard/services/add-service">
        Add New Service
      </AddServiceButton>

      {/* Services DataGrid */}
      <DataGridContainer>
        {isLoading ? (
          <Typography>Loading services...</Typography>
        ) : servicesData ? (
          <DataGrid
            columns={columns}
            rows={servicesData}
            getRowId={(row) => row._id}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } }}}
            pageSizeOptions={[5, 10, 25]}
            onCellEditStop={(params) => setRowId(params.id)}
            sx={{
              border: "none",
              '& .MuiDataGrid-row:hover': {
                backgroundColor: "rgba(52, 204, 161, 0.1)",
              },
            }}
          />
        ) : (
          <Typography>No services found</Typography>
        )}
      </DataGridContainer>

      {/* Delete Confirmation Modal */}
      <ServiceModal className={modalOpenClass}>
        <PopUpModal>
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete this service?</p>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={() => setModalOpenClass("")}>
              Cancel
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </PopUpModal>
      </ServiceModal>
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

const AddServiceButton = styled(Link)`
  display: inline-block;
  background: #34CCA1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: all 0.2s ease;

  &:hover {
    background: #2bb38d;
    transform: translateY(-2px);
  }
`;

const DataGridContainer = styled(Box)`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: 500px;
  width: 100%;
`;

const ServiceModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;

  &.popup-modal {
    opacity: 1;
    pointer-events: auto;
  }
`;

const PopUpModal = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  h3 {
    color: #343a40;
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  p {
    color: #6c757d;
    margin-bottom: 2rem;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    button {
      padding: 0.5rem 1.5rem;
      border-radius: 5px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .cancel-btn {
      background: #f8f9fa;
      color: #343a40;
      border: 1px solid #dee2e6;

      &:hover {
        background: #e9ecef;
      }
    }

    .delete-btn {
      background: #dc3545;
      color: white;
      border: none;

      &:hover {
        background: #c82333;
      }
    }
  }

  @media (max-width: 576px) {
    width: 95%;
    padding: 1.5rem;
  }
`;