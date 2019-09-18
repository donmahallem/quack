import * as PIXI from "pixi.js";
export declare class QuackGame {
    private parent;
    private gamePortSize;
    private app;
    private rootContainer;
    private lastTimestamp;
    private pixiLoader;
    constructor(parent: HTMLElement, gamePortSize?: number);
    start(): void;
    startGame(): void;
    onAnimationFrame(timestamp: number): void;
    update(deltaTime: number): void;
    loadAssets(): Promise<Partial<Record<string, PIXI.LoaderResource>>>;
    resize(): void;
}
