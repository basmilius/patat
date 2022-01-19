import type { IconDefinition, IconLookup, IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { ForwardedRef, ReactElement } from "react";
import * as solidIcons from "./solid";

const REGISTRY: { [key: string]: { [key: string]: IconDefinition; }; } = {
    fas: {}
};

export function initializeFontAwesome() {
    Object.keys(solidIcons)
        .map(i => solidIcons[i])
        .forEach((i: IconDefinition) => REGISTRY[i.prefix][i.iconName] = i);
}

export function renderIcon(ref: ForwardedRef<HTMLElement> | undefined, name: string | null): ReactElement | null {
    if (name === null) {
        return null;
    }

    let definition = normalizeIconName(name);

    if (!(definition.prefix in REGISTRY) || !(definition.iconName in REGISTRY[definition.prefix])) {
        return null;
    }

    const {icon, iconName, prefix} = REGISTRY[definition.prefix][definition.iconName];
    let [width, height, , , paths] = icon;

    if (!Array.isArray(paths)) {
        paths = [paths];
    }

    return (
        <svg
            aria-hidden="true"
            focusable={false}
            role="img"
            className={`fa fa-${prefix} fa-${iconName}`}
            viewBox={`0 0 ${width} ${height}`}>
            {paths.map((path, index) => (
                <path
                    key={index}
                    fill="currentColor"
                    opacity={paths.length > 1 ? (index === 0 ? 0.5 : undefined) : undefined}
                    d={path}/>
            ))}
        </svg>
    );
}

function normalizeIconName(icon: string | string[] | IconLookup): IconLookup | null {
    if (Array.isArray(icon)) {
        return icon.length === 2 ? {prefix: icon[0] as IconPrefix, iconName: icon[1] as IconName} : null;
    }

    if (typeof icon === "object") {
        return icon.prefix && icon.iconName ? icon : null;
    }

    icon = icon.split(" ");

    if (icon.length === 2) {
        return {prefix: icon[0] as IconPrefix, iconName: icon[1] as IconName};
    }

    return {prefix: "far", iconName: icon[0] as IconName};
}
