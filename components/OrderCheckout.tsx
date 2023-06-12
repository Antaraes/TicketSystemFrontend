import React, { SyntheticEvent, useState, useEffect } from "react";
import * as api from "../pages/api";
import { User } from "@/type";
import { log } from "console";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import ComfrimModal from "./ComfrimModal";
import Tesseract from "tesseract.js";

type Ticket = {
  tickets: [];
};
interface UserData extends User {
  id: number;
  username: string;
  email: string;
}
type Order = {
  order_image: File | null;
  paid_amount: number;
};
const OrderCheckout = ({ tickets }: Ticket & UserData) => {
  const router = useRouter();
  const [send, setSend] = useState<boolean>(true);
  const [userdata, setUserData] = useState<UserData>();
  const [orderImage, setOrderImage] = useState<File>();
  const [modal, setModal] = useState<boolean>(true);
  const selectTickets = tickets;
  useEffect(() => {
    async function fetchData() {
      await api.GetUserDetail().then((resp) => {
        const body = resp.data.customer;
        setUserData(body);
      });
    }
    fetchData();
  }, []);
  let paidAmount = 0;
  for (const number of tickets) {
    paidAmount += 10;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setOrderImage(files[0]);
    }
  };
  console.log(orderImage);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // for (const ticket of tickets) {
    //   const number = JSON.stringify(ticket);
    //   console.log(number);

    //   try {
    //     const response = await api.PostTickets({ number });
    //     setSend(true);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    if (send) {
      const formData = new FormData();

      // Add the image file to the formData

      const paidAmountElement = document.getElementById("paidAmount");
      const paidAmount = paidAmountElement?.textContent;
      const money = paidAmount ? Number(paidAmount.replace("$", "")) : 0;
      if (orderImage) {
        formData.append("order_image", orderImage);
      }

      formData.append("numbers", JSON.stringify(selectTickets));

      // Add other data to the formData
      formData.append("paid_amount", money);

      const orderData = {
        order_image: orderImage,
        paid_amount: paidAmount ? Number(paidAmount.replace("$", "")) : 0,
      };
      // console.log(orderData);
      console.log(selectTickets);
      for (const value of formData.values()) {
        console.log(value);
      }

      try {
        const responseData = await api.PostOrder(formData);
        console.log(responseData);
        setModal(true);
      } catch (error) {
        console.error(error);
      }
      window.location.reload();
    } else {
      alert("Some tickets has been taken");
    }
  };
  return (
    <>
      <section>
        <h1 className="sr-only">Checkout</h1>
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-50 py-12 md:py-24">
            <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
              <div className="flex items-center gap-4">
                <h2 className="font-medium text-gray-900">Ticket</h2>
              </div>
              <div>
                <p id="paidAmount" className="text-2xl font-medium tracking-tight text-gray-900">
                  ${paidAmount}
                </p>
                <p className="mt-1 text-sm text-gray-600">For the purchase of</p>
              </div>
              <div>
                <div className="grid grid-cols-3 gap-3">
                  {tickets.map((ticketnumber) => (
                    <>
                      <div
                        className={`flex flex-col items-center border   rounded  justify-center bg-blue-500 h-14 w-14 relative`}
                      >
                        <div key={ticketnumber} className=" rounded-t-lg flex justify-center ">
                          <label className="text-2xl">{ticketnumber}</label>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <form className="bg-white py-12 md:py-24">
            <div className="mx-auto max-w-lg px-4 lg:px-8">
              <form className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <label htmlFor="FirstName" className="block text-xs font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="FirstName"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>
                <div className="col-span-3">
                  <label htmlFor="LastName" className="block text-xs font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="LastName"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>
                <div className="col-span-3">
                  <label htmlFor="LastName" className="block text-xs font-medium text-gray-700">
                    User Name
                  </label>
                  <input
                    type="text"
                    id="LastName"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    placeholder={userdata?.username}
                  />
                </div>
                <div className="col-span-6">
                  <label htmlFor="Email" className="block text-xs font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    placeholder={userdata?.email}
                  />
                </div>
                <div className="col-span-6">
                  <label htmlFor="Phone" className="block text-xs font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="Phone"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>
                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">Card Details</legend>
                  <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                      <label htmlFor="CardNumber" className="sr-only">
                        {" "}
                        Card Number{" "}
                      </label>
                      <input
                        type="text"
                        id="CardNumber"
                        placeholder="Card Number"
                        className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>
                    <div className="flex">
                      <div className="flex-1">
                        <label htmlFor="CardExpiry" className="sr-only">
                          {" "}
                          Card Expiry{" "}
                        </label>
                        <input
                          type="text"
                          id="CardExpiry"
                          placeholder="Expiry Date"
                          className="relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm"
                        />
                      </div>
                      <div className="-ms-px flex-1">
                        <label htmlFor="CardCVC" className="sr-only">
                          {" "}
                          Card CVC{" "}
                        </label>
                        <input
                          type="text"
                          id="CardCVC"
                          placeholder="CVC"
                          className="relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Billing Address
                  </legend>
                  <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                      <label htmlFor="Country" className="sr-only">
                        Country
                      </label>
                      <select
                        id="Country"
                        className="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                      >
                        <option>England</option>
                        <option>Wales</option>
                        <option>Scotland</option>
                        <option>France</option>
                        <option>Belgium</option>
                        <option>Japan</option>
                      </select>
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="PostalCode">
                        {" "}
                        ZIP/Post Code{" "}
                      </label>
                      <input
                        type="text"
                        id="PostalCode"
                        placeholder="ZIP/Post Code"
                        className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      {orderImage ? (
                        <div>
                          <img
                            src={URL.createObjectURL(orderImage)}
                            alt="Thumb"
                            className=" object-cover w-40"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col items-center  justify-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and
                              drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                        </>
                      )}
                      <input
                        id="dropzone-file"
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        required
                        className="hidden"
                        onChange={(e) => handleChange(e)}
                      />
                    </label>
                  </div>
                </fieldset>
                <div className="col-span-6">
                  <button
                    onClick={handleSubmit}
                    className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
                  >
                    Pay Now
                  </button>
                  {modal && <ComfrimModal />}
                </div>
              </form>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default OrderCheckout;
