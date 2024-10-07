import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import Cards from '../components/cards/Cards';
import TransactionForm from '../components/TransactionForm';
import { GET_TRANSACTION_CATEGORY_STATISTICS } from '../graphql/queries/transaction.query';
import { GET_AUTHENTICATED_USER } from '../graphql/queries/user.query';
import { LOGOUT } from '../graphql/mutations/user.mutation';
import { useMutation, useQuery } from '@apollo/client';
import { MdLogout } from 'react-icons/md';
import { toast } from 'react-hot-toast';

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const { data } = useQuery(GET_TRANSACTION_CATEGORY_STATISTICS);
  const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);
  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ['GetAuthenticatedUser'],
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '%',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map((stat) => stat.category);
      const totalAmounts = data.categoryStatistics.map((stat) => stat.totalAmount);

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === 'saving') {
          backgroundColors.push('rgba(76, 175, 80)');
          borderColors.push('rgba(76, 175, 80)');
        } else if (category === 'expense') {
          backgroundColors.push('rgba(255, 87, 34)');
          borderColors.push('rgba(255, 87, 34)');
        } else if (category === 'investment') {
          backgroundColors.push('rgba(33, 150, 243)');
          borderColors.push('rgba(33, 150, 243)');
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [data]);

  const handleLogout = async () => {
    try {
      await logout();
      // reset the cache with refetching instead client.resetStore() without fetching
      client.resetStore();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
          <img
            src={authUserData?.authUser.profilePicture}
            className="w-11 h-11 rounded-full border cursor-pointer"
            alt={authUserData?.authUser.name}
          />
          {/* <p>{authUser.name}</p> */}
          {!loading && (
            <div className="flex items-center cursor-pointer" onClick={handleLogout}>
              <MdLogout className="mx-2 w-5 h-5" />
              <p>Logout</p>
            </div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          {data?.categoryStatistics && (
            <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]">
              <Doughnut data={chartData} />
            </div>
          )}

          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
