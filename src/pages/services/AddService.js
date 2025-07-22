import React from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import adminImage from "../assets/images/about2.jpg";

export default function AddService() {
  const admin = useSelector(state => state.admin);
  const [fieldsData, setFieldsData] = React.useState({
    serviceName: "",
    description: "",
  });

  const [validateFieldsData, setValidateFieldsData] = React.useState({
    serviceName: "",
    description: "",
  });

  const [postResponse, setPostResponse] = React.useState("");
  const [failResponse, setFailResponse] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFieldsData.serviceName && !validateFieldsData.description) {
      mutate(fieldsData);
    }
  };

  const postService = async (service) => {
    const response = await axios.post("https://freshfoldserver.onrender.com/api/services", service);
    return response.data;
  };

  const { mutate } = useMutation(postService, {
    onSuccess: () => {
      setPostResponse("Service added successfully");
      setFailResponse("");
      setFieldsData({ serviceName: "", description: "" });
    },
    onError: (err) => {
      setPostResponse("");
      setFailResponse(err.response?.data || "Failed to add service");
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const validateFields = { ...validateFieldsData };
    setPostResponse("");

    setFieldsData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validation logic
    if (name === "serviceName") {
      if (/[@#$!^%*0-9]/.test(value) || !value.trim()) {
        validateFields.serviceName = "Service name cannot contain numbers or special characters";
      } else {
        validateFields.serviceName = "";
      }
    }

    if (name === "description") {
      if (value.length > 200) {
        validateFields.description = "Description cannot exceed 200 characters";
      } else {
        validateFields.description = "";
      }
    }

    setValidateFieldsData(validateFields);
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Add New Service</h2>
        <AdminProfile>
          <img src={adminImage} alt="Admin" />
          <div>
            <h3>{admin.firstName} {admin.lastName}</h3>
            <p>{admin.email}</p>
          </div>
        </AdminProfile>
      </DashboardHeader>

      <FormContainer>
        <ServiceForm onSubmit={handleSubmit}>
          {postResponse && <SuccessMessage>{postResponse}</SuccessMessage>}
          {failResponse && <ErrorMessage>{failResponse}</ErrorMessage>}

          <FormGroup>
            <Label htmlFor="serviceName">Service Name</Label>
            <Input
              id="serviceName"
              name="serviceName"
              type="text"
              value={fieldsData.serviceName}
              onChange={handleInputChange}
              required
            />
            {validateFieldsData.serviceName && (
              <ValidationError>{validateFieldsData.serviceName}</ValidationError>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              value={fieldsData.description}
              onChange={handleInputChange}
              rows="4"
              required
            />
            {validateFieldsData.description && (
              <ValidationError>{validateFieldsData.description}</ValidationError>
            )}
          </FormGroup>

          <SubmitButton type="submit">
            Save Service
          </SubmitButton>
        </ServiceForm>
      </FormContainer>
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

const FormContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  max-width: 800px;
  margin: 0 auto;
`;

const ServiceForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #343a40;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #34CCA1;
    box-shadow: 0 0 0 2px rgba(52, 204, 161, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #34CCA1;
    box-shadow: 0 0 0 2px rgba(52, 204, 161, 0.2);
  }
`;

const ValidationError = styled.span`
  color: #dc3545;
  font-size: 0.8rem;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  background-color: rgba(40, 167, 69, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  background: #34CCA1;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  margin-top: 1rem;

  &:hover {
    background: #2bb38d;
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;