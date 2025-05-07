import React from "react";
import {styled} from "styled-components"
import { Link, NavLink, useMatch } from "react-router-dom";
import { ImPriceTags } from "react-icons/im";
import { FaHandsWash } from "react-icons/fa";
import { MdLibraryBooks, MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FaSoap } from 'react-icons/fa';
import { useSelector } from "react-redux";
import adminImage from "../pages/assets/images/about2.jpg";

export default function Sidebar({ sidebar }) {
    const admin = useSelector(state => state.admin);

    const navLinkStyles = ({ isActive }) => ({
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
        fontWeight: isActive ? '600' : '400'
    });

    const matchProfile = useMatch('/dashboard');
    const matchUsers = useMatch('/dashboard/users/*');
    const matchBookings = useMatch('/dashboard/bookings/*');
    const matchPrices = useMatch('/dashboard/prices/*');
    const matchServices = useMatch('/dashboard/services/*');

    return (
        <Container className={sidebar}>
            {/* Logo Section */}
            <LogoSection>
                <Link to='/'>
                    <span className='flex items-center text-2xl font-bold'>
                        <span className="text-white">Fresh</span>
                        <span className='flex text-white'>
                            F <FaSoap className="mx-1" size={24} /> ld
                        </span>
                    </span>
                </Link>
            </LogoSection>

            {/* Admin Profile */}
            <AdminProfile>
                <img src={adminImage} alt="Admin" className="w-12 h-12 rounded-full object-cover" />
                <div className="text-center">
                    <h3 className="text-white font-medium">{admin.firstName} {admin.lastName}</h3>
                    <p className="text-white text-opacity-70 text-sm">{admin.email}</p>
                </div>
            </AdminProfile> 

            {/* Navigation Links */}
            <NavLinks>
                <NavItem isActive={matchProfile} to="/dashboard" style={navLinkStyles}>
                    <MdDashboard size={20} className="flex-shrink-0" />
                    <span>Dashboard</span>
                </NavItem>

                <NavItem isActive={matchUsers} to="/dashboard/users" style={navLinkStyles}>
                    <HiUsers size={20} className="flex-shrink-0" />
                    <span>Users</span>
                </NavItem>

                <NavItem isActive={matchBookings} to="/dashboard/bookings" style={navLinkStyles}>
                    <MdLibraryBooks size={20} className="flex-shrink-0" />
                    <span>Bookings</span>
                </NavItem>

                <NavItem isActive={matchPrices} to="/dashboard/prices" style={navLinkStyles}>
                    <ImPriceTags size={20} className="flex-shrink-0" />
                    <span>Prices</span>
                </NavItem>

                <NavItem isActive={matchServices} to="/dashboard/services" style={navLinkStyles}>
                    <FaHandsWash size={20} className="flex-shrink-0" />
                    <span>Services</span>
                </NavItem>
            </NavLinks>
        </Container>
    )
}

// Styled Components
const Container = styled.div`
    width: 240px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: #34CCA1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
    z-index: 10;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
        transform: ${props => props.className === 'open' ? 'translateX(0)' : 'translateX(-100%)'};
        width: 260px;
    }
`;

const LogoSection = styled.div`
    padding: 0 1.5rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1.5rem;
`;

const AdminProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1.5rem 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 0.75rem;
        border: 2px solid rgba(255, 255, 255, 0.2);
    }

    h3 {
        color: white;
        font-size: 1rem;
        margin-bottom: 0.25rem;
    }

    p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.8rem;
    }
`;

const NavLinks = styled.nav`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    flex-grow: 1;
    overflow-y: auto;
`;

const NavItem = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s ease;
    color: ${props => props.style?.color || 'rgba(255, 255, 255, 0.8)'};
    background: ${props => props.style?.backgroundColor || 'transparent'};
    font-weight: ${props => props.style?.fontWeight || '400'};

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
    }

    span {
        font-size: 0.9rem;
        white-space: nowrap;
    }

    svg {
        flex-shrink: 0;
    }
`;