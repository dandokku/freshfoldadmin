import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";


export default function BookingDetails() {
    const {bookingId} = useParams();
    
    async function getBooking(id){
        const response = await axios.get(`http://localhost:9000/api/bookings/${id}`);
        return response.data
    }

    
   function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
  
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
  
    const months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
  
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
  
    const formatted = `${months[month]} ${day}, ${year}`;
    return formatted;
  }

    const {data} = useQuery("booking", () => getBooking(bookingId));
    // console.log(data);

    return (
        <Container>

            <div>
                <h3>Bookings</h3>
                <AdminProfile>
                <img src={require("../pages/assets/images/bathmats-price.jpg")}></img>
                <p>Owen Enabu</p>
            </AdminProfile>
            </div>
            {/* {bookingId} */}
            <main>
                <UserDetails>
                    <h2>User Details</h2>
                    <div>
                        <p><span>Full Name:</span> {data?.user.firstName} {data?.user.lastName}</p>
                    </div>
                    {/* <div> */}
                        <p><span>Email:</span> {data?.user.email}</p>
                        <p><span>Phone Number:</span> {data?.user.phoneNo}</p>
                    {/* </div> */}

                    <p><span>Address:</span> {data?.user.address}</p>
                </UserDetails>

                <Dates>
                    <h2>Dates</h2>
                    <p><span>Booking Date:</span> {formatDate(data?.bookingDate)}</p>
                    <p><span>Pick Up Date:</span> {formatDate(data?.pickUpDate)}</p>
                    <p><span>Delivery Date:</span> {formatDate(data?.deliveryDate)}</p>
                </Dates>
            </main>
            

            <Items>
                <h2>Items</h2>
                <div>
                    {
                        data?.items.map(item => {
                            return <div style={{marginBottom: "1rem"}}>
                                <h3 style={{color: gray}}>{item.label}</h3>
                                <p><span>Id:</span> {item.priceId}</p>
                                <p><span>Quantity:</span> {item.quantity}</p>
                                {/* <p>{item._id}</p> */}
                                <p><span>Price: </span>${item.price}</p>
                                <p><span>Total:</span> ${item.totalUnitPrice}</p>
                            </div>
                        })
                    }
                </div>
                <p><span>Items Total Price:</span> ${data?.itemsTotalPrice}</p>
            </Items>

            <WashPreference>
                <h2>Wash Preference</h2>
                <p><span>Bleach Whites:</span> {data?.washPreference.bleachWhites}</p>
                <p><span>Preffered Detergent:</span> {data?.washPreference.prefferedDetergent}</p>
                <p><span>Special Instructions:</span> {data?.washPreference.specialInstructions}</p>
            </WashPreference>

        </Container>
    )
}


const primary =  "#34347C";
const secondary = "#E9B609";
// const bg = "#F4F4F4";
const borderRad = "5px";
const yellowBtnHover = "#f7cb39";
const gray = "#545454";


const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: 12rem;

    >div:first-child{
        // margin-bottom: 2rem;
        padding: 2.5rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        

        @media screen and (max-width: 990px) {
            padding: 0.9rem 1.2rem;
        }

        h3{
            color: ${secondary};
            font-size: 1.7rem;
        }
    }

    >div{
    }

    @media screen and (max-width: 990px) {
        margin-left: 0;
        /* padding: 1rem; */
        margin-top: 1rem;
    }

    main{
        display: flex;
        width: 80%;
        padding: 1rem;

        div{
            flex: .5;
        }
    }
`

const UserDetails = styled.div`
        width: 80%;
        flex: .5;
    /* text-align: center; */

    h2{
        color: ${secondary};
        margin-bottom: 1rem;
    }

    p{
        margin-bottom: 0.8rem;
        color: gray;
    }

    span{
            color: ${gray};
            font-weight: 600;
        }
`

const Dates = styled.div`
    width: 80%;
    flex: .5;

    h2{
    color: ${secondary};
    margin-bottom: 1rem;
    }

    p{
        margin-bottom: 0.8rem;
        color: gray;
    }

    span{
        color: ${gray};
        font-weight: 600;
    }
`

const Items = styled.div`
        width: 80%;
        margin: 0 auto;
        /* border: solid 2px green; */
        padding: 1rem;

        >div{
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(3, 1fr);

            h3{
                margin-bottom: 0.7rem;
            }
        }
        
    
    h2{
        color: ${secondary};
        margin-bottom: 1rem;
    }

    p{
        margin-bottom: 0.8rem;
        color: gray;
    }

    span{
            color: ${gray};
            font-weight: 600;
        }
`

const WashPreference = styled.div`
        width: 80%;
        padding: 1rem;
    
    h2{
        color: ${secondary};
        margin-bottom: 1rem;
    }

    p{
        margin-bottom: 0.8rem;
        color: gray;
    }

    span{
            color: ${gray};
            font-weight: 600;
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