import "./../styles/appStyles.scss";
interface ITest {
    test: number;
}
const getComponent = () => {
    return import(/* webpackChunkName: "pixijs" */ "pixi.js").then((PIXI) => {

        let type = "WebGL";
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas";
        }

        PIXI.utils.sayHello(type);

        const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
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
            app.renderer.resize(windowWidth, windowHeight);
        };
        PIXI.loader
            .add("./assets/test.jpg")
            .load(() => {

                // Create the cat sprite
                const cat = new PIXI.Sprite(PIXI.loader.resources["./assets/test.jpg"].texture);

                // Add the cat to the stage
                app.stage.addChild(cat);
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
