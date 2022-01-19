import { Icon } from "@latte-ui/core";
import { forwardRef, memo } from "react";

import styles from "./Button.module.scss";

export default memo(forwardRef<HTMLButtonElement, Props>(({icon, iconAfter, label, onClick}, ref) => (
    <button ref={ref} className={styles.button} onClick={onClick}>
        {icon && <Icon className={styles.buttonIcon} name={icon}/>}
        <span>{label}</span>
        {iconAfter && <Icon className={styles.buttonIcon} name={iconAfter}/>}
    </button>
)));

interface Props {
    icon?: string;
    iconAfter?: string;
    label: string;
    onClick?: () => void;
}
