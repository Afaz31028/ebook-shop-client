import { Button, Card } from "@heroui/react";
import Image from "next/image";
import React from "react";

const DisplayAllBooks = ({ bookItem }) => {
    const { title, price, image, writerName, genre } = bookItem;

    return (
        <div className="group">
            <Card
                className="overflow-hidden w-90 rounded-3xl bg-[#181820] border border-gray-800 shadow-lg"
            >
                {/* Book Cover */}
                <div className="relative p-4">
                    <div className="absolute inset-0
                        bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 blur-3xl
                        group-hover:opacity-20 transition"
                    />

                    <div className="w-60 mx-auto h-60 overflow-hidden rounded-2xl bg-[#22222b]">
                        <Image
                            src={image}
                            alt={title}
                            height={100}
                            width={100}
                            className="w-60 h-60"
                        />
                    </div>
                </div>

                {/* Book Details */}
                <div className="px-3 pb-4">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-lg font-boldtext-white truncategroup-hover:text-orange-400 transition">{title}</h2>
                        <span
                            className="shrink-0 rounded-full bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 px-3 py-1 text-sm font-bold
                            text-black">${price}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-400">Written by<span className="ml-1 text-gray-200 font-medium">{writerName}</span></p>
                    {genre && (<span className="inline-block mt-3 rounded-full bg-[#24242d] px-3 py-1 text-xs text-orange-400 border
                            border-orange-500/30">
                        {genre}</span>
                    )}
                    <Button className="mt-5 h-12 w-full rounded-xl bg-linear-to-r from-yellow-400 via-orange-500 to-red-500
                        text-black font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-orange-500/20"
                    >
                        Buy Now
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default DisplayAllBooks;
