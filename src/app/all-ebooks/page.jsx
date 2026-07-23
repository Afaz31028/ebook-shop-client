import DisplayAllBooks from "@/components/DisplayAllBooks";
import { Book } from "lucide-react";
import React from "react";

const BrowseEbooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-books`);
  const allBooks = await res.json();
  // console.log(allBooks)
  return (
    <div>
      <h1 className="text-4xl font-bold text-white text-center py-10">
        All Ebooks
      </h1>
      <div className="grid grid-cols-3 w-10/12 mx-auto gap-5 space-y-5 text-white">
        {allBooks.map((bookItem) => (
          <DisplayAllBooks
            key={bookItem._id}
            bookItem={bookItem}
          ></DisplayAllBooks>
        ))}
      </div>
    </div>
  );
};

export default BrowseEbooks;
