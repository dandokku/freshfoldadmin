import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FaSoap } from 'react-icons/fa';

export default function Home() {

    const admin = useSelector(state => state.admin);
    console.log({admin});

    return (
        <Container>
            <header cclassName="fixed z-40 w-full bg-whiteColor drop-shadow-sm text-center p-10">
                <div className='flex text-center'>
                    <Link to='/'>
                    <span className='logo text-secondaryColor font-bold text-3xl flex items-center max-sm:text-xl'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
                    </Link>
                </div>
            </header>

            
            <HeroSection>
                {/* <img src={require("./assets/images/work-laundry.jpg")}></img> */}
                <h1>Clean Cycle Admin</h1>
                <p>Manage your laundry bookings with ease. As an admin, you have full control over the booking system, including adding new services, managing prices, and monitoring customer bookings. Stay organized and streamline your laundry operations with our powerful admin panel. Happy managing!</p>
                {/* <Link to="/login">Login</Link>
                <Link to="/dashboard">Dashboard</Link> */}
                {
                    admin.id !== null ? 
                    <PricesDiv>
                    <span className="btn-mask">DashBoard</span>
                    <PricesLink to="/dashboard">DashBoard</PricesLink>
                    </PricesDiv> : 
                    <PricesDiv>
                        <span className="btn-mask">Login</span>
                        <PricesLink to="/login">Login</PricesLink>
                    </PricesDiv>
                }
                
                
            </HeroSection>            
        </Container>
    )
}


const primary =  "#34CCA1";
const secondary = "#34CCA1";
const bg = "#F4F4F4";
const borderRad = "5px";
const gray = "#04040A";
const lightGray = "#7A8C87"
const yellowBtnHover = "#f7cb39";

const Container = styled.div`
    flex: 1;


`

const NavBar = styled.div`

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
    margin: 0;

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


const HeroSection = styled.div`
    background-image: linear-gradient(#3d3d777e, #3d3d777e), url(${require("./assets/images/work-laundry.jpg")});
    background-size: cover;
    padding: 7rem 6rem;

    h1{
        color: ${secondary};
    }

    p{
        color: #fff;
        font-size: 1.1rem;
    }

    img{
        width: 100%;
        height: 70vh;
    }
`   

const PricesDiv = styled.div`
    text-align: center;
    width: 100%;
    padding: 2rem 0;
    position: relative;
    margin-top: 1rem;
    /* border: solid 2px red; */


    .btn-mask{
        border-radius: ${borderRad};
        position: absolute;
        color: ${secondary};
        text-align: center;
        position: absolute;
        border: solid 2px ${secondary};
        text-decoration: none;
        padding: 15px 30px;
        top: 50%;
        transform: translateY(-50%);
    }
    
    @media (max-width: 568px) {
        width: 100%;
    }
`

const PricesLink = styled(Link)`
    width: 100%;
    position: relative;
    text-decoration: none;
    color: #fff;
    background: ${secondary};
    padding: 15px 30px;
    -webkit-mask-size: 3000% 100%;
    mask-size: 3000% 100%;
    border: solid 2px ${secondary};
    border-radius: ${borderRad};
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(29) forwards;
    animation: ani2 0.7s steps(29) forwards;

    &:hover{
        background-color: white;
        color: ${secondary};
    }


   
    @keyframes ani {
        from{
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
        }
        to{
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0%;
        }
    }

    @keyframes ani2{
        from{
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
        }
        to{
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
        }
    }

    

`
