"use client";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imgbb";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import { CheckCircle, EyeOff } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const EditBook = ({ book }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router= useRouter();

  // Existing book status will be selected initially
  const [status, setStatus] = useState(
    book?.status || "Unpublished",
  );

  const { data: session } = authClient.useSession();
  const userRole = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const bookData = Object.fromEntries(formData.entries());

      // Keep the previous image by default
      let imageUrl = book.image;

      // Upload only when a new image is selected
      if (
        bookData.image instanceof File &&
        bookData.image.size > 0
      ) {
        const uploadedImage = await imageUpload(bookData.image);
        imageUrl = uploadedImage.url;
      }

      const data = {
        ...book,
        title: bookData.title,
        description: bookData.description,
        genre: bookData.genre,
        price: Number(bookData.price),
        image: imageUrl,
        writerId: userRole?.id,
        writerName: userRole?.name,
        writerEmail: userRole?.email,
        status,
      };
    //   console.log(book._id)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/writer/edit/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result?.message || "Failed to update the book.",
        );
      }
      else{
        router.push('/dashboard/writer')
      }

      toast.success("Book updated successfully!", {
        theme: "dark",
      });

      console.log(result);
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Action failed. Please try again.",
        {
          theme: "dark",
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full py-10 text-white">
      <Form
        className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#14141a] px-5 pb-5 shadow-2xl shadow-black/50 backdrop-blur-xl"
        onSubmit={handleSubmit}
      >
        <TextField
          defaultValue={book.title}
          isRequired
          name="title"
          type="text"
        >
          <Label className="text-sm font-medium text-white/80">
            Book Title
          </Label>

          <div className="relative">
            <Input
              className="w-full border border-white/10 bg-white/5 text-white placeholder:text-white/30 transition-all focus:border-yellow-400/50"
              placeholder="Enter Book Title"
            />
          </div>
        </TextField>

        <TextField
          defaultValue={book.description}
          isRequired
          name="description"
          type="text"
        >
          <Label className="text-sm font-medium text-white/80">
            Book Description
          </Label>

          <div className="relative">
            <Input
              className="w-full border border-white/10 bg-white/5 text-white placeholder:text-white/30 transition-all focus:border-yellow-400/50"
              placeholder="Enter Book Description"
            />
          </div>
        </TextField>

        <TextField
          defaultValue={book.genre}
          isRequired
          name="genre"
          type="text"
        >
          <Label className="text-sm font-medium text-white/80">
            Book Genre
          </Label>

          <div className="relative">
            <Input
              className="w-full border border-white/10 bg-white/5 text-white placeholder:text-white/30 transition-all focus:border-yellow-400/50"
              placeholder="Enter Book Genre"
            />
          </div>
        </TextField>

        <Select
          className="w-full"
          name="status"
          value={status}
          onChange={(selectedValue) => {
            if (selectedValue) {
              setStatus(String(selectedValue));
            }
          }}
          placeholder="Select Status"
          isRequired
        >
          <Label className="text-sm font-medium text-white/80">
            Book Status
          </Label>

          <Select.Trigger className="w-full border border-white/10 bg-white/5 text-white transition-all focus:border-yellow-400/50">
            <Select.Value className="text-white" />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover className="rounded-lg border border-white/10 bg-gray-800">
            <ListBox className="text-white">
              <ListBox.Item
                id="Published"
                textValue="Published"
                className="text-green-400 hover:bg-white/5 data-[focused]:bg-white/10"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Published</span>
                </div>

                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item
                id="Unpublished"
                textValue="Unpublished"
                className="text-yellow-400 hover:bg-white/5 data-[focused]:bg-white/10"
              >
                <div className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4 text-yellow-400" />
                  <span>Unpublished</span>
                </div>

                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        <div>
          <Label className="mb-1 block text-sm font-medium text-white/80">
            Book&apos;s Cover Photo
          </Label>

          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 text-white transition-all file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-yellow-400 file:to-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:scale-105 file:transition-all focus:border-yellow-400/50"
          />

          <p className="mt-1.5 text-xs text-white/40">
            Leave this empty to keep the current cover image.
          </p>
        </div>

        <TextField
          defaultValue={String(book.price)}
          isRequired
          name="price"
          type="number"
        >
          <Label className="text-sm font-medium text-white/80">
            Book Price
          </Label>

          <div className="relative">
            <Input
              min="0"
              className="w-full border border-white/10 bg-white/5 text-white placeholder:text-white/30 transition-all focus:border-yellow-400/50"
              placeholder="Enter Book Price"
            />
          </div>
        </TextField>

        <Button
          type="submit"
          isLoading={isLoading}
          className="mt-5 w-full rounded-xl bg-linear-to-r from-yellow-400 to-red-600 py-6 font-semibold text-black shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:scale-[1.02]"
        >
          {isLoading ? "Updating..." : "Update The Book"}
        </Button>
      </Form>
    </div>
  );
};

export default EditBook;