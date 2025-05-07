import React from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import adminImage from "../assets/images/about2.jpg";

export default function AddPrice() {
  const admin = useSelector(state => state.admin);
  const [formData, setFormData] = React.useState({
    name: "",
    group: "",
    price: ""
  });

  const [errors, setErrors] = React.useState({
    name: "",
    group: "",
    price: ""
  });

  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.name && !errors.group && !errors.price) {
      mutate(formData);
    }
  };

  const postPrice = async (price) => {
    const response = await axios.post("http://localhost:9000/api/prices", price);
    return response.data;
  };

  const { mutate } = useMutation(postPrice, {
    onSuccess: () => {
      setSuccessMessage("Price item added successfully");
      setErrorMessage("");
      setFormData({ name: "", group: "", price: "" });
    },
    onError: (err) => {
      setSuccessMessage("");
      setErrorMessage(err.response?.data || "Failed to add price item");
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    setSuccessMessage("");

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validation
    if (name === "name") {
      if (/[@#$!^%*0-9]/.test(value) || !value.trim()) {
        newErrors.name = "Item name cannot contain numbers or special characters";
      } else {
        newErrors.name = "";
      }
    }

    if (name === "group") {
      if (value.length > 30) {
        newErrors.group = "Group cannot exceed 30 characters";
      } else {
        newErrors.group = "";
      }
    }

    if (name === "price") {
      if (value > 1000) {
        newErrors.price = "Price cannot exceed $1000";
      } else {
        newErrors.price = "";
      }
    }

    setErrors(newErrors);
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Add New Price Item</h2>
        <AdminProfile>
          <img src={adminImage} alt="Admin" />
          <div>
            <h3>{admin.firstName} {admin.lastName}</h3>
            <p>{admin.email}</p>
          </div>
        </AdminProfile>
      </DashboardHeader>

      <FormContainer>
        <PriceForm onSubmit={handleSubmit}>
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

          <FormRow>
            <FormGroup>
              <Label htmlFor="name">Item Name*</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <ValidationError>{errors.name}</ValidationError>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="group">Group*</Label>
              <Input
                id="group"
                name="group"
                type="text"
                value={formData.group}
                onChange={handleInputChange}
                required
              />
              {errors.group && <ValidationError>{errors.group}</ValidationError>}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="price">Price ($)*</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              max="1000"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            {errors.price && <ValidationError>{errors.price}</ValidationError>}
          </FormGroup>

          <SubmitButton type="submit">
            Add Price Item
          </SubmitButton>
        </PriceForm>
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

const PriceForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  flex: 1;
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

  &[type="number"] {
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
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
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
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