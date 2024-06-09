"use client";

import { useState, useEffect } from "react";
import { setCookie, parseCookies } from 'nookies';
import { useAtom } from "jotai";
import { IS_FAVORITE } from "../jotai/atom";

type ButtonFavoriteProps = {
    image_id: Number;
    is_favorite: Boolean;
}

export const ButtonFavorite = ({ image_id, is_favorite } : ButtonFavoriteProps) => {
    const cookies = parseCookies();
    const [isFavorite, setIsFavorite] = useAtom(IS_FAVORITE);
    const [favorite, setFavorite] = useState(is_favorite);
    const [disable, setDisable] = useState(false);

    const postData = async () => {
        // ユーザーIDと画像IDを送信
        const res = await fetch(process.env.NEXT_PUBLIC_API_FAVORITE || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: cookies.uuid,
                image_id: image_id,
            }),
        })
        const data = await res.json();
    }

    const handleClick = () => {
        if(disable) return;

        setDisable(true)

        if(!favorite) setIsFavorite(true);
        setFavorite(!favorite);
        postData()
        
        setTimeout(() => {
            setDisable(false)
            if(!favorite) setIsFavorite(false);
        }, 1000);
    }

    return (
        <button onClick={handleClick} className={`flex justify-center items-center w-full h-full border-[2px] rounded-lg ${favorite ? 'border-yellow-300' : 'border-white'}`}>
            <svg viewBox="0 0 512 512" className="relative top-[-1px] w-[19px] h-[19px]">
                <path d="M512,209.015c0-4.653-0.716-9.372-2.19-13.952l-0.008-0.014c-6.077-18.85-23.6-31.616-43.403-31.623H338.382
                    l-38.97-121.336c-6.062-18.858-23.59-31.652-43.41-31.659c-19.835,0.007-37.352,12.801-43.414,31.652l19.706,6.336l-19.706-6.329
                    l-38.97,121.336H45.601c-19.803,0.007-37.327,12.773-43.408,31.623l-0.004,0.014c-1.474,4.581-2.19,9.3-2.19,13.952
                    c-0.007,14.406,6.85,28.322,19.023,37.06l-0.011-0.014l103.702,74.452L82.794,441.704l0.007-0.021
                    c-1.55,4.689-2.302,9.515-2.302,14.29c-0.006,14.319,6.776,28.135,18.782,36.88l0.015,0.008c7.976,5.789,17.418,8.716,26.804,8.709
                    c9.44,0.007,18.944-2.942,26.945-8.803l0.007-0.008l102.95-75.443l102.942,75.443l0.022,0.008c7.99,5.854,17.491,8.81,26.934,8.803
                    c9.374,0.007,18.825-2.913,26.804-8.709l0.011-0.008c12.015-8.753,18.8-22.568,18.786-36.894c0-4.761-0.741-9.58-2.284-14.255
                    L389.29,320.512l103.694-74.452l-0.01,0.007C505.138,237.337,512.007,223.421,512,209.015z M468.852,212.431h-0.007L352.805,295.75
                    c-7.364,5.286-10.421,14.686-7.587,23.288l44.684,135.611l0.201,1.309c0,1.323-0.619,2.604-1.752,3.423l0.015-0.007
                    c-0.756,0.546-1.575,0.791-2.467,0.798c-0.895-0.007-1.736-0.258-2.506-0.812l0.014,0.007l-115.169-84.405
                    c-7.264-5.322-17.206-5.322-24.47,0L128.592,459.36c-0.758,0.554-1.593,0.805-2.492,0.812c-0.888-0.007-1.715-0.252-2.47-0.805
                    c-1.122-0.82-1.73-2.086-1.737-3.395l0.212-1.301l0.006-0.022l44.67-135.611c2.833-8.609-0.227-18.002-7.592-23.288L43.152,212.431
                    l-0.007-0.007c-1.119-0.784-1.744-2.071-1.752-3.409l0.201-1.273c0.558-1.748,2.194-2.927,4.006-2.92H188.71
                    c9.001,0,16.955-5.804,19.706-14.377L252,54.74c0.553-1.734,2.19-2.92,4.002-2.912c1.805-0.008,3.445,1.179,4.002,2.919
                    l43.579,135.698c2.748,8.573,10.706,14.377,19.706,14.377h143.11c1.812-0.007,3.448,1.172,4.002,2.92l0.202,1.273
                    C470.596,210.353,469.977,211.633,468.852,212.431z" className={favorite ? 'fill-yellow-300' : 'fill-white'}></path>
            </svg>
        </button>
    );
}