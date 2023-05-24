import React from 'react';
import { StyledHero, StyledIframe, CarouselContainer, CarouselCard, CarouselCardText } from './styles';
import heroImage from '../../Assets/placeholder.jpeg'
import valves from '../../Assets/valves.png';
import laney from '../../Assets/laney.png';
import quality from '../../Assets/quality.png';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Hero:React.FC = () => 
    <Carousel 
        autoPlay={false} 
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop
        interval={6000}>
        <CarouselContainer>
            <CarouselCard 
                horizontalOffsetType='right' 
                horizontalOffset='50'
                verticalOffsetType='top'
                verticalOffset='50'
            >
                <h1>Lovingly crafted using the finest ingredients</h1>
                <hr></hr>
                <p>"If you want to make a rock and roll ommlette, you have to break some sound barriers" <br />- Winston Churchill</p>
            </CarouselCard>
            <StyledIframe src='https://player.vimeo.com/video/813596415?api=1&player_id=video-iframe-1&html5=1&autopause=0&autoplay=1&badge=0&byline=0&loop=1&title=0&background=1&mute=1' />
        </CarouselContainer>
        <CarouselContainer>
            <CarouselCard 
                horizontalOffsetType='left' 
                horizontalOffset='50'
                verticalOffsetType='bottom'
                verticalOffset='50'
            >
                <h1>The finest minds in the business</h1>
                <hr></hr>
                <p>"Sometimes, you know... you have to...like.. you know.... come up with the song all by yourself...... you know." <br />- George W. Bush</p>
            </CarouselCard>
            <img src={valves} />
        </CarouselContainer>
        <CarouselContainer>
            <CarouselCard 
                    horizontalOffsetType='left' 
                    horizontalOffset='50'
                    verticalOffsetType='bottom'
                    verticalOffset='500'
                >
                <h1>I spent all my money so that you dont have to</h1>
                <hr></hr>
                <p>"This noise is actually quite soothing" <br />- Marcus Aurelius</p>
            </CarouselCard>
            <img src={quality} />
        </CarouselContainer>
        <CarouselContainer>
            <CarouselCard 
                    horizontalOffsetType='left' 
                    horizontalOffset='50'
                    verticalOffsetType='top'
                    verticalOffset='50'
                >
                <h1>For some reason I keep buying British built stuff.</h1>
                <hr></hr>
                <p>"Yabadabadooooooooo" <br />- Ghandi</p>
            </CarouselCard>
            <img src={laney} />
        </CarouselContainer>
    </Carousel>

export default Hero;