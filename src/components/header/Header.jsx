import React,{useEffect, useRef} from 'react';
import { Link,useLocation } from 'react-router-dom';

import './Header.scss';
import logo from '../../assets/tmovie.png';

const headerNav=[
    {display:'Home',path:'/'},
    {display:'Movies',path:'/movie'},
    {display:'TV Series',path:'/tv'},
]

const Header = () => {
const {pathname} = useLocation();
const headerRef = useRef(null);

// 返回一個index所在位置
const active = headerNav.findIndex(e=>e.path === pathname);
useEffect(()=>{
    const shrinkHeader = () => {
        if(document.body.scrollTop>100 || document.documentElement.scrollTop>100){
        headerRef.current.classList.add('shrink');
    }else{
        headerRef.current.classList.remove('shrink');
    }
    window.addEventListener('scroll',shrinkHeader);
    return ()=>{
        window.removeEventListener('scroll',shrinkHeader);
    };
}},[])
  return (
    <div className="header" ref={headerRef}>
        <div className="header__wrap container">
            <div className="logo">
                <img src={logo} alt="" />
                <Link to="/">tMovies</Link>
            </div>
            <ul className="header__nav">
                {headerNav.map((nav,i)=>(
                    <li key={i} className={`${i === active?'active':""}`}>
                        <Link to={nav.path}>{nav.display}</Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Header