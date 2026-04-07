import axios from "axios";

const PayButton = ({ amount }: { amount: number }) => {

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };
    const handlePayment = async () => {
        const res = await loadRazorpay();

        if (!res) {
            alert("Razorpay SDK failed to load");
            return;
        }

        // 1. Create Order
        const { data: order } = await axios.post(
            `${import.meta.env.VITE_BACKEND_API_URL}/api/payment/create-order`,
            { amount }
        );

        // 2. Open Razorpay
        const options = {
            key: import.meta.env.VITE_RAZORPAY_PUBLIC_KEY, // public key
            amount: order.amount,
            currency: "INR",
            name: "LaptopMart",
            description: "Purchase",
            order_id: order.id,

            handler: async function (response: any) {
                // 3. Verify Payment
                const verifyRes = await axios.post(
                    `${import.meta.env.VITE_BACKEND_API_URL}/api/payment/verify-payment`,
                    response
                );

                if (verifyRes.data.success) {
                    alert("Payment Success ✅");
                } else {
                    alert("Payment Failed ❌");
                }
            },

            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
    };

    return (
        <button
            onClick={handlePayment}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        >
            Pay ₹{amount}
        </button>
    );
};

export default PayButton;