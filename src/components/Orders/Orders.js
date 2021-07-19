import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "../../utils/StateProvider";
import { db } from "../../utils/firebase";
import Order from "../Order/Order";

const Orders = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("[Orders.js] User Found");
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      console.log(db.collection("users").doc(user?.uid).collection("orders"));
    } else {
      console.log("[Orders.js] User Not Found");
      setOrders("[]");
    }
  }, []);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order key={Math.random()} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
