import { LatteUi, LatteUiContext } from "@latte-ui/core";
import { Head } from "@/component/platform";
import { initializeFontAwesome, renderIcon } from "@/logic/font-awesome";

import "../css/latte.scss";
import "../css/index.scss";

initializeFontAwesome();

const latteUiConfig = LatteUiContext.withDefaults({
    emoji: {
        baseUrl: "https://bmcdn.nl/assets/joypixels/v6.6",
        fileName: "/svg/%s.svg"
    },
    icon: {
        renderer: renderIcon
    }
});

export default function BApp({Component, pageProps}) {
    return (<>
        <Head>
            <meta name="description" content="Het antwoord op de ultieme vraag... Is het nou patat of friet?" key="description"/>
            <meta name="keywords" content="patat,friet,is het nou" key="keywords"/>
            <meta name="robots" content="index,follow" key="robots"/>

            <title>Is het nou patat of friet?</title>
        </Head>

        <LatteUi {...latteUiConfig}>
            <Component {...pageProps}/>
        </LatteUi>
    </>);
}
