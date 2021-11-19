import Document, { Html, Head, Main, NextScript } from 'next/document'
import Pixel from "@/components/miscs/Pixel";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="mn">
                <Head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                    <link rel="shortcut icon" href="/img/favicon.png" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/>
                {/* <Pixel id="251974523202135" /> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument