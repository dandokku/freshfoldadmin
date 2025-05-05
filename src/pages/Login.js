import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
// import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { CircularProgress } from "@mui/material";

export default function OldLogin() {


    const [ splashActive, setSplashActive ] = React.useState(false);
    const [showSplash, setShowSplash] = React.useState(false);
    const [confirmImageClass, setConfirmImageClass] = React.useState("completed-image");
    const [errorMessage, setErrorMessage] = React.useState("");

   async function postUser(fields){
    //NB So here i make a request to the server and past the data, after posting the data a jwt token is sent with the response as a header, so then i retrieve that header and store it in a local storage so that i can then make use of it in app.js and send it back to the server when trying to fetch data.
        const response = await axios.post("http://localhost:9000/api/admin-auth", {
  email: "kamidanokku1@gmail.com",
  password: "kami1"
});

        const authToken = response.headers['x-auth-admin-token'];
        localStorage.setItem("admin-jwt", JSON.stringify(authToken));
   }

   
   const navigate = useNavigate();
   
    const { mutate } = useMutation(postUser, {
    onError: (error) => {
        setErrorMessage(error.response.data);
    }
   });


    const [fieldsData, setFieldsData] = React.useState({
        email: "",
        password: ""
   });

   function handleFieldsChange(event){
        setFieldsData(oldFieldsData => {
            return {
                ...oldFieldsData,
                [event.target.name]: event.target.value
            }
        })
   }

   React.useEffect(() => {
    if(localStorage.getItem("admin-jwt")){
        setSplashActive(true)
        setShowSplash(true);
        if(splashActive){
            setTimeout(() => {
                setShowSplash(false);
                setConfirmImageClass("completed-image show");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000)
            }, 2000)
        }
    }
   }, [splashActive, navigate])

    function handleSubmit(event){
        event.preventDefault();
        mutate(fieldsData);
    }

    return (

        <Main isSplashActive={splashActive}>
            {
                splashActive ? 

                <div className="splash-screen">
                    <CircularProgress style={{display: showSplash ? "block" : "none", margin: " 0 auto", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: showSplash ? secondary : "#fff"}}/>
                    <img alt="" src={require("./assets/images/login-completed.svg").default} className={confirmImageClass}></img>
                </div>

                :

                <Container>
                <Logo>
                    <img alt="" src={require("./assets/images/icons8-soap.png")}></img>
                    <LogoLink to="/"><span>Clean</span>Cycle<span>.</span></LogoLink>
                </Logo>
    
                <LoginForm>
            
                    
                    <LoginImage>
                        <div>
                        <img alt="" src={require("./assets/images/login-phone.png")} className="main-img"></img>
                        {/* <img src={require("../assets/images/Atom_Sphere_2_0002.png")} className="img1"></img> */}
                        {/* <img src={require("../assets/images/Cone_Hex_R Shadowless.png")} className="img2"></img> */}
                        {/* <img src={require("../assets/images/Sphere_Hourglass0003.png")} className="img3"></img> */}
                        </div>
                    </LoginImage>
                    
                    <Form onSubmit={handleSubmit}>  
                        
                        <h2>Hello<span></span>Admin!</h2>
                        <p>Laundry Managing Simplified!</p>
                        {/* <GoogleLogin
                        onSuccess={googleLoginSuccess}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        />; */}
                        {
                            errorMessage &&
                            <p style={{color: 'red'}}>{errorMessage}</p>
                        }
                        <input type="text" placeholder="Email" className="email-field" name="email" onChange={handleFieldsChange} value={fieldsData.email}></input>
                        <input type="password" placeholder="Password" className="pass-field" name="password" onChange={handleFieldsChange} value={fieldsData.password}></input>
                        <PricesDiv>
                            <span className="btn-mask">Sign In</span>
                            <button>Sign In</button>
                        </PricesDiv>
                    </Form>
    
                    
                </LoginForm>
            </Container>
            }
        </Main>

       
    )
}

const primary = "#34347C";
const secondary = "#34CCA1";
// const bg = "#F4F4F4";
const borderRad = "5px";
const yellowBtnHover = "#f7cb39";
const gray = "#7A8C87";

