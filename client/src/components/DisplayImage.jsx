import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bg-black bg-opacity-70 bottom-0 top-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4">
        <div
          onClick={onClose}
          className="w-fit ml-auto text-3xl hover:text-red-600 cursor-pointer"
        >
          <IoCloseOutline />
        </div>  
        <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
          <img src={imgUrl} className="w-full h-full " />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
