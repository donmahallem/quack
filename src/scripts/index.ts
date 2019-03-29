import "./../styles/appStyles.scss";
interface ITest {
    test: number;
}
const getComponent = () => {
    return import(/* webpackChunkName: "pixijs" */ "pixi.js").then((PIXI) => {
        const gamePortSize: number = 720;
        let type = "WebGL";
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas";
        }

        PIXI.utils.sayHello(type);

        const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
        const a = new PIXI.Container();
        app.stage.addChild(a);
        // app.renderer.resolution = 2;
        document.getElementsByTagName("game-root")[0]
            .appendChild(app.view);
        window.onresize = (event) => {
            const windowWidth: number = window.innerWidth;
            const windowHeight: number = window.innerHeight;

            // this part resizes the canvas but keeps ratio the same
            app.view.style.width = windowWidth + "px";
            app.view.style.height = windowHeight + "px";
            // this part adjusts the ratio:
            // console.log(w, h);
            const offset = Math.abs((windowHeight - windowWidth) / 2);
            if (windowWidth < windowHeight) {
                app.renderer.resize(gamePortSize, windowHeight * gamePortSize / windowWidth);
            } else {
                app.renderer.resize(windowWidth * gamePortSize / windowHeight, gamePortSize);
            }
            const topOffset: number = app.renderer.height - 720;
            const leftOffset: number = (app.renderer.width - 720) / 2;
            a.position.set(leftOffset, topOffset);
        };
        PIXI.loader
            .add("./assets/test.jpg")
            .load(() => {

                // Create the cat sprite
                const cat = new PIXI.Sprite(PIXI.loader.resources["./assets/test.jpg"].texture);
                cat.width = 720;
                cat.height = 720;
                // Add the cat to the stage
                a.addChild(cat);
            });
    }).catch((error) => "An error occurred while loading the component");
};
const getComponent2 = () => {
    return import(/* webpackChunkName: "butt" */
    /* webpackPrefetch: true */ "./butt").then((butt) => {
        const a = new butt.Butt();
        a.test();
    }).catch((error) => "An error occurred while loading the component");
};

getComponent().then((component) => {
    const comp = component;
});
