import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import Loading from "../components/Loading";
import InputSuggestionVerticalCard from "../components/InputSuggestionVerticalCard";
import BackButton from "../components/BackButton";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    const res = await fetch(SummaryApi.searchProducts.url + query.search);
    const api = await res.json();
    setLoading(false);
    setData(api.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-125px)]">
      <BackButton/>
      {loading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}

      {data.length === 0 && !loading && (
        <p className="text-slate-300 lg:text-5xl md:text-4xl text-3xl  text-center p-4 font-semibold">
          No Data Found
        </p>
      )}

      {data.length !== 0 && !loading && (
        <div>
          <p className="text-slate-500 text-xl my-3">
            Search Results :{" "}
            <span className="text-red-600">{data.length}</span>
          </p>
          <InputSuggestionVerticalCard loading={loading} data={data} />
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
