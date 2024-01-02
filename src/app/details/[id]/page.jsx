"use client";
import React, { useEffect, useState } from "react";
import { BsFillCartFill } from "react-icons/bs";
import Image from "next/image";
import ReviewModal from "@/components/reviewModal/ReviewModal";
import classes from "./details.module.css";
import ReviewCard from "@/components/reviewCard/ReviewCard";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Details = (ctx) => {
  const id = ctx.params.id;
  const URL = `https://example-data.draftbit.com/books?id=${id}`;
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { data } = useSession();
  // five dollars per 100 pages
  const price = ((book?.pages / 100) * 5).toFixed(2);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        // if book has no pages specified, make them 350 by default
        let pages = null;
        if (data?.excerpts) {
          pages = data?.excerpts[0]?.pages;
        } else {
          pages = 350;
        }

        const details = {
          title: data[0]?.title,
          desc: data[0]?.description,
          id: data[0]?.id,
          cover_image: data[0]?.image_url,
          pages,
        };

        setBook(details);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/review?bookId=${id}`
        );
        const data = await res.json();

        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [book]);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const handleAddToCart = async () => {
    try {
      const newItem = {
        userId: data?.user?._id,
        productId: book?.id,
        productName: book?.title,
        productImg: book?.cover_image,
        number: 1,
        price: price,
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
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.bookDetails}>
          <div className={classes.left}>
            <Image
              src={book?.cover_image}
              height="750"
              width="350"
              alt="Book cover"
              //   layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={classes.right}>
            <h1 className={classes.title}>{book?.title}</h1>
            <p className={classes.desc}>{book?.desc}</p>
            <div className={classes.section}>
              <span className={classes.price}>Price: ${price}</span>
              <span className={classes.book_pages}>Pages: {book?.pages}</span>
            </div>
            <div className={classes.section}>
              <button onClick={handleAddToCart} className={classes.cart}>
                Add to Cart
                <BsFillCartFill />
              </button>
              <button
                onClick={handleShowModal}
                className={classes.reviewButton}
              >
                Review Book
              </button>
            </div>
            {showModal && (
              <ReviewModal
                handleHideModal={handleHideModal}
                bookId={book?.id}
              />
            )}
          </div>
        </div>
        {/* <div className={classes.reviews}>
          {reviews?.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Details;
