console.log("yes");
import './../styles/appStyles.scss';
interface ITest {
    test: number;
}
function getComponent() {
    return import(/* webpackChunkName: "pixijs" */ 'pixi.js').then((PIXI) => {

        let type = "WebGL"
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas"
        }

        PIXI.utils.sayHello(type)

        const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
        document.getElementsByTagName('game-root')[0]
            .appendChild(app.view);
        window.onresize = (event) => {
            const windowWidth: number = window.innerWidth;
            const windowHeight: number = window.innerHeight;

            //this part resizes the canvas but keeps ratio the same
            app.view.style.width = windowWidth + "px";
            app.view.style.height = windowHeight + "px";
            //this part adjusts the ratio:
            //console.log(w, h);
            app.renderer.resize(windowWidth, windowHeight);
        }
        PIXI.loader
            .add("./assets/cartoon-whale.gif")
            .load(setup);

        //This `setup` function will run when the image has loaded
        function setup() {

            //Create the cat sprite
            let cat = new PIXI.Sprite(PIXI.loader.resources["./assets/cartoon-whale.gif"].texture);

            //Add the cat to the stage
            app.stage.addChild(cat);
        }
    }).catch(error => 'An error occurred while loading the component');
}
function getComponent2() {
    return import(/* webpackChunkName: "butt" */
    /* webpackPrefetch: true */ './butt').then((butt) => {
        const a = new butt.Butt();
        a.test();
    }).catch(error => 'An error occurred while loading the component');
}


getComponent().then((component) => {
    console.log("AÖLKFGNA");
})

getComponent2().then(console.log);