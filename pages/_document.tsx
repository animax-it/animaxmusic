import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const AnyComponent = Head as any;
  const AnyComponent2 = NextScript as any;

  return (
    <Html>
      <AnyComponent>
        <link
          href="https://fonts.googleapis.com/css2?family=Kurale&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </AnyComponent>
      <body>
        <Main />
        <AnyComponent2 />
      </body>
    </Html>
  );
}
