"use client"

import Link from 'next/link';
import { useEffect, } from 'react';
import { FaMeh, FaEye, FaRegHeart, FaRegEyeSlash } from 'react-icons/fa';
import { useGlobalContext } from '../Context/memories';
import { Fragment, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import DeleteMemory from './DeleteMemory';

const MemoryCard = ({ data }) => {
    // console.log(data)
    let desc = data.desc
    // console.log(data)
    const [likes, setLikes] = useState(data.likes);
    const [dislikes, setDisLikes] = useState(data.dislikes);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisLiked] = useState(false);
    const [views, setViews] = useState(data.views);
    const URL = `http://localhost:5000/api`;
    let { setShowAlert } = useGlobalContext();



    const submitStatRequest = async (id, endpoint, initial_data) => {
        // console.log("Inside submitStatRequest: "+ id + +" " + endpoint + " " + initial_data)
        const requestOptions = {
            method: "POST",
            crossDomain: true,

            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                "Access-Control-Allow-Origin": "*"
            },

            body: JSON.stringify({
                old: initial_data
            })
        };
        fetch(`${URL}/memory/stats/${endpoint}/${id}`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                // setMessage({ message: data.message, status: data.status })
                // console.log(data)
                if (data.for == "like") {
                    setLikes(data.message)
                    setLiked(true);
                } else if (data.for == "dislike") {
                    setDisLikes(data.message)
                    setDisLiked(true);
                } else if (data.for == "view") {
                    setViews(data.message)
                }
            })
    }

    const like = () => {
        // console.log("like click")
        submitStatRequest(data._id, "like", likes);
        setShowAlert({
            message: "I Liked It",
            status: 1
        })
    }

    const dislike = () => {
        submitStatRequest(data._id, "dislike", dislikes)
        // console.log("dis-like click")
        setShowAlert({
            message: "I Dis-Liked It",
            status: 0
        })
    }

    useEffect(() => {

    }, [])

    const deleteNote = (id) => {
        // console.log("on clic delete ")
        // console.log(id + " <= id")
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <div className="flex flex-col justify-between rounded-md p-4 card bg-gray-500 relative" key={data._id}
            style={{ minHeight: "min-content" }}
        >
            <div className="card-image flex flex-row justify-center items-center">

                <Link href={`/memories/${data._id}`} onClick={() => submitStatRequest(data._id, "view", views)}>

                    <img className='text-transparent card_img'
                        style={{ objectFit: "scale-down" }}
                        src={data.image}
                        alt={data.name}
                        width="auto"
                        height="200px"
                    />
                </Link>
            </div>

            <div>

                <div className="name flex flex-row justify-center items-center">
                    <p className='capitalize font-bold'><span></span>{data.name}</p>
                </div>

                <div className=" metadata flex flex-row justify-between items-center">
                    <p className='text-white capitalize'><span></span>{data.mood}</p>
                    <p className='text-white'><span className='text-red-600'>@</span>{data.handle}</p>
            
                </div>

                <div className="text-ellipsis desc flex flex-row justify-start items-center desc_wrap">
                    {desc} ....
                </div>
            </div>

            {/* <div className="text-ellipsis desc flex flex-row justify-start items-center">
                        {desc} ....
                    </div> */}

            <div className="stats flex flex-row justify-between items-center text-xl w-full">
                <div className="likes flex flex-row items-center justify-between">
                    {

                        <>
                            <FaRegHeart className="cursor-none" title='likes' /><span className='text-sm'>{likes}</span>
                        </>
                    }
                </div>
                <div className="dislikes flex flex-row items-center justify-between">
                    {
                        <>
                            <FaMeh className='cursor-none' title='dislikes' /><span className='text-sm'>{dislikes}</span>
                        </>
                    }

                </div>
                <div className="cursor-pointer" title="Delete">
                    <DeleteMemory id={data._id} name={data.name} password={data.password}/>
                </div>
                <div className="view flex flex-row items-center justify-between">
                    <FaEye /> <span>{data.views}</span>
                </div>
            </div>
        </div>
        // <Card className=""
        //     sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        // >
        //     <CardMedia
        //         component="div"
        //         sx={{
        //             // 16:9
        //             pt: '56.25%',
        //         }}
        //         image={data.image}
        //     />
        //     <CardContent sx={{ flexGrow: 1 }}>
        //         <Typography gutterBottom variant="h5" component="h2">
        //         {data.name}
        //         </Typography>
        //         <Typography className="text-ellipsis desc desc_wrap">
        //         {desc}...
        //         </Typography>
        //     </CardContent>
        //     <CardActions>
        //         <Button size="small">View</Button>
        //         <Button size="small">Edit</Button>
        //     </CardActions>
        // </Card>
    )
}

export default MemoryCard

