import { Bar, Line } from 'react-chartjs-2';

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Users vs Expenses',
      },
    },
    scales: {
        x: {
          title: {
            display: true,
            text: 'Users',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Expense',
          },
        },
      },
  };

const UsersVsExpenses = () => {
  const data = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    datasets: [
      {
        label: 'Approved',
        data: [1500, 2343, 3344, 5425, 1422, 123, 1400,3453,2352,523,5236,1498,2335],
        backgroundColor: 'rgba(17, 174, 73, 0.2)',
        borderColor: 'rgba(17, 174, 73, 1)',
        borderWidth: 1,
      },
      {
        label: 'Pending',
        data: [1220, 334, 334, 560, 1752, 1889, 1006,347,228,537,1686,898,357],
        backgroundColor: 'rgba(75, 124, 177, 0.2)',
        borderColor: 'rgba(75, 124, 177, 1)',
        borderWidth: 1,
      }
    ],
  };



  return <Line data={data} options={options} />;
};

export default UsersVsExpenses;

