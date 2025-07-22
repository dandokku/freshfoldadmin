import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Chart, registerables } from 'chart.js/auto';



const MyChart = ({ chartData }) => {
    const chartRef = React.useRef(null);
  
    React.useEffect(() => {
      const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart
    if (ctx.chart) {
      ctx.chart.destroy();
    }
  
    const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.map((data) => data.label),
          datasets: [
            {
              label: 'Revenue',
              data: chartData.map((data) => data.value),
              backgroundColor: chartData.map((data) => {
                if (data.value > 1000) {
                  return '#E9B6096b';
                } else if (data.value > 800) {
                  return '#FCE6045b';
                } else if (data.value > 400) {
                  return '#FB9F066b';
                } else if(data.value > 90){
                  return '#FCA4945b';
                }
                else {
                    return '#DCE4547B';
                }
              }),
              borderWidth: 1,
              borderColor: chartData.map((data) => {
                if (data.value > 1000) {
                  return '#E9B609';
                } else if (data.value > 800) {
                  return '#FCE604';
                } else if (data.value > 400) {
                  return '#FB9F06';
                } else if(data.value > 90){
                    return '#FCA494';
                }
                else {
                    return '#DCE454';
                }
              }),
            },
          ],
        },
        options: {
            // indexAxis: 'y',
          scales: {
            x: {
                grid: {
                  display: false,
                  
                },
                ticks: {
                  font: {
                    size: 14,
                  },
                  color: '#333',
                },
              },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 100, // Customize the step size for the y-axis ticks
              },
            },
          },
        },
      });
      
      return () => {
        // Cleanup: destroy chart on unmount
        newChart.destroy();
      };
    }, [chartData]);
  
    return <canvas ref={chartRef} />;
  };

  

export default function RevenueChart() {

    async function getBookings(){
        const response = await axios.get("https://freshfoldserver.onrender.com/api/bookings");
        return response.data
    }

    const serviceRevenueMap = {
        "Trousers": 0,
        "Shirts": 0,
        "Pillowcases": 0,
        "Towels": 0,
        "Socks": 0,
        "Suits": 0,
    };

    const { data : bookingsData} = useQuery("bookings", getBookings);
    // console.log(bookingsData);

    bookingsData?.forEach((booking) => {
        booking.items.forEach((item) => {
          const { label, totalUnitPrice } = item;
          if (serviceRevenueMap[label]) {
            serviceRevenueMap[label] += totalUnitPrice;
          } else {
            serviceRevenueMap[label] = totalUnitPrice;
          }
        });
    });

    const sortedServices = Object.keys(serviceRevenueMap).sort(
        (a, b) => serviceRevenueMap[b] - serviceRevenueMap[a]
    );
      
      // Prepare data for charting library
    const chartData = sortedServices.map((service) => ({
    label: service,
    value: serviceRevenueMap[service],
    }));

    console.log(serviceRevenueMap);

    return (
        <Container style={{marginTop: "2rem", boxShadow: "0 0 16px 2px rgba(52, 52, 124, 0.1)", padding: "1rem 0.5rem", borderRadius: "5px",margin: "auto", flex: 1}}>
                <h4 style={{color: gray, marginBottom: "0.6rem"}}>Prices Revenue</h4>
                <MyChart chartData={chartData}/>
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
  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`
