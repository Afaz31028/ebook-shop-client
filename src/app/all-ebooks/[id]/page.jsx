import BookDetailsPage from '@/components/BookDetailsPage';
import React from 'react';

const EbookDetails = async({params}) => {
    const {id}= await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/book/${id}`);
    const bookData = await res.json();
    return (
        <div>
            <BookDetailsPage bookData={bookData}></BookDetailsPage>
        </div>
    );
};

export default EbookDetails;