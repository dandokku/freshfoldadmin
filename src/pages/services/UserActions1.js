import { Box, CircularProgress, Fab } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { FaSave, FaCheck, FaTrash } from "react-icons/fa";
import { useMutation } from "react-query";
import axios from "axios";

export default function UserActions1({
  params,
  rowId,
  setRowId,
  deleteRowId,
  setDeleteRowId,
  setIsRowDeleted,
  setModalOpenClass,
}) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  async function updateService(price) {
    const response = await axios.put(
      `https://freshfoldserver.onrender.com/api/services/${rowId}`,
      price
    );
    return response.data;
  }

  const { mutate } = useMutation(updateService, {
    onSuccess: (data) => {
      setSuccess(true);
      setRowId(null);
      setLoading(false);
    },
    onError: (err) => console.log(err),
  });

  function handleSubmit() {
    setLoading(true);
    setTimeout(() => {
      const { serviceContent, description, serviceName, image } = params.row;

      if (rowId === params.row._id) {
        mutate({
          serviceName: serviceName,
          description: description,
          serviceContent: serviceContent,
        });
      }
    }, 2000);
  }

  React.useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  const handleOpenModal = () => {
    setDeleteRowId(params.row._id);
    setModalOpenClass("popup-modal");
  };

  return (
    <Container>
      <Box
        sx={{
          m: 1,
          position: "relative",
        }}
      >
        {success ? (
          <Fab
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#34CCA1",
            }}
          >
            <FaCheck color="#fff" />
          </Fab>
        ) : (
          <Fab
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#34CCA1",
              "&:hover": {
                bgcolor: "#2cb38e",
              },
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            <FaSave />
          </Fab>
        )}

        <Fab
          color="warning"
          sx={{ width: 40, height: 40, marginLeft: "0.5rem" }}
          disabled={loading}
          onClick={() => {
            setDeleteRowId(params.row._id); // Corrected: set the ID of row to delete
            setModalOpenClass("popup-modal active"); // Open modal
          }}
        >
          <FaTrash />
        </Fab>

        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: "#34CCA1",
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Container>
  );
}

const Container = styled.div`
  /* Optional styling */
`;
