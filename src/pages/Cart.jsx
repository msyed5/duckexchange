import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { authentication, db } from "../backend/firebase-config";
import { toast } from "react-toastify";
//import "./css/Cart.css";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = Number(temp) + Number(cartItem.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
    };

    console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: authentication.currentUser.email,
      userid: authentication.currentUser.uid,
    };

    try {
      setLoading(true);
      const result = await addDoc(collection(db, "orders"), orderInfo);
      setLoading(false);
      toast.success("Order placed successfully");
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("Order failed");
    }
  };

  return (
    <div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <h3>
                  {" "}
                  <img
                    src={
                      "https://i.pinimg.com/originals/f5/43/45/f543457069261f595ed8b896746099fb.jpg"
                    }
                    height="100"
                    width="100"
                  />
                  {item.title}
                </h3>
                <td>${item.price}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteFromCart(item)}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-center" id="subtotal">
        <h1 className="total-amount">Subtotal: ${totalAmount}</h1>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button className="btn-lg btn-primary" onClick={handleShow}>
          Checkout
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="register-form">
            <input
              type="text"
              className="form-control"
              placeholder="Ship to: "
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <textarea
              className="form-control"
              rows={3}
              type="text"
              className="form-control"
              placeholder="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />

            <input
              type="number"
              className="form-control"
              placeholder="phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={placeOrder}>
            ORDER
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CartPage;
