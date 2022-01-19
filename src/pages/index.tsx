import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, Fragment, memo, useCallback, useEffect, useState } from "react";
import { POFButton, POFContainer } from "@/component/shell";

const POFMotionButton = motion(POFButton);

export default memo(() => {
    const [stage, setStage] = useState(1);

    const onButtonClick = useCallback(async () => {
        setStage(2);

        await new Promise(resolve => setTimeout(resolve, 8000));

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
                        alt="Patat of friet"
                        height={90}
                        width={90}/>

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
                        src="https://bmcdn.nl/assets/joypixels/v6.6/svg/1f916.svg"
                        alt="Robot"
                        height={90}
                        width={90}/>

                    <motion.h1
                        animate={{opacity: 1, y: 0, transition: {type: "spring", bounce: .5, delay: .20}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, y: 60}}
                        transition={{type: "tween", duration: .3}}>
                        Aan het nadenken&hellip;
                    </motion.h1>

                    <RunningMessages
                        animate={{opacity: 1, y: 0, transition: {type: "spring", bounce: .5, delay: .25}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, y: 60}}
                        transition={{type: "tween", duration: .3}}/>
                </Fragment>)}

                {stage === 3 && (<Fragment key={3}>
                    <motion.img
                        animate={{opacity: 1, scale: 1, transition: {type: "spring", bounce: .5, delay: .30}}}
                        exit={{opacity: 0}}
                        initial={{opacity: 0, scale: .5}}
                        transition={{type: "tween", duration: .3}}
                        src="https://bmcdn.nl/assets/joypixels/v6.6/svg/1f91f-1f3fc.svg"
                        alt="Hand"
                        height={90}
                        width={90}/>

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
                        Na een paar grote berekeningen heeft de AI heeft het enige juiste antwoord kunnen vinden. Het is patat en dat is het altijd al geweest.
                    </motion.p>
                </Fragment>)}
            </AnimatePresence>
        </POFContainer>
    );
});

const messages = [
    "De volledige menselijke geschiedenis doorzoeken...",
    "Blackbox vullen met Aviko...",
    "Nieuwsberichten doorzoeken...",
    "Oud frituurvet controleren..."
];

const RunningMessages = motion(memo(forwardRef<HTMLDivElement>(({}, ref) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const tick = () => requestAnimationFrame(() => setIndex(index + 1 >= messages.length ? 0 : index + 1));
        const timeout = setTimeout(tick, 2000);

        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <div ref={ref}>
            <AnimatePresence exitBeforeEnter initial={false}>
                <motion.p
                    key={index}
                    animate={{opacity: 1, x: 0, transition: {type: "spring", bounce: .5}}}
                    exit={{opacity: 0, x: -60}}
                    initial={{opacity: 0, x: 60}}
                    transition={{type: "tween", duration: .3}}>
                    {messages[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
})));
