import { Link } from "react-router-dom";

const SoldItem = ({soldPrice, commission, firstName, lastName }) => {

    return (
        <div className="relative bg-sky-50 flex flex-col justify-between shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px] pl-3">
          <p className="text-[#457b9d] mt-2 pl-2 font-semibold">Sold Price: ${soldPrice}</p>
          <p className="text-[#457b9d] mt-2 pl-2 font-semibold">Commission: ${commission.toFixed(2)}</p>
          <p className="text-[#457b9d] mt-2 pl-2 font-semibold">Buyer: {firstName} {lastName}</p>
          {/* Add any other sold information here */}
        </div>
    );
  };
  
  export default SoldItem;