import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import {FaBars} from "react-icons/fa"

export default function SharedLayout() {

    const [openSideBar, setOpenSideBar] = React.useState("sidebar");

    function handleToggle(){
        if(openSideBar === "sidebar") setOpenSideBar("sidebar active")
        else setOpenSideBar("sidebar");
    }

    return (
        <Container>
            <Sidebar sidebar={openSideBar} setOpenSideBar={setOpenSideBar}/>
            <Outlet/>
            <FaBars size={30} className="bars" onClick={handleToggle} color="#fff"/>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    /* align-items: center; */

    .bars{
        position: absolute;
        top: 8%;
        right: 5%;
        /* left: 65%; */
        display: none;

        /* @media screen and (max-width: 1010px) {
            display: block;
        } */

        @media screen and (max-width: 990px) {
            display: block;
            /* left: 90%;
            top: 5%; */
        }
    }

    .sidebar{
        @media screen and (max-width: 990px) {
            transform: translateX(-110%);
            transition: all .3s linear;
            z-index: 9999999999;
            width: 200px;
        }

        @media screen and (max-width: 360px) {
            width: 170px;
        }
    }

    .sidebar.active{
        transform: translateX(0%);
        transition: all .3s linear;
    }

`
