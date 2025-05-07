import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FaSoap } from "react-icons/fa";

export default function Home() {
  const admin = useSelector((state) => state.admin);

  return (
    <Container>
      <Header>
        <Nav>
          <Logo to="/">
            Fresh
            <span className="fold-icon">
              F <FaSoap size={28} /> ld
            </span>
          </Logo>
        </Nav>
      </Header>

      <HeroSection>
        <Content>
          <h1>FreshFold Admin</h1>
          <p>
            Manage your laundry bookings with ease. As an admin, you have full control over services, prices, and customer bookings. Streamline your laundry operations with our powerful admin panel.
          </p>
          {admin?.id !== null ? (
            <ActionWrapper>
              <ActionButton to="/dashboard">Go to Dashboard</ActionButton>
            </ActionWrapper>
          ) : (
            <ActionWrapper>
              <ActionButton to="/login">Login</ActionButton>
            </ActionWrapper>
          )}
        </Content>
      </HeroSection>
    </Container>
  );
}

// Theme variables
const primary = "#34CCA1";
const gray = "#04040A";
const borderRad = "8px";

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const Header = styled.header`
  width: 100%;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  position: fixed;
  z-index: 50;
  top: 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 2rem;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  color: ${gray};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  .fold-icon {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    color: ${primary};
    font-size: 1.7rem;
  }

  @media (max-width: 640px) {
    font-size: 1.4rem;
    .fold-icon {
      font-size: 1.3rem;
    }
  }
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
    url(${require("./assets/images/work-laundry.jpg")});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 10rem 2rem 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  max-width: 700px;
  text-align: center;
  color: white;

  h1 {
    font-size: 2.5rem;
    color: ${primary};
    margin-bottom: 1.2rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ActionButton = styled(Link)`
  padding: 0.9rem 2rem;
  background-color: ${primary};
  color: white;
  border: none;
  border-radius: ${borderRad};
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background-color: white;
    color: ${primary};
    border: 2px solid ${primary};
  }
`;
