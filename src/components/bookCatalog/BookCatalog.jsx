"use client"
import React, { useEffect, useState } from 'react'
import classes from './bookCatalog.module.css'
import Pagination from '../pagination/Pagination'
import BookCard from '../bookCard/BookCard'

const BookCatalog = () => {
  const [title, setTitle] = useState("")
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const BASE_URL = `https://example-data.draftbit.com/books?_limit=200`;
  // pagination
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 6

  useEffect(() => {
    const getData = setTimeout(async () => {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL);
        const docs = await res.json();

        console.log(docs);

        let books = docs.slice(0, 100);

        books = books.map((book) => {
          return {
            id: book.id,
            title: book.title,
            cover_id: book.image_url,
            author_name: book.authors,
            public_rating: book.rating,
          }
        })

        const formattedBooks = []
        for (let i = 0; i < books.length; i++) {
          if (books[i]?.cover_id) {
            formattedBooks.push(books[i])
          }
        }

        setBooks(formattedBooks)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    })

    return () => {
      clearTimeout(getData)
    }
  }, [title])

  const endOffset = itemOffset + itemsPerPage
  const currentItems = books.slice(itemOffset, endOffset)

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Catalog of books</h5>
          <h2>Find your desired books</h2>
        </div>
        {isLoading && (
          <div className={classes.loader} />
        )}
        <div className={classes.books}>
          {!isLoading && (
            currentItems?.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))
          )}
        </div>
        {!isLoading && (
          <Pagination
            setItemOffset={setItemOffset}
            itemsPerPage={itemsPerPage}
            books={books}
          />
        )}
      </div>
    </div>
  )
}

export default BookCatalog