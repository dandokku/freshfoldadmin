import React from "react";
import Chart from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-moment';

const BookingTrendChart = ({ bookings }) => {
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    if (!bookings || bookings.length === 0) {
      return; // Don't render the chart if there are no bookings
    }

    const chartData = getBookingTrendsData(bookings);

    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.dates,
        datasets: [
          {
            label: '',
            data: chartData.counts,
            fill: 'false',
            backgroundColor: '#E9B609',
            borderColor: 'white',
            borderWidth: 1,
            pointBackgroundColor: (context) => {
                const bookings = context.dataset.data;
                const index = context.dataIndex;
                const count = bookings[index];
      
                if (count >= 7) {
                  return '#FB9F06';
                } else if (count > 4) {
                  return 'green';
                } else {
                  return 'white';
                }
              },
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM D',
              },
            },
            ticks: {
                color: '#fff', // Change the font color of the x-axis ticks
              },
            grid: {
                display: false, // Remove the horizontal grid lines
            },
          },
          y: {
            ticks: {
              display: false, // Hide y-axis ticks and numbers
            },
            grid: {
              display: false, // Hide y-axis grid lines
            },
          },
        },
        plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
      },
    });
    return () => {
        // Cleanup: destroy the chart instance on unmount
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        }
    };
  }, [bookings]);

  const getBookingTrendsData = (bookings) => {
    // Perform calculations to get booking trends data
    // For example, calculate the count of bookings for each date

    const countsByDate = bookings.reduce((counts, booking) => {
      const bookingDate = moment(booking.bookingDate);
      const date = bookingDate.toISOString();

      if (counts[date]) {
        counts[date] += 1;
      } else {
        counts[date] = 1;
      }

      return counts;
    }, {});

    const dates = Object.keys(countsByDate);
    const counts = dates.map((date) => countsByDate[date]);

    return {
      dates,
      counts,
    };
  };

  return <canvas ref={chartRef} />;
};

export default BookingTrendChart;
