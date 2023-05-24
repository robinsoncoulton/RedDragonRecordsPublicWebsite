import styled from 'styled-components';

export const StyledHero = styled.img`
    width: 100%;
`

export const StyledIframe = styled.iframe`
    width: 1440px !important;
    height: 1050px !important;
    margin: 0 !important;
`;

export const CarouselContainer = styled.div`
    width: 100%;
    height: 100%;
    
`;

interface CardProps {
    verticalOffsetType?: 'top' | 'bottom'
    verticalOffset?: string,
    horizontalOffsetType?: 'right' | 'left',
    horizontalOffset?: string,
}

export const CarouselCard = styled.div<CardProps>`
    position: absolute;
    right: ${(props) => props.horizontalOffsetType === 'right' && props.horizontalOffset ? `${props.horizontalOffset}px` : 'unset'};
    left: ${(props) => props.horizontalOffsetType === 'left' && props.horizontalOffset ? `${props.horizontalOffset}px` : 'unset'};
    top: ${(props) => props.verticalOffsetType === 'top' && props.verticalOffset ? `${props.verticalOffset}px` : 'unset'};
    bottom: ${(props) => props.verticalOffsetType === 'bottom' && props.verticalOffset ? `${props.verticalOffset}px` : 'unset'};
    z-index: 1;
    padding: 50px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    max-width: 500px;
    word-wrap: wrap;
`
export const CarouselCardText = styled.p`
    color: white;
`;