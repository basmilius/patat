import { AnimatePresence, motion } from "framer-motion";
import { Fragment, memo, useCallback, useState } from "react";
import { POFButton, POFContainer } from "@/component/shell";

const POFMotionButton = motion(POFButton);

export default memo(() => {
    const [stage, setStage] = useState(1);

    const onButtonClick = useCallback(async () => {
        setStage(2);

        await new Promise(resolve => setTimeout(resolve, 3000));

        setStage(3);
    }, []);

    return (
        <POFContainer>
            <AnimatePresence exitBeforeEnter initial>
                {stage === 1 && (<Fragment key={1}>
                    <motion.img
                        animate={{opacity: 1, scale: 1, transition: {type: "spring", bounce: .5, delay: .30}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, scale: .5}}
                        transition={{type: "tween", duration: .3}}
                        src="https://bmcdn.nl/assets/joypixels/v6.6/svg/1f35f.svg"
                        alt="Patat of friet"/>

                    <motion.h1
                        animate={{opacity: 1, y: 0, transition: {type: "spring", bounce: .5, delay: .20}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, y: 60}}
                        transition={{type: "tween", duration: .3}}>
                        Is het nou patat of friet?
                    </motion.h1>

                    <motion.p
                        animate={{opacity: 1, y: 0, transition: {type: "spring", bounce: .5, delay: .25}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, y: 60}}
                        transition={{type: "tween", duration: .3}}>
                        Deze website kan doormiddel van <a href="https://nl.wikipedia.org/wiki/Kunstmatige_intelligentie" rel="noopener" target="_blank">Artificial Intelligence</a> uitzoeken wat het antwoord
                        op de meest brandende vraag in Nederland is.
                    </motion.p>

                    <POFMotionButton
                        animate={{opacity: 1, scale: 1, transition: {type: "spring", bounce: .5, delay: .40}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, scale: .5}}
                        transition={{type: "tween", duration: .3}}
                        iconAfter="fas circle-right"
                        label="Kom erachter"
                        onClick={() => onButtonClick()}/>
                </Fragment>)}

                {stage === 2 && (<Fragment key={2}>
                    <motion.img
                        animate={{opacity: 1, scale: 1, transition: {type: "spring", bounce: .5, delay: .30}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, scale: .5}}
                        transition={{type: "tween", duration: .3}}
                        src="https://bmcdn.nl/assets/joypixels/v6.6/svg/1f914.svg"
                        alt="Patat of friet"/>

                    <motion.h1
                        animate={{opacity: 1, y: 0, transition: {type: "spring", bounce: .5, delay: .20}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, y: 60}}
                        transition={{type: "tween", duration: .3}}>
                        Aan het berekenen&hellip;
                    </motion.h1>

                    <motion.p
                        animate={{opacity: 1, y: 0, transition: {type: "spring", bounce: .5, delay: .25}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, y: 60}}
                        transition={{type: "tween", duration: .3}}>
                        Op dit moment wordt er gezocht in de volledige menselijke geschiedenis, alle woordenboeken
                        en in nieuwsberichten van na het jaar 1996.
                    </motion.p>
                </Fragment>)}

                {stage === 3 && (<Fragment key={3}>
                    <motion.img
                        animate={{opacity: 1, scale: 1, transition: {type: "spring", bounce: .5, delay: .30}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, scale: .5}}
                        transition={{type: "tween", duration: .3}}
                        src="https://bmcdn.nl/assets/joypixels/v6.6/svg/1f91f.svg"
                        alt="Patat of friet"/>

                    <motion.h1
                        animate={{opacity: 1, y: 0, transition: {type: "spring", bounce: .5, delay: .20}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, y: 60}}
                        transition={{type: "tween", duration: .3}}>
                        Het is Patat.
                    </motion.h1>

                    <motion.p
                        animate={{opacity: 1, y: 0, transition: {type: "spring", bounce: .5, delay: .25}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, y: 60}}
                        transition={{type: "tween", duration: .3}}>
                        En dat is het altijd al geweest.
                    </motion.p>
                </Fragment>)}
            </AnimatePresence>
        </POFContainer>
    );
});
