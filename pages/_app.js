import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import "../styles/variables.css";

import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>CodeTest</title>
                {/* <link href="/static/images/favicon.svg" rel="icon" /> */}
                {/* <link
                    href="/icon/favicon-16x16.png"
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                />
                <link
                    href="/icon/favicon-32x32.png"
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                /> */}
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />

                {/* Bootstrap */}
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />
                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                {/* Bootstrap */}
            </Head>

            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
