import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Stack, Typography, Grid, IconButton, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout';

const MyWork: NextPage = () => {
  const { t } = useTranslation('work');
  const workLinks: string[] = t('body', { returnObjects: true });
  const [loading, setLoading] = useState<boolean[]>(new Array(workLinks.length).fill(true));

  const handleLoad = (index: number) => {
    const updatedLoading = [...loading];
    updatedLoading[index] = false;
    setLoading(updatedLoading);
  };

  return (
    <Layout pageTitle={t('page-title')} centered>
      <Stack flex={1} id="about-container" justifyContent="flex-start" height="100%" direction="column" spacing="10px" width="100%">
        <Typography alignSelf="center" color="white.main" variant="h2" zIndex={2}>
          {t('title')}
        </Typography>

        <Grid container spacing={2}>
          {workLinks.map((videoUrl, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                {loading[index] && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <CircularProgress />
                  </div>
                )}
                <IconButton>
                  <iframe
                    width="100%"
                    height="100%"
                    src={videoUrl}
                    frameBorder="0"
                    allowFullScreen
                    onLoad={() => handleLoad(index)}
                  />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Layout>
  );
};

export default MyWork;
