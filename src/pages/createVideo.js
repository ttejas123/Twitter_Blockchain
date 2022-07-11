import React, { useState } from 'react';

function Alloutes(props) {
//   videoUrl={videoUrl} setVideoUrl={setVideoUrl}
//   const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  return (
    <>
        <div className='h-[100vh] flex justify-center items-center w-[100%] bg-transparent' onClick={() => props.setVisible(!props.visible)}></div>
        <div className="flex justify-center items-center w-[100%] absolute top-[30%]">
            <div className="bg-white w-[90%] rounded-lg flex flex-col justify-center items-center py-5">
            
            <div className="font-bold text-xl">Upload Tiktok</div>
            
            <div className="my-5 flex flex-col justify-center items-center w-[100%]">
                <div className="text-md text-left w-[90%]">Description:</div>
                <input className="bg-gray-200 rounded-md py-[8px] mb-1 w-[90%]" value={props.description} onChange={(e)=> props.setDescription(e.target.value)} />
                <div className="text-md text-left w-[90%]">Video Url:</div>
                <input className="bg-gray-200 rounded-md py-[8px] px-[3px] w-[90%]" value={props.videoUrl} onChange={(e)=> props.setVideoUrl(e.target.value)} />
            </div>
            
            <div className="bg-purple-700 rounded-lg w-[80%] text-center text-white py-[9px] font-bold cursor-pointer " onClick={() => {
                // props.signup(description, url)
                // props.setVideoUrl(url)
                // props.setDescription(description)
                props.newVideo();
                props.setVisible(!props.visible)
            }}>Upload</div>
            </div>
        </div>
    </>
  );
}

export default Alloutes;
