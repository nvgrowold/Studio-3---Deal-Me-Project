import { Link } from "react-router-dom";
import Moment from "react-moment";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function ListingItem({listing, id, onEdit, onDelete}) { //access object properties by destructure
  return (
      <li className="relative bg-sky-50 flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
        <Link className="contents" to={`/category/${listing}/${id}`}>
          <img className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy" src={listing.imgUrls[0]} alt=""/>
        </Link>
        {/* use react moment package to display how long the listing had been created */}
        {/* npm install react-moment */}
        <Moment className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg" fromNow>{listing.timestamp?.toDate()}</Moment>
        <p className="font-semibold m-0 text-xl truncate">{listing.productName}</p>
        <p className="text-[#457b9d] mt-2 font-semibold">
            Price: NZ${listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}      
        </p>

        {onDelete && (
          <FaTrash
            className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
            onClick={() => onDelete(listing.id)}
          />
        )}
        {onEdit && (
          <MdEdit
            className="absolute bottom-2 right-7 h-4 cursor-pointer "
            onClick={() => onEdit(listing.id)}
          />
        )}

      </li>
  )
}

//Adding loading="lazy" to your <img> tag is a good practice for improving the performance of your web page, especially if it contains many images. This attribute tells the browser to defer loading the image until it's about to come into the viewport. It's a form of lazy-loading that can significantly reduce initial page load time, save bandwidth, and improve user experience by loading images only when needed.
