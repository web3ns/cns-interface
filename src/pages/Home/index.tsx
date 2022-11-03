import React from 'react';
import PageWrapper from '@components/Layout/PageWrapper';
import StatusSearch from '@modules/StatusSearch';
import isMobile from '@utils/isMobie';
import homeBg from '@assets/images/home-bg.png';
import homeBgWebp from '@assets/images/home-bg.webp';
import homeBgMobile from '@assets/images/home-bg-mobile.png';
import homeBgWebpMobile from '@assets/images/home-bg-mobile.webp';

const Home: React.FC = () => {
  return (
    <PageWrapper className="pt-230px">
      <p className="mb-48px text-center text-32px leading-38px text-grey-normal font-bold lt-md:text-30px lt-md:mb-24px lt-md:leading-36px">SHUTU NAME Service</p>
      <StatusSearch where='home'/>

      <picture className="absolute top-0px left-1/2 -translate-x-1/2 w-1512px -z-1 pointer-events-none lt-md:w-full">
        {!isMobile() && <source srcSet={homeBgWebp} type="image/webp" />}
        {!isMobile() && <img className="w-full" src={homeBg} alt="background image" />}
        {isMobile() && <source srcSet={homeBgWebpMobile} type="image/webp" />}
        {isMobile() && <img className="w-full" src={homeBgMobile} alt="background image" />}
      </picture>
    </PageWrapper>
  );
};

export default Home;
