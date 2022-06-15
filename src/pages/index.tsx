import type { NextPage } from "next";
import { createContext, useEffect, useState } from "react";
import {
  Balance,
  CompanyStatistic,
  CreditCard,
  FetchedData,
  Payment,
  Progress,
  SendTo,
  Transaction,
} from "../core/types";
import useInterval from "../hooks/use-interval";
import HomeView from "../views/home";

export const Stats = createContext<CompanyStatistic[]>([]);

const Home: NextPage = () => {
  // const balances: Balance[] = [
  //   {
  //     name: "1",
  //     TL: 352.5,
  //     EURO: 213.7,
  //     USD: 211.5,
  //   },
  //   {
  //     name: "2",
  //     TL: 361.9,
  //     EURO: 248.4,
  //     USD: 231.123,
  //   },
  //   {
  //     name: "3",
  //     TL: 324.78,
  //     EURO: 323.7,
  //     USD: 267.345,
  //   },
  //   {
  //     name: "4",
  //     TL: 352.19,
  //     EURO: 178.43,
  //     USD: 287.125,
  //   },
  // ];

  // const progresses: Progress[] = [
  //   {
  //     name: "TL",
  //     value: 0.5,
  //   },
  //   {
  //     name: "EURO",
  //     value: 0.3,
  //   },
  //   {
  //     name: "USD",
  //     value: 0.2,
  //   },
  // ];

  // const creditCards: CreditCard[] = [
  //   {
  //     name: "Maximum Card",
  //     number: "1234 5678 9012 3456",
  //     owner: "Ertugrul cevahir",
  //     expirationMonth: "07",
  //     expirationYear: "20",
  //     CV: 123,
  //     debt: 1400,
  //     creditAvailable: 8500,
  //     cutOffDate: "03.05.2017",
  //   },
  //   {
  //     name: "Minimum Card",
  //     number: "1234 5678 8493 3456",
  //     owner: "Ertugrul cevahir",
  //     expirationMonth: "05",
  //     expirationYear: "22",
  //     CV: 141,
  //     debt: 927,
  //     creditAvailable: 9120,
  //     cutOffDate: "03.05.2015",
  //   },
  //   {
  //     name: "Middle Card",
  //     number: "1234 4321 9012 3456",
  //     owner: "Ertugrul cevahir",
  //     expirationMonth: "21",
  //     expirationYear: "23",
  //     CV: 532,
  //     debt: 432,
  //     creditAvailable: 8500,
  //     cutOffDate: "03.05.2021",
  //   },
  // ];

  // const SendTo: SendTo[] = [
  //   {
  //     name: "Ertugrul",
  //     surname: "Cevahir",
  //   },
  //   {
  //     name: "Abrahim",
  //     surname: "Mohhamad",
  //   },
  //   {
  //     name: "Mustapha",
  //     surname: "Kebab",
  //   },
  // ];

  // const payments: Payment[] = [
  //   {
  //     name: "Utility Bill",
  //     date: "08 May",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  //     amount: 186,
  //   },
  //   {
  //     name: "House Bill",
  //     date: "22 May",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  //     amount: 2800,
  //   },
  //   {
  //     name: "Phone Bill",
  //     date: "01 June",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  //     amount: 70,
  //   },
  //   {
  //     name: "Phone Bill",
  //     date: "01 June",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  //     amount: 70,
  //   },
  //   {
  //     name: "Phone Bill",
  //     date: "01 June",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  //     amount: 70,
  //   },
  // ];

  // const transactions: Transaction[] = [
  //   {
  //     name: "Starbucks",
  //     date: "Today",
  //     amount: 12,
  //     growth: "down",
  //   },
  //   {
  //     name: "Salary",
  //     date: "30 Apr",
  //     amount: 12000,
  //     growth: "up",
  //   },
  //   {
  //     name: "CarrefourSA",
  //     date: "29 Apr",
  //     amount: 324.78,
  //     growth: "down",
  //   },
  // ];

  const [data, setData] = useState<FetchedData | null>(null);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  useInterval(async () => {
    const data = await fetchData();
    setData(data);
  }, 30000);

  const fetchData = async () => {
    const data = await fetch("./data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json().then((data: FetchedData) => data));

    return data;
  };

  return (
    data && (
      <Stats.Provider value={data.companyStatistics}>
        <HomeView
          balances={data.balances}
          progresses={data.progresses}
          creditCards={data.creditCards}
          sendTo={data.sendTo}
          payments={data.payments}
          transactions={data.transactions}
        />
      </Stats.Provider>
    )
  );
};

export default Home;
