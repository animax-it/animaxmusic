import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Stack, Typography, Grid, IconButton, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout';

const MyWork: NextPage = () => {
  const [workLink , setWorkLink] = useState([])
  const [loading, setLoading] = useState(true)
  const prefix = 'https://drive.google.com/file/d/'
  const postfix = '/preview'

  useEffect(()=>{
    fetch(`https://www.googleapis.com/drive/v2/files?q='1VQ0kMfX0w2t3upP4AE1ntru4PwEdkdnq'+in+parents&key=AIzaSyCzj7yb5cndhqdKnZNRLwetPPrmaoNAobA`)
    .then((resp)=> resp.json())
    .then((res)=> {
      let newArray = [] as any
      res.items.map((item: { id: string; })=>{
        newArray.push(prefix+item.id+postfix)
      })
      setWorkLink(newArray)
  
    })

    setTimeout(()=>{
      setLoading(false)
    }, 12000)
  }, [])

  const { t } = useTranslation('work');


  return (
    <Layout pageTitle={t('page-title')} centered>
      <Stack flex={1} id="about-container" justifyContent="flex-start" height="100%" direction="column" spacing="10px" width="100%">
        <Typography alignSelf="center" color="white.main" variant="h2" zIndex={2}>
          {t('title')}
        </Typography>

        <Grid container rowGap={3} columnGap={10} justifyContent="center">
          {workLink.map((videoUrl, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '177.77%'}}>
                {loading && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <CircularProgress />
                  </div>
                )}
                {/* <IconButton> */}
                  <iframe
                    style={{
                      position: 'absolute', top: 0, left: 0,  bottom: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none'
                    }} 
                    src={videoUrl}
                    allowFullScreen 
                  />
                {/* </IconButton> */}
              </div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Layout>
  );
};

export default MyWork;
