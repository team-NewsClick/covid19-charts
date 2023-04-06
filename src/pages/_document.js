import _Document, { Html, Head, Main, NextScript } from "next/document"

export default class Document extends _Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-1XBEGYR4BD`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1XBEGYR4BD');
          `
            }}
          />
        </Head>
        <body className="bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
