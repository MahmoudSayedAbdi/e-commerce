import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

export default function Cart() {

  let [category ,setCategory] = useState("sports")

  function getNews(data) {
console.log(data.queryKey[1]);

    return axios.get(`https://newsapi.org/v2/top-headlines?category=${data.queryKey[1]}&apiKey=37f9c15cd6b247f68ed52c24cee26081`
      
      
    )
  }


  let { data, isError, isFetched, error, isLoading } = useQuery({
    queryKey: ["news" , category],
    queryFn: getNews,
  })

  // console.log(data?.data?.articles)
  if (isLoading) {
    return <h2>Loading.....</h2>
  }

  if (isError) {
    return <h2>isError.....</h2>
  }

  return (
    <div>
      <select onChange={(e)=>{setCategory(e.target.value)}} name="" className="w-50 rounded bg-green-500 px-2 py-1 m-5 " id="">
        <option value="health">health</option>
        <option value="entertainment">entertainment</option>
        <option value="science">science</option>
        <option value="sports">sports</option>
      </select>
<div className="flex flex-wrap">
      {data?.data?.articles?.map((element) => {
        let { title, urlToImage } = element
        return <div className="w-3/12">
          <img className="w-full h-48" src={urlToImage} alt="" />
          <h2>{title}</h2>
        </div>
      })}
    </div>
    </div>
  );
}
