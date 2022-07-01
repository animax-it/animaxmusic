import Image from 'next/image';
import useAppDimensions from '../hooks/useAppDimensions';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';

import indexBGDesktop from '../public/images/main-page-background.png';
import indexBGMobile from '../public/images/main-page-background-mobile.png';
import aboutDesktop from '../public/images/about-me-photo-desktop.png';

export default function BGImage() {
  const router = useRouter();
  const { isMobile } = useAppDimensions();

  const landingBG = isMobile ? indexBGMobile : indexBGDesktop;

  const aboutBG = isMobile ? aboutDesktop : aboutDesktop;

  const IndexGradient = () => {
    const height = isMobile ? '50%' : '100%';
    const width = isMobile ? '100%' : '50%';

    if (isMobile)
      return (
        <Box
          height={height}
          id="index-gradient-mobile"
          left={0}
          bottom={0}
          position="fixed"
          width={width}
          zIndex={1}
        />
      );
    return (
      <Box
        height={height}
        id="index-gradient-desktop"
        left={0}
        position="fixed"
        width={width}
        zIndex={1}
      />
    );
  };

  const BGImageContainer = () => {
    switch (router.pathname) {
      case '/':
        return (
          <Box
            zIndex={0}
            style={{
              width: '100%',
              height: '100%',
              filter: isMobile ? 'blur(0.7px)' : 'blur(1px)',
            }}
          >
            <Image
              src={landingBG.src}
              alt="main-page-background"
              layout="fill"
              objectFit="cover"
              loading="lazy"
            />
          </Box>
        );
      case '/about':
        return (
          <Stack
            height="100%"
            width="100%"
            id="about-me-bg"
            justifyContent="center"
          >
            <Box
              zIndex={0}
              maxHeight="900px"
              style={{
                filter: isMobile ? 'blur(0.7px)' : 'blur(1px)',
                height: '100%',
                position: 'fixed',
                right: 0,
                width: '70%',
              }}
            >
              <Image
                src={aboutBG.src}
                alt="main-page-background"
                layout="fill"
                objectFit="contain"
                loading="lazy"
              />
            </Box>
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {router.pathname === '/' && <IndexGradient />}

      <BGImageContainer />
    </>
  );
}
