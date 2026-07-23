"use client";
import { Button, Modal } from "@heroui/react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const DeleteModal = ({ book }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/delete/${book._id}`,
      {
        method: "DELETE",
      },
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.message || "Failed to delete of the book.");
    } else {
      router.push("/dashboard/writer");
    }
    toast.success("Book deleted successfully!", {
      theme: "dark",
    });
  };
  return (
    <div>
      <Modal>
        {/* Trigger Button */}
        <Button
          type="button"
          title="Delete book"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-400/20 bg-red-400/10 px-3 text-xs font-semibold text-red-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-400/40 hover:bg-red-400/20 hover:text-red-200"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>

        <Modal.Backdrop className="bg-black/80 backdrop-blur-md">
          <Modal.Container>
            <Modal.Dialog className="relative w-[92%] max-w-[410px] overflow-hidden rounded-2xl border border-red-400/15 bg-[#14141a] p-0 text-white shadow-2xl shadow-black/80">
              {/* Top Gradient */}
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-red-700 via-red-500 to-orange-500" />

              {/* Background Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

              <Modal.CloseTrigger className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white" />

              {/* Header */}
              <Modal.Header className="relative flex flex-col items-center px-6 pb-2 pt-7 text-center">
                <div className="relative mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-linear-to-br from-red-500/20 to-orange-500/5 shadow-lg shadow-red-500/10">
                  <Trash2 className="h-6 w-6 text-red-400" />

                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#14141a] bg-red-500 text-white">
                    <AlertTriangle className="h-3 w-3" />
                  </span>
                </div>

                <Modal.Heading className="text-xl font-bold text-white">
                  Delete This Book?
                </Modal.Heading>

                <p className="mt-1 text-xs text-white/40">
                  This action is permanent and cannot be undone.
                </p>
              </Modal.Header>

              {/* Body */}
              <Modal.Body className="relative px-6 py-3">
                <div className="rounded-xl border border-red-400/15 bg-red-400/[0.06] p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-400/10">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-red-300">
                        Permanent deletion
                      </p>

                      <p className="mt-0.5 text-xs leading-5 text-white/45">
                        The book and its associated information will be removed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-center">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/30">
                    Selected book
                  </p>

                  <p
                    title={book.title}
                    className="truncate text-sm font-semibold text-white"
                  >
                    “{book.title}”
                  </p>
                </div>
              </Modal.Body>

              {/* Footer */}
              <Modal.Footer className="relative flex gap-3 border-t border-white/10 px-6 py-4">
                <Button
                  type="button"
                  slot="close"
                  className="h-10 flex-1 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white/60 hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleDelete}
                  slot="close"
                  type="submit"
                  className="h-10 flex-1 gap-2 rounded-xl bg-linear-to-r from-red-600 via-red-500 to-orange-500 text-sm font-bold text-white shadow-lg shadow-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Book
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default DeleteModal;
