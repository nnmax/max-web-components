export interface MaxButtonProps {
    variant?: "text" | "contained" | "outlined";
    color?: "primary" | "secondary" | "success";
    style?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}
export default class MaxButton extends HTMLElement {
    private readonly rippleRoot;
    private readonly rippleChildren;
    constructor();
    private createRippleChild;
    private startRipple;
    private stopRipple;
}
