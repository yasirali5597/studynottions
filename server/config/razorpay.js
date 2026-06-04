const Razorpay = require("razorpay")




exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,

})

// created by me 

  exports.getKey = (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            key: process.env.RAZORPAY_KEY,
        });
    }    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

// created by me 
exports.capturePayment = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: "receipt#1",
        };  
        const order = await instance.orders.create(options);
        return res.status(200).json({
            success: true,
            order,
        });
    }    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}