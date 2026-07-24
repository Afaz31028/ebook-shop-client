"use client";
import Image from "next/image";
import { Button, Card } from "@heroui/react";
import { CalendarDays, BookOpen, User, Tag } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const BookDetailsPage = ({ bookData }) => {
    const {_id, title, image, writerName, description, price, genre, status, uploadedDate, writerId } = bookData;

    const { data: session } = authClient.useSession();
    const curUser = session?.user?.role;

    return (
        <div className="min-h-screen bg-[#121218] px-5 py-12">
            <Card className="max-w-6xl mx-auto bg-[#181820] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2 gap-10 p-8 md:p-12">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 blur-3xl opacity-20"/>
                        <div className="relative h-[520px] rounded-3xl overflow-hidden border border-gray-700">
                            <Image 
                                src={image} 
                                alt={title} 
                                fill 
                                className="object-cover transition duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                    {/* RIGHT DETAILS */}
                    <div className="flex flex-col justify-center">
                        {/* Genre Badge */}
                        <span className="w-fit rounded-full px-4 py-1 text-sm bg-[#252530] text-orange-400 border border-orange-500/30">
                            {genre}
                        </span>
                        <h1 className="mt-5 text-4xl font-bold text-white leading-tight">{title}</h1>
                        {/* Writer */}
                        <div className="mt-5 flex items-center gap-3">
                            <User className="text-orange-400" size={20}/>
                            <p className="text-gray-400">By
                                <Link 
                                    href={`/writers/${writerId}`}
                                    className="ml-2 text-white font-semibold hover:text-orange-400 transition"
                                >{writerName}</Link>
                            </p>
                        </div>
                        {/* Description */}
                        <p className="mt-6 text-gray-400 leading-7">{description}</p>
                        {/* Information */}
                        <div className="mt-7 grid grid-cols-2 gap-4">
                            <Info icon={<BookOpen size={18}/>} title="Status" value={status}/>
                            <Info icon={<Tag size={18}/>} title="Genre" value={genre}/>
                            <Info icon={<CalendarDays size={18}/>} title="Uploaded" value={uploadedDate}/>
                            <Info icon={<span>$</span>} title="Price" value={`$${price}`}/>
                        </div>
                        {/* Purchase Button */}
                        {
                            curUser==="writer" ? (<Button 
                            isDisabled={true}
                            className={`mt-8 h-14 rounded-xl text-lg font-bold transition bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black hover:scale-105}`}>
                            Purchase Book
                        </Button>) : 
                        (<form action={"/api/payment"} method="POST">
                            <input type="hidden" value={price} name="price" />
                            <input type="hidden" value={title} name="title" />
                            <input type="hidden" value={_id} name="bookId" />
                            <input type="hidden" value={writerId} name="writerId" />
                            <Button type="submit"
                                className={`mt-8 h-14 rounded-xl text-lg font-bold transition bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black hover:scale-105}`}>
                                    Purchase Book
                            </Button>
                        </form>)
                        }
                    </div>
                </div>
            </Card>
        </div>
    );
};

const Info = ({ icon, title, value }) => (
    <div className="rounded-xl bg-[#22222b] p-4 border border-gray-800">
        <div className="flex items-center gap-2 text-orange-400">
            {icon}
            <span className="text-sm">{title}</span>
        </div>
        <p className="mt-2 text-white font-semibold">{value}</p>
    </div>
);

export default BookDetailsPage;