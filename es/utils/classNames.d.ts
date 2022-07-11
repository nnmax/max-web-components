declare type Value = string | number | boolean | null | undefined | Record<string, unknown>;
declare type Names = Value | NamesArray;
declare type NamesArray = Array<Names>;
export default function classNames(...names: NamesArray): string;
export {};
