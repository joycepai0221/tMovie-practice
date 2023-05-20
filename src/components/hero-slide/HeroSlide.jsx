import React,{useState,useEffect,useRef} from 'react';
import SwiperCore,{Autoplay} from 'swiper';
import {Swiper,SwiperSlide} from'swiper/react';
import { useNavigate } from 'react-router-dom';

import './HeroSlide.scss'
import tmdbApi,{category,movieType} from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import Button,{OutlineButton} from '../../components/button/Button';
import Modal,{ModalContent} from '../../components/modal/Modal';

const HeroSlide = () => {
    const [movieItems,setMovieItems] = useState([]);
    SwiperCore.use([Autoplay]);
    useEffect(() => {
      const getMovies = async () => {
        const params = {page:1};
        try {
            const response = await tmdbApi.getMoviesList(movieType.popular,{params});
            setMovieItems(response.data?.results.slice(1,4));
        } catch (error) {
            console.log(error.message)
        }
      }
      getMovies();
    }, [])
    
  return (
    <div className="hero-slide">
        <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={1} autoplay={{delay:3000}}>
            {movieItems.map((item,i)=>(
            <SwiperSlide key={i}>
                {({isActive})=>(<HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`}/>)}
            </SwiperSlide>
            ))}
        </Swiper>
        {movieItems.map((item,i)=><TrailerModal key={i} item={item}/>)}
    </div>
  )
}

const HeroSlideItem = (props) => {
    let history = useNavigate();
    const  {item} = props;
    const background  = apiConfig.originalImage(item.backdrop_path?item.backdrop_path:item.poster_path);

    const setModalActive = async()=>{
      const modal = document.querySelector(`#modal_${item.id}`);
      console.log(modal)
      const videos = await tmdbApi.getVideos(category.movie,item.id);
      if(videos.results?.length > 0){
        const videoSrc = `https://www.youtube.com/embed/${videos.results[0].key}`;
        modal.querySelector('.modal__content>iframe').src = videoSrc;
      }else{
        modal.querySelector('.modal__content__info').innerHTML = 'No Trailer';
      }
      modal.classList.toggle('active');
    }
    return(
        <div className={`hero-slide__item ${props.className}`} style={{backgroundImage:`url(${background})`}}>
          <div className="hero-slide__item__content container">
            <div className="hero-slide__item__content__info">
              <h2 className="title">{item.title}</h2>
              <div className="overview">{item.overview}</div>
              <div className="btns">
                <Button onClick={()=>history("/movie/"+item.id)}>
                  Watch Now
                </Button>
                <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
              </div>
            </div>
            <div className="hero-slide__item__content__poster">
              <img src={apiConfig.w500Image(item.poster_path)} alt="" />
            </div>
          </div> 
        </div>
    )
}


const TrailerModal = props=>{
  const item = props.item;
  const iframeRef = useRef(null);
  const onClose = () => iframeRef.current.src = '';
  return (
  <Modal active={false} id={`modal_${item.id}`}>
    <ModalContent onClose={onClose}>
      <iframe ref={iframeRef} width="100%" height="500px" title="trailer" />
    </ModalContent>
  </Modal>
  )
}

export default HeroSlide;