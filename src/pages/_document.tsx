import { default as Document, Head, Html, Main, NextScript } from "next/document";

export default class BDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8"/>
                    <meta name="author" content="Bas Milius"/>
                    <meta name="revisit-after" content="1 day"/>
                    <meta name="theme-color" content="#064663"/>
                    <link rel="stylesheet" href="https://font.bmcdn.nl/css2?family=proxima-soft:wght@400;500;700"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }

}