const Main = styled.main`
    background: linear-gradient(135deg, #fff 0%, #fff 55%, ${primary} 55%, ${secondary} 100%);
    background: linear-gradient( to right, #fff 50%, ${primary} 50%);

    background: ${(props) => (props.isSplashActive ? "#fff" : `linear-gradient( to right, #fff 50%, ${primary} 50%)`)};

    @media screen and (max-width: 868px) {
        background:#fff;
    }

.splash-screen{
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100vh;
}


.completed-image{
    width: 30%;
    scale: 0;
    transition: all .2s ease-in-out;
}

.completed-image.show{
    scale: 1;
    transition: all .2s ease-in-out;
}


`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;

    @media screen and (max-width: 868px) {
        /* background: linear-gradient(${primary} 50%, #fff 50%); */
    }

    @media screen and (max-width: 429px) {
        /* background: linear-gradient(#fff 50%, #fff 50%); */
        /* background: linear-gradient(${primary} 50%, ${primary} 50%); */
    }
`

const LoginForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row-reverse;
    height: 100vh;

    @media screen and (max-width: 1200px) {
        /* height: auto;
        box-shadow: 0 0 16px 5px rgba(230, 230, 230);
        margin: 2rem; */
    }


    @media screen and (max-width: 868px) {
        flex-direction: column;
        /* width: 80vw; */
    }

    @media screen and (max-width: 568px) {
        width: 90vw;
        padding: 1rem;
        background-color: white;
    }
`

const LoginImage = styled.div`
    flex: .5;
    text-align: center;
    /* background-color: ${secondary}; */
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 868px) {
        background-color: transparent;
    }

    div{
        position: relative;

        .img1{
            width: 120px;
            height: 120px;
            position: absolute;
            top: 60%;
            left: 15%;
            animation: spin 3s infinite linear;
            

            @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
        }

        .img2{
            width: 95px;
            height: 95px;
            position: absolute;
            top: 50%;
            left: 80%;
            display: inline-block;
            animation: shake 3s infinite;

            @keyframes shake {
            0% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(-5px);
            }
            50% {
                transform: translateX(0);
            }
            75% {
                transform: translateX(5px);
            }
            100% {
                transform: translateX(0);
            }
            }
        }

        .img3{
            width: 60px;
            height: 60px;
            position: absolute;
            top: 20%;
            left: 65%;
            display: inline-block;
            animation: moveInCircle 6s linear infinite;


            @keyframes moveInCircle {
                0% {
                    transform: rotate(0deg) translateX(30px) rotate(0deg);
                }
                100% {
                    transform: rotate(360deg) translateX(30px) rotate(-360deg);
                }
            }
        }

        .main-img{
            width: 100%;
            display: inline-block;
            animation: moveUpDown 3s infinite alternate;

            @keyframes moveUpDown {
                0% {
                transform: translateY(0);
                }
                100% {
                transform: translateY(-20px);
                }
            }


        
        @media screen and (max-width: 868px) {
            width: 35%;
        }

        }

        @media screen and (max-width: 868px) {
            .img1{
                left: 30%;
                width: 90px;
                height: 90px;
            }
            .img2{
                left: 60%;
                width: 60px;
                height: 60px;
            }
            .img3{
                width: 50px;
                height: 50px;
                left: 60%;

                @keyframes moveInCircle {
                0% {
                    transform: rotate(0deg) translateX(15px) rotate(0deg);
                }
                100% {
                    transform: rotate(360deg) translateX(15px) rotate(-360deg);
                }
            }
            }
        }

        @media screen and (max-width: 600px) {
            .img1{
                left: 30%;
                width: 70px;
                height: 70px;
            }
            .img2{
                left: 60%;
                width: 60px;
                height: 60px;
            }
            .img3{
                width: 40px;
                height: 40px;
                left: 60%;
                top: 15%;
            }
        }

    }


    svg{
        transform: perspective(1000px) rotateY(50deg);
    }

