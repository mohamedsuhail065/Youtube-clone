import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import suhail from "../../assets/suhail.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, view_converter } from "../../data";
import moment from "moment/moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const {videoId}=useParams()
  const [apiData, setApiData] = useState();
  const [channelData, setChannelData] = useState();
  const[commentData,setCommentData]=useState([])
  const fetchData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchOtherData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));
      const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
      await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
  };

  useEffect(() => {
    console.log(videoId);
    fetchData();
  }, [videoId]);
  useEffect(() => {
    fetchOtherData();
  }, [apiData]);
  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title"}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? view_converter(apiData.statistics.viewCount) : "16k"}{" "}
          &bull;{" "}
          {apiData
            ? moment(apiData.snippet.publishedAt).fromNow()
            : "2 days ago"}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? view_converter(apiData.statistics.likeCount) : "1k"}
          </span>
          <span>
            <img src={dislike} alt="" />2
          </span>
          <span>
            <img src={share} alt="" />
            share
          </span>
          <span>
            <img src={save} alt="" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? view_converter(channelData.statistics.subscriberCount)
              : "1 M"} Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Kukku is the best"}
        </p>
        <hr />
        <h4>
          {apiData ? view_converter(apiData.statistics.commentCount) : "130"}{" "}
          comments
        </h4>
        {commentData?commentData.map((item,index)=>{
          return(
<div key={index} className="comment">
          <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
          <div>
            <h3>
            {item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span>
            </h3>
            <p>
            {item.snippet.topLevelComment.snippet.textDisplay}
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>{view_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
          )
        }):''}
        
        
        
      </div>
    </div>
  );
};

export default PlayVideo;
