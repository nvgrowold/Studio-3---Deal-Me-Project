import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import React from "react";
import Header from "../../Components/Header";
import SideNav from "../SideNav";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredlistings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true); // Set loading to true before fetching data
      try {
        const listingsRef = collection(db, "listings");
        const querySnapshot = await getDocs(listingsRef);
        let listings = [];
        querySnapshot.forEach((doc) => {
          listings.push({
            key: doc.id, // Set the key to the document ID
            ...doc.data(),
          });
        });
        setListings(listings);
        setFilteredlistings(listings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    }
    fetchListings();
  }, []);

  return (
    <div>
      <Header/>
      <SideNav/>
      <div style={{ marginLeft: '15%', textAlign: 'center' }}>
        <Typography.Title level={4}>Inventory</Typography.Title>
        <Table
          loading={loading}
          columns={[
            
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
              render: (value) => <span>${value}</span>,
            },
            {
              title: "Rating",
              dataIndex: "rating",
              key: "rating",
              render: (rating) => {
                return <Rate value={rating} allowHalf disabled />;
              },
            },
            {
              title: "Stock",
              dataIndex: "stock",
              key: "stock",
            },
            
            {
              title: "Category",
              dataIndex: "category",
              key: "category",
            },
          ]}
          dataSource={listings} // Set dataSource to the listings state variable
          pagination={{ pageSize: 10 }} // Set pagination options
        />
      </div>
    </div>
  );
}

export default Inventory;
