import React from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import adminImage from "../assets/images/about2.jpg"


export default function AddService() {

    const admin = useSelector(state => state.admin);

    const [fieldsData, setFieldsData] = React.useState({
        serviceName: "",
        description: "",
   });

    const [validateFieldsData, setValidateFieldsData] = React.useState({
        serviceName: "",
        description: "",
    })

    // console.log(fieldsData);

    const [postResponse, setPostResponse] = React.useState("");
    const [failResponse, setFailResponse] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if(!validateFieldsData.serviceName && !validateFieldsData.description){
        }
        else{
            console.log("Failed");
        }
        
    }

    // const [serviceImageData, setServiceImageData] = React.useState("");
    // const [serviceIconData, setServiceIconData] = React.useState("");

    // function handleImageChange(e) {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = () => {
    //         // console.log("reader: ", reader.result); // base64coded string
    //         setServiceImageData(reader.result);
    //     };
    //     reader.onerror = error => {
    //         console.log("Error", error);
    //     }
    // }

    // function handleIconImageChange(e){
    //     let reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = () => {
    //         // console.log("reader: ", reader.result); // base64coded string
    //         setServiceIconData(reader.result);
    //     };
    //     reader.onerror = error => {
    //         console.log("Error", error);
    //     }
    // }

    async function postPrices(service){
        const response = await axios.post("http://localhost:9000/api/services", service);
        return response.data;
    }

   const { mutate } = useMutation(postPrices,{
    onSuccess: (data) => {
        setPostResponse("Added Successfully.");
        setFailResponse("");
    },
    onError: (err) => {
        setPostResponse("");
        setFailResponse(err.response.data);
    }
   });


    
    function handleInputChange(event){
        const validateFields = {...validateFieldsData};
        setPostResponse("");

        setFieldsData(oldFieldsData => {
            return {
                ...oldFieldsData,
                [event.target.name]: event.target.value
            }
        })

        if (event.target.name === "name") {
            // if(event.target.value.length > 30){
                if (event.target.value.match(/[@#$!^%*0-9]/) || !event.target.value.trim()) {
                    validateFields.name = "Item cannot contain numbers or special characters";
                } 
                else {
                validateFields.name = "";
                }
            // }
            // else{
            //     validateFields.name = "";
            // }
            
        }

        if (event.target.name === "group") {
            if (event.target.value.length > 30) {
              validateFields.group = "Group cannot be more than 230 characters";
            } 
            else {
              validateFields.group = "";
            }
        }

        if(event.target.name === "price"){
            if(event.target.value > 1000){
                validateFields.price = 'Price cannot be more than $1000'
            }

            else{
                validateFields.price = "";
            }  
        }

        setValidateFieldsData(validateFields)
    }

    // console.log(validateFieldsData)

    return (
        <Container>
            <div>
                <h3>Add Service</h3>
                <div className="flex items-center gap-3">
                  <img src={adminImage} className="w-[60px] h-[60px] rounded-[50%]"></img>
                  <div>
                    <h3 className="text-sm">{admin.firstName} {admin.lastName}</h3>
                    <p>{admin.email}</p>
                  </div>
                </div>

            </div>
            <Form onSubmit={handleSubmit}>

                    {postResponse && <p className="add-successfull">{postResponse}</p>}
                    {failResponse && <p className="add-failed">{failResponse}</p>}
                    <div>
                        <div className="user-info">
                            <label>Service Name</label>
                            <input required={true}
                                type="text" max={200} className='input-field' name="serviceName" onChange={handleInputChange} 
                            />
                            {validateFieldsData.serviceName && validateFieldsData.serviceName}
                        </div>
                        <div className="user-info">
                            <label>Service Description</label>
                            <input required={true}
                                    type="text" max={200} className='input-field' name="description" onChange={handleInputChange} 
                            />
                            {validateFieldsData.description && validateFieldsData.description}
                        </div>
                    </div>

                    {/* <div>
                        <div className="user-info">
                            <label>Service Content</label>
                            <input required={true}
                                    type="text"
                                    name="serviceContent"  min={1} max={200} className='input-field' 
                                    onChange={handleInputChange}
                            />
                            {validateFieldsData.serviceContent && validateFieldsData.serviceContent}
                        </div>

                        <div className="user-info">
                            <label>Service Image</label>
                            <input required={true}
                                type="file" className='input-field field-image' name="userImage" onChange={handleImageChange} accept="image/*"
                            />
                        </div>
                    </div> */}

                    {/* <div>
                        <div className="user-info">
                            <label>Service Icon</label>
                            <input required={true}
                                type="file" className='input-field field-image' name="userImage" onChange={handleIconImageChange} accept="image/*"
                            />
                        </div>
                    </div> */}

                    <PricesDiv>
                        <span className="btn-mask">Save</span>
                        <button>Save</button>
                    </PricesDiv>

                </Form>
        </Container>
    )
}


const primary =  "#34CCA1";
const secondary = "#34CCA1";
const bg = "#F4F4F4";
const borderRad = "5px";
const gray = "#04040A";
const lightGray = "#7A8C87"

const Container = styled.div`
    flex: 1;
    // border: solid 2px red;
    max-width: 100%;
    overflow-x: hidden;
    // display: flex;
    // align-items: center;
    background: hsl(237, 36%, 100%);
    margin-left: 12rem;

    >div:first-child{
        // margin-bottom: 2rem;
        padding: 2.5rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        

        @media screen and (max-width: 990px) {
            padding: 0.9rem 1.2rem;
        }

        h3{
            color: ${secondary};
            font-size: 1.7rem;
        }
    }

    @media screen and (max-width: 990px) {
        margin-left: 0;
        padding: 1rem;
        margin-top: 1rem;
    }
`

const AdminProfile = styled.div`
    /* border: solid 2px green; */
    text-align: center;
    display: flex;
    align-items: center;
    gap: 0.6rem;

    img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    p{
        color: ${gray};
    }

    @media screen and (max-width: 990px) {
        display: none;
    }
`

const PricesDiv = styled.div`
    width: 100%;
    flex: .5;
    padding: 2rem 0;
    position: relative;
    font-size: 1rem;
    text-align: center;

    @media screen and (max-width: 500px) {
        font-size: 0.9rem;
    }

    .btn-mask{
        border-radius: ${borderRad};
        position: absolute;
        color: ${secondary};
        text-align: center;
        position: absolute;
        border: solid 2px ${secondary};
        text-decoration: none;
        padding: 15px 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 40%;

        @media (max-width: 900px){
            width: 100% !important;
        }
    }

    button{
        width: 40%;
    position: relative;
    text-decoration: none;
    color: #fff;
    background: ${secondary};
    padding: 15px 20px;
    -webkit-mask-size: 3000% 100%;
    mask-size: 3000% 100%;
    border: solid 2px ${secondary};
    border-radius: ${borderRad};
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(29) forwards;
    animation: ani2 0.7s steps(29) forwards;
    font-size: 1rem;
    font-family: poppins;

    @media (max-width: 900px){
        width: 100% !important;
    }

    @media screen and (max-width: 500px) {
        font-size: 0.9rem;
    }

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

    
    }


    
    @media (max-width: 568px) {
        width: 100%;
    }
`


const Form = styled.form`
    padding: 3rem 4rem;

    input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none; margin: 0; display: none;
    }


    .add-successfull{
        color: green;
        text-align: center;
        margin-bottom: 1rem;
    }

    .add-failed{
        color: red;
        text-align: center;
        margin-bottom: 1rem;
    }

    >div{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        

        .user-info{
            flex: .5;

            label{
                color: ${secondary};            
            }

            .input-field{
                width: 100%;
                position: relative;
                /* padding: 0; */
                margin: 0;
                height: 50px;
                border-radius: ${borderRad};
                border: solid 1px #d3d3d3;
                outline: none;
                text-indent: 1rem;
                font-size: 1rem;
                margin-bottom: 1rem;
                margin-top: 0.7rem;
                content: "";

            
            
                &:focus{
                    border: solid 1px ${secondary};
                    transition: all .2s ease-in-out;
                }
            }
        }

        .input-field::-webkit-file-upload-button{
                background: ${primary};
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                border: none;
                outline: none;
                color: #fff;
                font-size: 0.8rem;
                padding: 0 0.6rem;
        }

        .field-image{
            text-align: start;
            align-items: center;
            display: flex;
            padding-left: 6rem;

        }

        .user-info2{
            flex: 1;



            .input-field{
                width: 100%;
                position: relative;
            padding: 0;
            margin: 0;
            height: 50px;
            border-radius: ${borderRad};
            border: solid 1px #d3d3d3;
            outline: none;
            text-indent: 1rem;
            font-size: 1rem;
            margin-bottom: 1rem;
            margin-top: 0.7rem;
            
                &:focus{
                    border: solid 1px ${secondary};
                    transition: all .2s ease-in-out;
                }
            }
        }

        /* .user-info .2{
            flex: 1;
        } */
        
    }
`
