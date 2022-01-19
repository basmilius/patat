import { memo } from "react";
import { POFButton, POFContainer } from "@/component/shell";

export default memo(() => (<>
    <POFContainer>

        <h1>Is het nou patat of friet?</h1>
        <p>
            Deze website kan doormiddel van <a>Artificial Intelligence</a> uitzoeken wat het antwoord
            op de meest brandende vraag in Nederland is.
        </p>
        <POFButton iconAfter="fas circle-right" label="Kom erachter"/>

    </POFContainer>
</>));
