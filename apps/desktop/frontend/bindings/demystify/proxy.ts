// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT

/**
 * Proxy is a struct that represents a martian proxy
 * @module
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import {Call as $Call, Create as $Create} from "@wailsio/runtime";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import * as $models from "./models.js";

export function IsActive(): Promise<boolean> & { cancel(): void } {
    let $resultPromise = $Call.ByID(3500247298) as any;
    return $resultPromise;
}

export function Start(config: $models.ProxyConfig | null): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(2984906812, config) as any;
    return $resultPromise;
}

export function Stop(): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(1134319448) as any;
    return $resultPromise;
}
