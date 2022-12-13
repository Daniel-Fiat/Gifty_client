import axios from "axios"

const PayButton = (propos) => {

    const handleCheckout = () => {
        axios.post("http://localhost:5005/stripe/checkout").then(res => {
            console.log(res)
        })
    }


    return (
        <>
            <button onClick={(() => handleCheckout())}>Check Out</button>
        </>
    )
}


