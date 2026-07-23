import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button, Modal } from "@heroui/react";
import { FaBookOpen } from "react-icons/fa";
import EditBook from "./EditBook";

export function EditModal({ book }) {
  return (
    <Modal className="w-300">
      <Button
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-blue-400/20 bg-blue-400/10 px-3 text-xs font-semibold text-blue-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-400/20"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="w-250">
            <Modal.CloseTrigger />
            <Modal.Header>
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-yellow-400 via-orange-400 to-red-600 rounded-t-2xl" />

              <div className="flex flex-col items-center gap-3 pt-8 pb-2">
                <div className="p-3 rounded-2xl bg-linear-to-br from-yellow-400/20 to-red-600/20 border border-white/10">
                  <FaBookOpen className="w-8 h-8 text-yellow-400" />
                </div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-red-600 bg-clip-text text-transparent">
                  Edit the Book Details
                </h1>
              </div>
            </Modal.Header>
            <Modal.Body>
              <EditBook book={book}></EditBook>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default EditBook;
