"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Select } from "./components/Select";

const Home = () => {
  const [cashIn, setCashIn] = useState(0);
  const [cashOut, setCashOut] = useState(0);
  const [balance, setBalance] = useState(0);
  const [userData, setUserData] = useState([]);
  const [category, setCategory] = useState("CashIn");

  const { register, unregister, reset, handleSubmit } = useForm();

  const calculateSumOfCategory = (category) => {
    const filterCategory = userData.filter(
      (item) => item.category === category
    );
    const sum = filterCategory.reduce((a, b) => a + +b.amount, 0);
    return sum;
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("data"));
    if (local) {
      setUserData(local);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(userData));
    setCashIn(calculateSumOfCategory("Cash In"));
    setCashOut(calculateSumOfCategory("Cash Out"));
  }, [userData]);

  useEffect(() => {
    setBalance(cashIn - cashOut);
  }, [cashIn, cashOut]);

  const onSubmit = (data) => {
    userData.unshift({
      ...data,
      date: Date.now(),
    });
    setUserData([...userData]);
    if (category === "CashIn") {
      setCashIn(calculateSumOfCategory("Cash In"));
    } else {
      setCashOut(calculateSumOfCategory("Cash Out"));
    }
    reset({
      amount: "",
    });
  };

  const deleteItem = (id) => {
    console.log("id", id)
    console.log("item deleted")
    const filtered = userData.filter(item => item.date != id);
    setUserData([...filtered])
  }

  const handleCategory = () => {
    if (category === "CashIn") {
      setCategory("CashOut");
      unregister("cashInCategory");
    } else {
      setCategory("CashIn");
      unregister("cashOutCategory");
    }
  };

  return (
    <div>
      <h1 className="text-center py-5 text-xl md:text-3xl font-bold text-white bg-primary shadow-md">
        Expense Management System
      </h1>
      <div className="flex py-5 bg-base-200 text-primary justify-around flex-wrap px-5 rounded-lg shadow-lg font-medium">
        <div>
          Cash In: <span className="font-bold text-success">{cashIn}</span>
        </div>
        <div>
          Cash Out: <span className="font-bold text-error">{cashOut}</span>
        </div>
        <div>
          Balance: <span className="font-bold text-info">{balance}</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-100 shadow-md p-5 mt-5 rounded-lg space-y-4 max-w-xl mx-auto"
      >
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-semibold text-gray-700"
          >
            Amount:
          </label>
          <input
            id="amount"
            required
            type="number"
            min="1"
            {...register("amount", { required: true })}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">Type: </p>
          <Select
            onChange={(e) => handleCategory(e)}
            name="category"
            register={register}
            options={["Cash In", "Cash Out"]}
            className="select select-bordered w-full"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700">Category: </p>

          {category === "CashIn" ? (
            <Select
              name="cashInCategory"
              register={register}
              options={[
                "Salary",
                "Businesses",
                "Investments",
                "Loans",
                "Rental Income",
                "Freelancing",
                "Dividends",
                "Savings Interest",
                "Gift Money",
                "Side Hustles",
                "Bonuses",
                "Pensions",
                "Food",
              ]}
              className="select select-bordered w-full"
            />
          ) : (
            <Select
              name="cashOutCategory"
              register={register}
              options={[
                "Groceries",
                "Transportation",
                "Housing",
                "Utilities",
                "Healthcare",
                "Education",
                "Shopping",
                "Entertainment",
                "Dining Out",
                "Savings",
                "Travel",
                "Insurance",
                "Debt Repayment",
                "Charity",
                "Personal Care",
              ]}
              className="select select-bordered w-full"
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary text-white w-full">
          Submit
        </button>
      </form>

      <div className="my-8">
        <div className="overflow-x-auto rounded-md shadow-lg">
          <table className="table table-lg table-zebra">
            {/* head */}
            <thead>
              <tr className="bg-primary text-lg text-white">
                <th>#</th>
                <th>Type</th>
                <th>Category</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item, index) => (
                <tr className="bg-base-100" key={item.date}>
                  <th>{index + 1}</th>
                  <td>{item.category}</td>
                  <td>{item.cashInCategory || item.cashOutCategory}</td>
                  <td>{`${new Date(item.date).toDateString()}`}</td>
                  <td>{item.amount}</td>
                  <td>
                    <button onClick={() => deleteItem(item.date)} className="text-white bg-red-500 p-2 rounded-md"><img src="./trash.svg" width='24px' height='24px' /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
