import React, { useEffect } from 'react'
import Card from "./Card"
import axios from 'axios'
import { useState } from 'react'
import Slider from './Slider'
import SliderLittle from './LittleSlider/SliderLittle'
import FooterBlock from "./Footer/FooterBlock"
import Form from './Form'

const Main = () => {
    const [url,setUrl]=useState('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2d2e14270ecc39575bf621ded749283d&hash=08293696a10ad1eda71ccb60d59b210e');
    const [item,setItem]=useState();
    const [search, setSearch]=useState("");

    useEffect(()=> {
        const fetch=async()=>{
            const res=await axios.get(url)
            setItem(res.data.data.results)
        }
        fetch();
    }, [url])

    const searchHero=()=>{
        setUrl (`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=2d2e14270ecc39575bf621ded749283d&hash=08293696a10ad1eda71ccb60d59b210e`)
    }
    
    const [theme, setTheme] = useState(
        localStorage.getItem('theme'));
    const toggleTheme = () => {
        if (theme === 'light') {
          setTheme('dark');
        } else {
          setTheme('light');
        }
    };
      
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
      }, [theme]);

    return (
    <>
        <div className='header'>
            <div className='header__bg'>
                <Slider/>
            </div>
            <div className='themeColor'id={theme}>
                <button className='theme btn' onClick={toggleTheme}>Toggle Theme</button>
            <div className='header__search'>
                <img src='./Images/Marvel_Logo.svg.png' alt='logo'/>
                <input type="search" placeholder='Search for Hero' 
                className='header__search-field'
                onChange={e=>setSearch(e.target.value)}
                onKeyPress={searchHero}/>
            </div>
        </div>
        <div className='content'>
        {
            (!item)?<p>Not found</p>:<Card data={item}/>
        }
        </div>
        <div>
            <h1 className='main__title'>MORE POPULAR</h1>
            <SliderLittle/>
        </div>
            <Form/>
            <FooterBlock/>
        </div>       
    </> 
  )
}

export default Main;
