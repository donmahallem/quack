import * as PIXI from "pixi.js";
enum AssetList {
    TEST = "./assets/test.jpg",
}
export class QuackGame {
    private app: PIXI.Application;
    private rootContainer: PIXI.Container;
    private lastTimestamp: number;
    private pixiLoader: PIXI.Loader;
    constructor(private parent: HTMLElement, private gamePortSize: number = 720) {
        let type = "WebGL";
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas";
        }
        PIXI.utils.sayHello(type);
        this.pixiLoader = new PIXI.Loader();
    }

    public start(): void {
        this.app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
        this.rootContainer = new PIXI.Container();
        this.app.stage.addChild(this.rootContainer);
        this.parent.appendChild(this.app.view);
        this.resize();
        window.onresize = (event: UIEvent) => {
            this.resize();
        };
        this.loadAssets()
            .then(this.startGame.bind(this));
    }

    public startGame(): void {

        // Create the cat sprite
        const cat = new PIXI.Sprite(this.pixiLoader.resources[AssetList.TEST].texture);
        cat.width = 720;
        cat.height = 720;
        // Add the cat to the stage
        this.rootContainer.addChild(cat);
        cat.pivot.set(360, 360);
        requestAnimationFrame(this.onAnimationFrame.bind(this));
    }

    public onAnimationFrame(timestamp: number): void {
        const deltaTime = (this.lastTimestamp ? (timestamp - this.lastTimestamp) : 0);
        this.lastTimestamp = timestamp;
        requestAnimationFrame(this.onAnimationFrame.bind(this));
    }

    public update(deltaTime: number): void {
        this.rootContainer.rotation += deltaTime / 1000.0;
    }

    public loadAssets(): Promise<void> {
        return new Promise((resolve, reject) => {
            const resourcePaths: string[] = Object.keys(AssetList)
                .map((key: string) => {
                    return AssetList[key];
                });
            this.pixiLoader
                .add(resourcePaths)
                .load(resolve);
        });
    }

    public resize(): void {
        const windowWidth: number = window.innerWidth;
        const windowHeight: number = window.innerHeight;
        this.app.view.style.width = windowWidth + "px";
        this.app.view.style.height = windowHeight + "px";
        if (windowWidth < windowHeight) {
            this.app.renderer.resize(this.gamePortSize, windowHeight * this.gamePortSize / windowWidth);
        } else {
            this.app.renderer.resize(windowWidth * this.gamePortSize / windowHeight, this.gamePortSize);
        }
        const topOffset: number = this.app.renderer.height - this.gamePortSize;
        const leftOffset: number = (this.app.renderer.width - this.gamePortSize) / 2;
        this.rootContainer.position.set(leftOffset, topOffset * 3 / 4);
    }
}
