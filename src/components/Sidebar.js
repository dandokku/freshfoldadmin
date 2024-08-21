import React from "react";
import { Link, NavLink, useMatch } from "react-router-dom";
import styled from "styled-components";
import {ImPriceTags} from "react-icons/im"
import {FaHandsWash} from "react-icons/fa"
import {MdLibraryBooks} from "react-icons/md"
import {HiUsers} from "react-icons/hi"
import {MdDashboard} from "react-icons/md"
import { FaSoap } from 'react-icons/fa';
import { useSelector } from "react-redux";
import adminImage from "../pages/assets/images/about2.jpg"


export default function Sidebar(props) {

    const [darkTheme, setDarkTheme] = React.useState(false);

    const admin = useSelector(state => state.admin);

    function navLinkStyles({isActive}){
        return {
            color: isActive ? `#ffffff` : `#ffffff`, // editted
            textDecoration: "none",
            position: "relative",
            letterSpacing: "1.6px",
            fontSize: "0.9rem",
            width: "100%",// ediitted
            // fontWeight: headerActive ? `bolder` : ``,
        }
    }

    const matchProfile = useMatch('/dashboard');
    const matchUsers = useMatch('/dashboard/users/*');
    const matchBookings = useMatch('/dashboard/bookings/*');
    const matchPrices = useMatch('/dashboard/prices/*');
    const matchServices = useMatch('/dashboard/services/*');
    // const matchManagement = useMatch('/profile/management');


    return (
        <Container className={props.sidebar}>
            <Link to='/' className="my-11">
                <span className='logo text-whiteColor font-bold text-3xl flex items-center max-sm:text-xl'>Fresh <span className='text-whiteColor flex '>F <span><FaSoap className="text-whiteColor" size={30} /></span> ld</span> </span>
            </Link>

            <AdminProfile>
                  <img src={adminImage} alt=""></img>
                  <div>
                    <h3>{admin.firstName} {admin.lastName}</h3>
                    <p>{admin.email}</p>
                  </div>
            </AdminProfile> 
            <SideLinks>
                {/* <Link to="/">Home</Link> */}
                {/* <SideUl> */}
                    <SideLink isActive={matchProfile} style={navLinkStyles} to="/dashboard">
                        <MdDashboard size={25}/>
                        <p>DashBoard</p>
                    </SideLink>
                {/* </SideUl> */}

                {/* <SideUl> */}
                    
                    <SideLink isActive={matchUsers} style={navLinkStyles} to="/dashboard/users">
                        <HiUsers size={25}/>
                        <p>Users</p>
                    </SideLink>
                {/* </SideUl> */}

                {/* <SideUl> */}
                    
                    <SideLink isActive={matchBookings} style={navLinkStyles} to="/dashboard/bookings">
                        <MdLibraryBooks size={25}/>
                        <p>Bookings</p>
                    </SideLink>
                {/* // </SideUl> */}

                {/* <SideUl> */}
                    
                    <SideLink isActive={matchPrices} style={navLinkStyles} to="/dashboard/prices">
                        <ImPriceTags size={25}/>
                        <p>Prices</p>
                    </SideLink>
                {/* </SideUl> */}

                {/* <SideUl> */}
                    
                    <SideLink isActive={matchServices} style={navLinkStyles} to="/dashboard/services">
                        <FaHandsWash size={25}/>
                        <p>Services</p>
                    </SideLink>
                {/* </SideUl> */}


            </SideLinks>
            {/* <button onClick={() => setDarkTheme(!darkTheme)}>Change Theme</button> */}
  
            {/* <NavLink to="/dashboard">Home</NavLink> */}
        </Container>
    )
}


const primary =  "#34CCA1";
const secondary = "#34CCA1";
// const bg = "#F4F4F4";
const borderRad = "5px";
const yellowBtnHover = "#f7cb39";
const gray = "#545454";


const Container = styled.div`
    flex: .22;
    /* border: solid 1px red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* padding: 1rem; */
    border-right: solid 1px rgb(230, 230, 230);
    /* border-right: ${(props) => (props.darkTheme ? "solid 1px rgb(230, 230, 230)" : "solid 1px rgb(230, 230, 230)")}; */
    height: 100vh;
    background: ${(props) => (props.darkTheme ? "#222222" : "#34CCA1")};
    position: fixed;
    width: 16%;
    overflow-x: hidden;
`

const SideLink = styled(NavLink)`
    color: ${props => (props.isActive ? props.darkTheme ?  "#fff" : "black" : "rgb(100, 100, 100)")};
    color: ${props => (props.isActive ? props.darkTheme ?  "#fff" : secondary : props.darkTheme ?  "rgb(150, 150, 150)" : "rgb(190, 190, 190)")};
    background: ${props => (props.isActive ? `#FCFCAC3b` : 'transparent')};
    text-decoration: none;
    position: relative;
    letter-spacing: 1.6px;
    font-size: 0.9rem;
    padding: 0.5rem 1.2rem;
    /* width: 100%; */
    display: flex;
    align-items: center;
    /* margin-left: 0; */
    gap: 0.5rem;
    text-align: center;
    /* font-weight: 600; */
    /* border: solid 2px green; */
    width: 100%;
    border-radius: 10px;
    margin-bottom: 1rem;


    svg{
        /* color: ${secondary}; */
        /* color: ${props => (props.isActive ? secondary : "#796d45")}; */
        /* color: ${props => (props.isActive ? props.darkTheme ?  "#fff" : secondary : props.darkTheme ?  "rgb(200, 200, 200)" : "#E9B6096b")}; */
    }

    p{
        font-size: 0.8rem;
    }
/* 

  div{
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 300ms ease;
  } */


  &:hover {
    div{
        /* margin-left: calc(1rem - 3px); */
        transition: all 300ms ease;
    }
  }


  /* ${props =>
    props.isActive &&
    `

  `} */
`;

const SideLinks = styled.div`
    /* padding: 1rem; */
    /* border: solid 2px rebeccapurple; */
    text-align: center;
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
    width: fit-content;
    /* width: 70%; */
`
const SideUl = styled.div`
    
`

const AdminProfile = styled.div`
    /* border: solid 2px green; */
    width: 100%;
    text-align: center;
    padding: 1rem;
    margin-bottom: 1rem;
    display: none;

    img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    @media screen and (max-width: 990px) {
        display: block;
    }

    p{
        color: ${gray};
    }
`

const Logo = styled.div`
    flex: .3;
    text-align: center;
    /* font-family: sparkle; */
    display: flex;
    justify-content: center;
    gap: 0.3rem;
    font-size: 1.2rem;
    align-items: center;
    margin-bottom: 0.5rem;
    /* border: solid 2px red; */
    background-color: ${primary};
    width: 100%;
    padding-bottom: 1rem;
    padding-top: 0.5rem;

    img{
        width: 30px;
        height: 30px;
    }

`

const LogoLink = styled(Link)`
    /* color: ${(props) => (props.active ? `${gray}` : `#fff`)}; */
    color: ${gray};
    color: ${props => (props.darkTheme ? "#fff" : "#fff")};
    font-size: 1.2rem;
    text-decoration: none;


    span:first-child{
        color: ${secondary};
    }

    span:last-child{
        color: ${secondary};
        font-size: 2.5rem;
    }
`
