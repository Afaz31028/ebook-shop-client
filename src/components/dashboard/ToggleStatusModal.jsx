"use client";
import { Button, Modal } from "@heroui/react";
import {AlertTriangle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ToggleStatusModal = ({ book }) => {
  const router = useRouter();
  const curStatus = book.status === "Published" ? "Unpublished" : "Published";
  const data = {
    ...book,
    status: curStatus,
  };
  const handleStatus = async () => {
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
      throw new Error(result?.message || "Failed to status of the book.");
    } else {
      router.push("/dashboard/writer");
    }

    toast.success("Book status updated successfully!", {
      theme: "dark",
    });
  };

  return (
    <div>
      <Modal>
        {/* Modal Trigger */}
        <Button
          type="button"
          className={
            book.status === "Published"
              ? "inline-flex h-9 items-center gap-1.5 rounded-lg border border-yellow-400/20 bg-yellow-400/10 px-3 text-xs font-semibold text-yellow-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-400/40 hover:bg-yellow-400/20"
              : "inline-flex h-9 items-center gap-1.5 rounded-lg border border-green-400/20 bg-green-400/10 px-3 text-xs font-semibold text-green-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-green-400/40 hover:bg-green-400/20"
          }
        >
          {book.status === "Published" ? (
            <>
              <EyeOff className="h-3.5 w-3.5" />
              Unpublish
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" />
              Publish
            </>
          )}
        </Button>

        <Modal.Backdrop className="bg-black/75 backdrop-blur-md">
          <Modal.Container>
            <Modal.Dialog className="relative w-[92%] max-w-[430px] overflow-hidden rounded-3xl border border-white/10 bg-[#14141a] p-0 text-white shadow-2xl shadow-black/70">
              {/* Top Gradient */}
              <div
                className={`absolute inset-x-0 top-0 h-1.5 ${
                  book.status === "Published"
                    ? "bg-linear-to-r from-yellow-400 via-orange-500 to-red-600"
                    : "bg-linear-to-r from-green-400 via-emerald-500 to-cyan-500"
                }`}
              />

              {/* Background Glow */}
              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full blur-3xl ${
                  book.status === "Published"
                    ? "bg-orange-500/10"
                    : "bg-green-500/10"
                }`}
              />

              <Modal.CloseTrigger className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:rotate-90 hover:bg-white/10 hover:text-white" />

              <Modal.Header className="relative flex flex-col items-center px-7 pb-3 pt-9 text-center">
                {/* Icon */}
                <div
                  className={`relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border shadow-xl ${
                    book.status === "Published"
                      ? "border-yellow-400/20 bg-linear-to-br from-yellow-400/20 to-red-500/10 shadow-yellow-500/10"
                      : "border-green-400/20 bg-linear-to-br from-green-400/20 to-cyan-500/10 shadow-green-500/10"
                  }`}
                >
                  <div
                    className={`absolute inset-2 rounded-2xl ${
                      book.status === "Published"
                        ? "bg-yellow-400/5"
                        : "bg-green-400/5"
                    }`}
                  />

                  {book.status === "Published" ? (
                    <EyeOff className="relative h-9 w-9 text-yellow-400" />
                  ) : (
                    <Eye className="relative h-9 w-9 text-green-400" />
                  )}

                  <span
                    className={`absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#14141a] ${
                      book.status === "Published"
                        ? "bg-yellow-400 text-black"
                        : "bg-green-400 text-black"
                    }`}
                  >
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </span>
                </div>

                <Modal.Heading className="text-2xl font-bold tracking-tight text-white">
                  Confirm Status Change
                </Modal.Heading>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  This action will immediately change the visibility of your
                  book.
                </p>
              </Modal.Header>

              <Modal.Body className="relative px-7 py-5">
                {/* Confirmation Card */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <p className="text-center text-sm leading-7 text-white/60">
                    Are you sure you want to{" "}
                    <span
                      className={`font-bold ${
                        book.status === "Published"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {book.status === "Published" ? "unpublish" : "publish"}
                    </span>{" "}
                    the book
                  </p>

                  <div className="mt-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-center">
                    <p
                      className="truncate font-semibold text-white"
                      title={book.title}
                    >
                      “{book.title}”
                    </p>
                  </div>
                </div>

                {/* Status Change Preview */}
                <div className="mt-4 flex items-center justify-center gap-3 text-xs">
                  <span
                    className={`rounded-full border px-3 py-1.5 font-medium ${
                      book.status === "Published"
                        ? "border-green-400/20 bg-green-400/10 text-green-300"
                        : "border-yellow-400/20 bg-yellow-400/10 text-yellow-300"
                    }`}
                  >
                    {book.status}
                  </span>

                  <span className="text-white/25">→</span>

                  <span
                    className={`rounded-full border px-3 py-1.5 font-medium ${
                      curStatus === "Published"
                        ? "border-green-400/20 bg-green-400/10 text-green-300"
                        : "border-yellow-400/20 bg-yellow-400/10 text-yellow-300"
                    }`}
                  >
                    {curStatus}
                  </span>
                </div>
              </Modal.Body>

              <Modal.Footer className="relative flex gap-3 border-t border-white/10 bg-white/[0.02] px-7 py-6">
                <Button
                  type="button"
                  slot="close"
                  className="h-12 flex-1 rounded-xl border border-white/10 bg-white/5 font-semibold text-white/60 transition-all hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleStatus}
                  type="submit"
                  slot="close"
                  className={`h-12 flex-1 rounded-xl font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${
                    book.status === "Published"
                      ? "bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 shadow-orange-500/20"
                      : "bg-linear-to-r from-green-400 via-emerald-500 to-cyan-500 shadow-green-500/20"
                  }`}
                >
                  {book.status === "Published" ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Publish
                    </>
                  )}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default ToggleStatusModal;
