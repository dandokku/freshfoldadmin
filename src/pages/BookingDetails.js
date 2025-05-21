import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { FiUser, FiCalendar, FiMail, FiPhone, FiHome, FiPackage, FiDollarSign } from 'react-icons/fi';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BookingDetails() {
    const { bookingId } = useParams();
    
    async function getBooking(id) {
        const response = await axios.get(`http://localhost:9000/api/bookings/${id}`);
        return response.data;
    }

    function formatDate(dateString) {
        if (!dateString) return "N/A";
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const { data, isLoading, isError } = useQuery(["booking", bookingId], () => getBooking(bookingId));

    if (isLoading) {
        return (
            <Container>
                <LoadingSkeleton>
                    <Skeleton height={40} width={200} style={{ marginBottom: '2rem' }} />
                    <Skeleton height={20} count={4} style={{ marginBottom: '1rem' }} />
                    <Skeleton height={40} width={200} style={{ marginBottom: '2rem', marginTop: '2rem' }} />
                    <Skeleton height={20} count={3} style={{ marginBottom: '1rem' }} />
                    <Skeleton height={40} width={200} style={{ marginBottom: '2rem', marginTop: '2rem' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        {[...Array(3)].map((_, i) => (
                            <div key={i}>
                                <Skeleton height={20} width={150} style={{ marginBottom: '0.5rem' }} />
                                <Skeleton height={16} count={4} />
                            </div>
                        ))}
                    </div>
                </LoadingSkeleton>
            </Container>
        );
    }

    if (isError) {
        return (
            <Container>
                <ErrorMessage>
                    Failed to load booking details. Please try again later.
                </ErrorMessage>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <h1>Booking Details</h1>
                <BookingId>ID: {bookingId}</BookingId>
            </Header>

            <ContentGrid>
                <Section>
                    <SectionTitle>
                        <FiUser />
                        <h2>Customer Information</h2>
                    </SectionTitle>
                    <InfoItem>
                        <span>Full Name:</span>
                        <p>{data?.user.firstName} {data?.user.lastName}</p>
                    </InfoItem>
                    <InfoItem>
                        <span><FiMail /> Email:</span>
                        <p>{data?.user.email}</p>
                    </InfoItem>
                    <InfoItem>
                        <span><FiPhone /> Phone:</span>
                        <p>{data?.user.phoneNo}</p>
                    </InfoItem>
                    <InfoItem>
                        <span><FiHome /> Address:</span>
                        <p>{data?.user.address}</p>
                    </InfoItem>
                </Section>

                <Section>
                    <SectionTitle>
                        <FiCalendar />
                        <h2>Schedule</h2>
                    </SectionTitle>
                    <InfoItem>
                        <span>Booking Date:</span>
                        <p>{formatDate(data?.bookingDate)}</p>
                    </InfoItem>
                    <InfoItem>
                        <span>Pick Up Date:</span>
                        <p>{formatDate(data?.pickUpDate)}</p>
                    </InfoItem>
                    <InfoItem>
                        <span>Delivery Date:</span>
                        <p>{formatDate(data?.deliveryDate)}</p>
                    </InfoItem>
                </Section>
            </ContentGrid>

            <Section>
                <SectionTitle>
                    <FiPackage />
                    <h2>Order Items</h2>
                </SectionTitle>
                
                <ItemsGrid>
                    {data?.items.map((item, index) => (
                        <ItemCard key={index}>
                            <ItemName>{item.priceName}</ItemName>
                            <ItemDetail>
                                <span>ID:</span>
                                <p>{item.id}</p>
                            </ItemDetail>
                            <ItemDetail>
                                <span>Quantity:</span>
                                <p>{item.quantity}</p>
                            </ItemDetail>
                            <ItemDetail>
                                <span>Price:</span>
                                <p><FiDollarSign />{item.price.toFixed(2)}</p>
                            </ItemDetail>
                            <ItemDetail>
                                <span>Total:</span>
                                <p><FiDollarSign />{item.totalUnitPrice.toFixed(2)}</p>
                            </ItemDetail>
                        </ItemCard>
                    ))}
                </ItemsGrid>

                <TotalPrice>
                    <span>Order Total:</span>
                    <p><FiDollarSign />{data?.itemsTotalPrice.toFixed(2)}</p>
                </TotalPrice>
            </Section>
        </Container>
    );
}

// Styled Components
const Container = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const LoadingSkeleton = styled.div`
    padding: 2rem;
    background: white;
    border-radius: 8px;
`;

const ErrorMessage = styled.div`
    padding: 2rem;
    background: #fee2e2;
    color: #dc2626;
    border-radius: 8px;
    text-align: center;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
        font-size: 1.75rem;
        color: #1e293b;
        font-weight: 700;
    }
`;

const BookingId = styled.div`
    font-size: 0.9rem;
    color: #64748b;
    background: #f1f5f9;
    padding: 0.5rem 1rem;
    border-radius: 20px;
`;

const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Section = styled.section`
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
`;

const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    color: #334155;

    h2 {
        font-size: 1.25rem;
        font-weight: 600;
    }

    svg {
        font-size: 1.5rem;
        color: #34CCA1;
    }
`;

const InfoItem = styled.div`
    display: flex;
    margin-bottom: 1rem;
    line-height: 1.5;

    span {
        font-weight: 600;
        color: #475569;
        min-width: 120px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    p {
        color: #64748b;
        flex: 1;
    }

    svg {
        font-size: 1rem;
        color: #94a3b8;
    }
`;

const ItemsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const ItemCard = styled.div`
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.25rem;
    transition: all 0.2s ease;

    &:hover {
        border-color: #34CCA1;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
`;

const ItemName = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
`;

const ItemDetail = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;

    span {
        color: #475569;
        font-weight: 500;
    }

    p {
        color: #1e293b;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    svg {
        font-size: 0.8rem;
        color: #34CCA1;
    }
`;

const TotalPrice = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.25rem;
    background-color: #f8fafc;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;

    span {
        color: #475569;
    }

    p {
        color: #1e293b;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    svg {
        color: #34CCA1;
    }
`;