`

const Form = styled.form`
    flex: .5;
    text-align: center;  
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* border: solid 2px red; */
    /* margin: 2rem 0; */

    @media screen and (max-width: 868px) {
        width: 100%;
    }

    >p{
        margin-bottom: 0.5rem;
    }

    >p:first-of-type{
        color: ${secondary};
        /* font-weight: 600; */
        margin-bottom: 3rem;
        font-size: 0.85rem;
        font-weight: bolder;
    }
        

    h2{
        /* margin-bottom: 2rem; */
        font-size: 2.3rem;
        /* font-family: euclid; */
        color: ${primary};




        span{
            margin-right: 1rem;
            /* color: ${secondary}; */
        }

        @media screen and (max-width: 868px) {
            font-size: 4.3rem;
        }
    }

    div{
            display: flex;
            justify-content: center;
            gap: 1rem;
        }

    input{
        width: 60%;
        display: block;
        outline: none;
        border: solid 1.34px rgb(230, 230, 230);
        border-radius: ${borderRad};
        height: 45px;
        text-indent: 10px;
        margin-bottom: 1.2rem;
        color: ${gray};
        font-weight: 500;
        font-size: 1rem;
        transition: all .2s ease-in-out;

        &:focus{
            border: solid 1.34px ${secondary};
            transition: all .2s ease-in-out;
        }

        &:hover{
            border-color: ${secondary}
        }

        @media screen and (max-width: 600px) {
            width: 80%;
        }

        @media screen and (max-width: 468px) {
            width: 90%;
        }

        @media screen and (max-width: 368px) {
            width: 100%;
        }
    }



    .contact-btn{
        padding: 0.8rem 1.5rem;
        background-color: ${secondary};
        color: ${primary};
        border-radius: ${borderRad};
        text-decoration: none;
        font-weight: 700;
        outline: none;
        width: 90%;
        border: none;
        cursor: pointer;
        /* margin-top: 1.5rem; */

        &:hover{
            background-color: ${yellowBtnHover};
        }
    }
`

const Logo = styled.div`
    position: absolute;
    text-align: center;
    /* font-family: sparkle; */
    display: flex !important;
    justify-content: center !important;
    align-items: center;
    gap: 0.2rem;
    top: 3%;
    left: 2%;

   
    @media (max-width: 1200px) {
        justify-content: start;
    }

    @media screen and (max-width: 800px) {
        top: 2%;
    }


    img{
        width: 30px;
        height: 30px;
    }


    @media (max-width: 1200px){
        flex: 1;
        text-align: start;
    }
`

const LogoLink = styled(Link)`
    color: ${gray};
    font-size: 1.7rem;
    text-decoration: none;


    span:first-child{
        color: ${secondary};
    }

    span:last-child{
        color: ${secondary};
        font-size: 2.5rem;
    }
`

const SignUpLink = styled(Link)`
    text-decoration: none;
    /* margin-top: 8rem; */
    color: ${gray};
    font-size: 0.9rem;
    position: absolute;
    top: 90%;
    
    @media screen and (max-width: 868px) {
        position: relative;
        top: inherit;
    }

    span{
        color: ${secondary};
    }

    @media screen and (max-width: 868px) {
        margin-bottom: 3rem;
    }
`

const PricesDiv = styled.div`
    width: 100%;
    flex: .5;
    padding: 1rem 0;
    position: relative;
    font-size: 1rem;
    text-align: center;

    @media screen and (max-width: 500px) {
        font-size: 0.9rem;
    }

    .btn-mask{
        border-radius: ${borderRad};
        position: absolute;
        color: ${primary};
        text-align: center;
        position: absolute;
        border: solid 2px ${primary};
        text-decoration: none;
        padding: 10px 18px;
        top: 50%;
        transform: translateY(-50%);
        width: 60%;

        /* @media (max-width: 900px){
            width: 100% !important;
        } */
    }

    button{
        width: 60%;
    position: relative;
    text-decoration: none;
    color: #fff;
    background: ${primary};
    padding: 10px 18px;
    -webkit-mask: url(${require("./assets/images/btn-mask.png")});
    mask: url(${require("./assets/images/btn-mask.png")});
    -webkit-mask-size: 3000% 100%;
    mask-size: 3000% 100%;
    border: solid 2px ${primary};
    border-radius: ${borderRad};
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(29) forwards;
    animation: ani2 0.7s steps(29) forwards;
    font-size: 1rem;
    font-family: poppins;

    /* @media (max-width: 900px){
        width: 100% !important;
    } */

    @media screen and (max-width: 500px) {
        font-size: 0.9rem;
    }

    &:hover{
        -webkit-animation: ani 0.7s steps(29) forwards;
        animation: ani 0.7s steps(29) forwards;
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

    
    }

`