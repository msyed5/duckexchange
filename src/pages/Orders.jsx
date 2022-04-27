import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, authentication } from "../backend/firebase-config";
function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userid = authentication.currentUser.uid;
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(db, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div>
    <div className='p-2'>



    {orders.filter(obj=>obj.userid == userid).map((order) => {
        return (
          <table className="table mt-3 order">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((item) => {
                return (
                  <tr>
                    <td><img src={"https://i.pinimg.com/originals/f5/43/45/f543457069261f595ed8b896746099fb.jpg"} height="80" width="80" />
{item.title}</td>
                    <td>${item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
      })}
    </div>
    </div>
  );
}

export default OrdersPage;
