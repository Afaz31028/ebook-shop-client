"use client";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imgbb";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  Separator,
} from "@heroui/react";
import React, { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { toast } from "react-toastify";

const AddBook = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = authClient.useSession();
  const userRole = session?.user;
  // console.log(userRole)

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const bookData = Object.fromEntries(formData.entries());

      let imageUrl = "";
      if (bookData.image && bookData.image.size > 0) {
        const uploadedImage = await imageUpload(bookData.image);
        imageUrl = uploadedImage.url;
      } else {
        toast.error("Please upload a book cover image.", { theme: "dark" });
        setIsLoading(false);
        return;
      }

      // console.log(bookData);
      const data = {
        title: bookData.title,
        description: bookData.description,
        genre: bookData.genre,
        price: Number(bookData.price),
        image: imageUrl,
        writerId: userRole?.id,
        writerName: userRole?.name,
        writerEmail: userRole?.email,
        uploadedDate: formattedDate,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/add-book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await res.json();
      if (res.ok) {
        toast.success("Added the book Successfully!", { theme: "dark" });
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error("Action failed. Please try again.", { theme: "dark" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-115 text-white py-10">
      <Form
        className="relative flex flex-col gap-4 bg-[#14141a] border border-white/10 backdrop-blur-xl px-8 pb-8 rounded-2xl shadow-2xl shadow-black/50"
        onSubmit={handleSubmit}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-yellow-400 via-orange-400 to-red-600 rounded-t-2xl" />

        <div className="flex flex-col items-center gap-3 pt-8 pb-2">
          <div className="p-3 rounded-2xl bg-linear-to-br from-yellow-400/20 to-red-600/20 border border-white/10">
            <FaBookOpen className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-red-600 bg-clip-text text-transparent">
            Add a New Book
          </h1>
        </div>

        <TextField isRequired name="title" type="text">
          <Label className="text-white/80 text-sm font-medium">
            Book Title
          </Label>
          <div className="relative">
            <Input
              className="border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all w-full"
              placeholder="Enter Book Title"
            />
          </div>
        </TextField>
        <TextField isRequired name="description" type="text">
          <Label className="text-white/80 text-sm font-medium">
            Book Description
          </Label>
          <div className="relative">
            <Input
              className="border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all w-full"
              placeholder="Enter Book Description"
            />
          </div>
        </TextField>
        <TextField isRequired name="genre" type="text">
          <Label className="text-white/80 text-sm font-medium">
            Book Genre
          </Label>
          <div className="relative">
            <Input
              className="border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all w-full"
              placeholder="Enter Book Genre"
            />
          </div>
        </TextField>
        <TextField isRequired name="image" type="file">
          <Label className="text-white/80 text-sm font-medium">
            Book&apos;s Cover Photo
          </Label>
          <div className="relative">
            <input
              type="file"
              name="image"
              className="border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all w-full rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-yellow-400 file:to-red-600 file:text-black hover:file:scale-105 file:transition-all file:cursor-pointer cursor-pointer"
              accept="image/*"
            />
          </div>
        </TextField>
        <TextField isRequired name="price" type="number">
          <Label className="text-white/80 text-sm font-medium">
            Book Price
          </Label>
          <div className="relative">
            <Input
              className="border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all w-full"
              placeholder="Enter Book Price"
            />
          </div>
        </TextField>

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full bg-linear-to-r mt-5 from-yellow-400 to-red-600 text-black font-semibold py-6 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-yellow-400/20"
        >
          {isLoading ? "Pending..." : "Add Book"}
        </Button>
      </Form>
    </div>
  );
};

export default AddBook;
