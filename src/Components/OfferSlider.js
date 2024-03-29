import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';

export default function OfferSlider() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }

    fetchListings();
  }, []);

  if (loading) return <Spinner />;
  if (listings.length === 0) return null;

  return (
    <Fade duration={3000} transitionDuration={1000}>
      {listings.map((listing) => (
        <div key={listing.id} className="each-slide" onClick={() => navigate(`/category/${listing.data.category}/${listing.id}`)}>
          <div style={{ ...divStyle, backgroundImage: `url(${listing.data.imgUrl})` }}>
            <span>{listing.data.name}</span>
          </div>
        </div>
      ))}
    </Fade>
  );
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '450px',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};
