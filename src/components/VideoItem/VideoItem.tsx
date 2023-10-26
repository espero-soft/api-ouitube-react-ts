/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/10/2023 12:08:27
*/
import React, { FC, useEffect } from 'react';
import './VideoItem.css';
import { Video } from '../../models/Video';


interface VideoItemProps {
  video: Video
}


const VideoItem : FC<VideoItemProps> = ({video}) =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <li className="VideoItem">
          
      </li>
  );
}

export default VideoItem;