import { auth } from "@/lib/auth";
import { Table } from "@heroui/react";
import { headers } from "next/headers";
import {
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { EditModal } from "@/components/dashboard/EditModal";
import ToggleStatusModal from "@/components/dashboard/ToggleStatusModal";
import DeleteModal from "@/components/dashboard/DeleteModal";

const WriterDashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/writer/${userId}/books`,
  );

  const allBooks = await res.json();

  return (
    <div className="w-full px-4 py-8 text-white sm:px-6 lg:px-10">
      {/* Heading */}
      <div className="mb-7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-400">
          <BookOpen className="h-4 w-4" />
          Writer Dashboard
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Your{" "}
          <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Books
          </span>
        </h1>

        <p className="mt-2 text-sm text-white/40">
          View and manage all your uploaded books.
        </p>
      </div>

      {/* Table Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#14141a] shadow-2xl shadow-black/40">
        {/* Gradient Top Border */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-yellow-400 via-orange-500 to-red-600" />

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 pb-5 pt-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-yellow-400/20 bg-linear-to-br from-yellow-400/15 to-red-500/15 p-3">
              <BookOpen className="h-5 w-5 text-yellow-400" />
            </div>

            <div>
              {/* <h2 className="text-lg font-semibold text-white">
                Your Book Collection
              </h2> */}

              <h2 className="text-lg font-semibold text-white">
                Total {allBooks.length}{" "}
                {allBooks.length === 1 ? "book" : "books"}
              </h2>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-xs text-white/40 sm:flex">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
            Books inventory
          </div>
        </div>

        <Table className="rounded-none bg-transparent">
          <Table.ScrollContainer className="overflow-x-auto">
            <Table.Content
              aria-label="Writer books table"
              className="min-w-[900px]"
            >
              {/* Table Heading */}
              <Table.Header className="border-b border-white/10 bg-white/[0.035]">
                <Table.Column
                  isRowHeader
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/40"
                >
                  Title
                </Table.Column>

                <Table.Column className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/40">
                  Price
                </Table.Column>

                <Table.Column className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/40">
                  Published Date
                </Table.Column>

                <Table.Column className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/40">
                  Status
                </Table.Column>

                <Table.Column className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-white/40">
                  Actions
                </Table.Column>
              </Table.Header>

              {/* Table Body */}
              <Table.Body>
                {allBooks.map((book, index) => {
                  const isPublished =
                    book.status?.toLowerCase() === "published";

                  return (
                    <Table.Row
                      key={index}
                      className="group border-b border-white/[0.07] transition-all duration-200 last:border-b-0 hover:bg-white/[0.035]"
                    >
                      {/* Title */}
                      <Table.Cell className="px-6 py-4">
                        <div className="flex min-w-52 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-yellow-400/15 bg-yellow-400/[0.07] transition-transform duration-300 group-hover:scale-105">
                            <BookOpen className="h-5 w-5 text-yellow-400" />
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-64 truncate font-semibold text-white transition-colors duration-200 group-hover:text-yellow-300">
                              {book.title}
                            </p>

                            <p className="mt-1 text-xs text-white/30">
                              Book #{String(index + 1).padStart(2, "0")}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Price */}
                      <Table.Cell className="px-5 py-4">
                        <div className="inline-flex items-center rounded-lg border border-yellow-400/15 bg-yellow-400/[0.07] px-3 py-1.5">
                          <span className="text-sm font-bold text-yellow-300">
                            ৳ {book.price}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Date */}
                      <Table.Cell className="px-5 py-4">
                        <span className="text-sm font-medium text-white/65">
                          {book.uploadedDate}
                        </span>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell className="px-5 py-4">
                        {isPublished ? (
                          <div className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1.5 text-xs font-semibold text-green-300">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Published
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-xs font-semibold text-yellow-300">
                            <EyeOff className="h-3.5 w-3.5" />
                            Unpublished
                          </div>
                        )}
                      </Table.Cell>

                      {/* Design-only Action Buttons */}
                      <Table.Cell className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <EditModal book={book}></EditModal>
                          <ToggleStatusModal book={book}></ToggleStatusModal>
                          <DeleteModal book={book}></DeleteModal>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        {/* Empty State */}
        {allBooks.length === 0 && (
          <div className="flex min-h-64 flex-col items-center justify-center border-t border-white/10 px-6 py-12 text-center">
            <div className="mb-4 rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.07] p-4">
              <BookOpen className="h-8 w-8 text-yellow-400/70" />
            </div>

            <h3 className="font-semibold text-white/80">No books found</h3>

            <p className="mt-2 text-sm text-white/35">
              Your uploaded books will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriterDashboard;
