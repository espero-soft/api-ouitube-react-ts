/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/10/2023 12:08:27
*/
import React, { FC, useEffect, useState } from 'react';
import './VideoList.css';
import { getVideos } from '../../api/api-video';
import VideoItem from '../VideoItem/VideoItem';
import { Video } from '../../models/Video';


interface VideoListProps {

}


const VideoList: FC<VideoListProps> = () => {

  const [datas, setDatas] = useState<any>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      const data = await getVideos()
      if(data.isSuccess){
        console.log(data);
        setDatas(data)
      }
    }
    runLocalData()
  },[])


  return (
    <ul className="VideoList">
      {
        datas?.results?.map((data: Video)=>{
          return <VideoItem key={data?._id} video={data} />
        })
      }
      VideoList Component
    </ul>
  );
}

export default VideoList;