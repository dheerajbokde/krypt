import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

const useFetch = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState('');

    const gifArray = [
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284",
        "https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif",
        "https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif",
        "https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif",
        "https://i.pinimg.com/originals/73/d3/a1/73d3a14d212314ab1f7268b71d639c15.gif",
        "https://www.omnisend.com/blog/wp-content/uploads/2016/09/funny-gifs-9.gif"
    ];
    var randomIndex = Math.floor(Math.random() * gifArray.length);
    var randomElement = gifArray[randomIndex];

    const fetchGif = async () => {
        try {
            // const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            // const { data } = await response.json();
            // setGifUrl(data[0]?.images?.downsized_medium?.url);
            setGifUrl(randomElement);
        } catch (error) {
            // setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284');
            setGifUrl(randomElement);
        }
    }

    useEffect(() => {
        if (keyword) fetchGif();
    }, [keyword])

    return gifUrl;
}

export default useFetch;