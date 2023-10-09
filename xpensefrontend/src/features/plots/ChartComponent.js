import { Bar, Line } from 'react-chartjs-2';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Expenses in Cloud5 vs Iniac Per Month',
    },
  },
};

const UsersVsExpenses = () => {
  const data = {
    type: 'line',
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Cloud5',
        data: [120, 39, 34, 50, 25, 13, 100],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Iniac',
        data: [12, 19, 30, 5, 12, 30, 10],
        backgroundColor: 'rgba(75, 19, 112, 0.2)',
        borderColor: 'rgba(75, 19, 112, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default UsersVsExpenses;

