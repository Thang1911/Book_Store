import React from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Button = ({ book }) => {
  const { data } = useSession();
  const handleAddToCart = async () => {
    try {
      if (!data || !data.user) {
        toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
      }

      const newItem = {
        userId: data.user._id,
        productId: book.id,
        productName: book.title,
        productImg: book.cover_id,
        number: 1,
        price: "17.90$",
        status: "Unchecked",
      };

      const response = await fetch(
        "https://book-store-teal-one.vercel.app/api/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );

      const result = await response.json();

      if (response.status === 500) {
        toast.error("Lỗi khi tạo đơn hàng");
      }

      if (response.status === 200) {
        toast.success(result.message);
      }

      console.log("Đã tạo đơn hàng:", result);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Add to cart
    </button>
  );
};

export default Button;
