import React, { useEffect, useState } from "react";
import "./Recommended.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import { API_KEY, view_converter } from "../../data";
import { Link } from "react-router-dom";
const Recommended = ({ categoryId }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=35&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data.items));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    
    <div className="recommended">
      {data?data.map((item,index)=>{
        return(
<Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
        <img src={item.snippet.thumbnails.default.url} alt="" />
        <div className="vid-info">
          <h4>{item.snippet.title}</h4>
          <p>{item.snippet.channelTitle}</p>
          <p>{view_converter(item.statistics.viewCount)}</p>
        </div>
      </Link>
        )
      }):""}
      
      
    </div>
  );
};

export default Recommended;
