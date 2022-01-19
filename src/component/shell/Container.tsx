import { memo, PropsWithChildren } from "react";

import styles from "./Container.module.scss";

export default memo(({children, className = ""}: PropsWithChildren<{ className?: string; }>) => (
    <div className={`${styles.container} ${className}`}>
        {children}
    </div>
));
