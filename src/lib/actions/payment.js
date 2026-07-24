
export const payment = async(data) => {

    const res= await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const paymentData= await res.json();
    return paymentData;
};