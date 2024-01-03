"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { toast } from "react-toastify";
import Country from "@/components/country/Country";

const Cart = () => {
  const [items, setItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const { data } = useSession();

  useEffect(() => {
    handleItem();
  }, [items]);

  const handleItem = async () => {
    try {
      const res = await fetch(
        `https://book-store-teal-one.vercel.app/api/cart?userId=${data?.user?._id}`
      );

      if (res.ok) {
        const response = await res.json();
        const products = response.userCart;
        const total = products.reduce(
          (total, product) => total + parseInt(product.price, 10), // Chuyển đổi từ chuỗi sang số nguyên
          0
        );
        setTotalPrice(total);
        setItems(products);
      } else {
        throw new Error("Không thể lấy dữ liệu từ API");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
  };

  const handleDelete = async (id, name) => {
    try {
      const confirmation = window.confirm(
        "Bạn có chắc muốn xóa sản phẩm này không?"
      );
      if (confirmation) {
        const response = await fetch(
          `https://book-store-teal-one.vercel.app/api/cart?userId=${id}&productName=${name}`,
          {
            method: "UPDATE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Xóa sản phẩm không thành công");
        }

        // Xóa thành công, reload trang
        if (response.status === 200) {
          toast.success("Xóa sản phẩm thành công!");
        }
      }
    } catch (error) {
      console.error(error);
      // Xử lý lỗi nếu có
    }
  };

  const clearCart = async (id) => {
    try {
        const response = await fetch(
          `https://book-store-teal-one.vercel.app/api/cart?userId=${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Xóa sản phẩm không thành công");
        }

        // Xóa thành công, reload trang
        if (response.status === 200) {
          return 
        }

    } catch (error) {
      console.error(error);
      // Xử lý lỗi nếu có
    }
  }

const handleCheckOut = async () => {
  try {
    const confirmation = window.confirm(
      "Bạn có chắc muốn đặt đơn hàng này không?"
    );
    if (confirmation) {
      const response = await fetch(
        `https://book-store-teal-one.vercel.app/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: data?.user?._id,
            product: items,
            price: totalPrice,
            status: "In process",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Đặt đơn hàng không thành công");
      }

      // Xử lý khi đặt đơn hàng thành công
      if (response.status === 200) {
        toast.success("Đặt đơn hàng thành công!");
        clearCart(data?.user?._id);
        setItems({});
        // Thực hiện các hành động cần thiết sau khi đặt hàng thành công
      }
    }
  } catch (error) {
    console.error(error);
    // Xử lý lỗi nếu có
  }
};


  return (
    <>
      <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items &&
                      items.length > 0 &&
                      items.map((item, i) => (
                        <tr>
                          <td className="py-4">
                            <div className="flex items-center">
                              <img
                                className="h-16 w-16 mr-4 rounded-md"
                                src={item.productImg}
                                alt="Product image"
                              />
                              <span className="font-semibold">
                                {item.productName}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">$17.90</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button className="border rounded-md py-2 px-4 mr-2">
                                -
                              </button>
                              <span className="text-center w-8">
                                {item.number}
                              </span>
                              <button className="border rounded-md py-2 px-4 ml-2">
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">$17.90</td>
                          <td className="align-middle">
                            <div
                              onClick={() =>
                                handleDelete(item.userId, item.productName)
                              }
                            >
                              <BsFillTrash3Fill />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>$1.99</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>${3.45 + 1.99}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    ${(totalPrice + 1.99 + 3.45).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckOut}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Country /> */}
    </>
  );
};

export default Cart;
