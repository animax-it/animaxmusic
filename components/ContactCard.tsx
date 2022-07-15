import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { send } from 'emailjs-com';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

import Theme from '../app/Theme';
import useAppDimensions from '../hooks/useAppDimensions';
import { Email, Phone } from './Icons';

export default function ContactCard() {
  const { isMobile } = useAppDimensions();

  const validationSchema = yup.object({
    reply_to: yup
      .string()
      .email('enter a valid email')
      .required('email is required'),
    message: yup.string().required('please type a message'),
    from_name: yup.string().required('please add your name'),
  });

  const colors = Theme.palette;

  const inputProps = {
    sx: {
      // @ts-ignore: Unreachable code error
      bgcolor: colors.black[600],
      // @ts-ignore: Unreachable code error
      color: colors.white[200],
      fontFamily: 'Roboto',
    },
  };

  return (
    <Stack direction="column" spacing={isMobile ? '10px' : '20px'}>
      <Stack
        bgcolor="black.700"
        borderRadius="5px"
        direction="column"
        padding={isMobile ? '15px' : '20px'}
        spacing={isMobile ? '10px' : '20px'}
        zIndex={5}
      >
        <Stack direction="row" spacing={isMobile ? '10px' : '15px'}>
          <Email color={colors.white.main} size={isMobile ? 25 : 35} />
          <Typography color="white.main" variant={isMobile ? 'h5' : 'h4'}>
            violino.ines95@gmail.com
          </Typography>
        </Stack>

        <Stack direction="row" spacing={isMobile ? '10px' : '15px'}>
          <Phone color={colors.white.main} size={isMobile ? 25 : 35} />
          <Typography color="white.main" variant={isMobile ? 'h5' : 'h4'}>
            +46 072 831 07 29
          </Typography>
        </Stack>
      </Stack>

      <Stack
        bgcolor="black.700"
        borderRadius="5px"
        direction="column"
        padding={isMobile ? '15px' : '20px'}
        spacing={isMobile ? '10px' : '20px'}
        zIndex={5}
      >
        <Typography color="white.200" variant={isMobile ? 'h5' : 'h4'}>
          contact form
        </Typography>

        <Formik
          initialValues={{
            from_name: '',
            to_name: 'Inês Cruz',
            message: '',
            reply_to: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            try {
              await send(
                process.env.SERVICE_ID ?? '',
                process.env.TEMPLATE_ID ?? '',
                values,
                process.env.USER_ID ?? ''
              ).then((response) => {
                console.log('SUCCESS!', response.status, response.text);
              });
            } catch (e) {
              //   handleError(e, values.email);
              console.log('Error!', e);
              actions.setSubmitting(false);
            }
          }}
        >
          {(props) => (
            <Stack
              direction="column"
              spacing={isMobile ? '10px' : '20px'}
              zIndex={5}
            >
              <Stack width="100%">
                <TextField
                  placeholder="your name"
                  variant="outlined"
                  InputProps={inputProps}
                  type="text"
                  name="from_name"
                  value={props.values.from_name}
                  onChange={props.handleChange}
                  fullWidth
                  required
                  onBlur={() => {
                    props.setFieldTouched('from_name');
                  }}
                />
                <ErrorMessage name="from_name">
                  {(msg) => (
                    <Typography color="error.main" variant="subtitle2">
                      {msg}
                    </Typography>
                  )}
                </ErrorMessage>
              </Stack>

              <Stack width="100%">
                <TextField
                  variant="outlined"
                  InputProps={inputProps}
                  type="text"
                  name="reply_to"
                  placeholder="your email"
                  value={props.values.reply_to}
                  onChange={props.handleChange}
                  fullWidth
                  required
                  onBlur={() => {
                    props.setFieldTouched('reply_to');
                  }}
                />
                <ErrorMessage
                  name="reply_to"
                  render={(msg) => (
                    <Typography color="error.main" variant="subtitle2">
                      {msg}
                    </Typography>
                  )}
                />
              </Stack>

              <Stack width="100%">
                <TextField
                  placeholder="message"
                  variant="outlined"
                  multiline
                  rows={4}
                  InputProps={inputProps}
                  type="text"
                  name="message"
                  value={props.values.message}
                  onChange={props.handleChange}
                  fullWidth
                  required
                  onBlur={() => {
                    props.setFieldTouched('message');
                  }}
                />
                <ErrorMessage name="message">
                  {(msg) => (
                    <Typography color="error.main" variant="subtitle2">
                      {msg}
                    </Typography>
                  )}
                </ErrorMessage>
              </Stack>

              <Button
                color="primary"
                variant="contained"
                sx={{
                  width: isMobile ? '100%' : '100%',
                  alignSelf: 'center',
                }}
                onClick={props.submitForm}
                disabled={!props.isValid}
              >
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  className="Roboto"
                  marginY={isMobile ? 0 : '5px'}
                >
                  send email
                </Typography>
              </Button>
            </Stack>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
}
