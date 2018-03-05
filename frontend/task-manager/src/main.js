export function configure(aurelia) {
    aurelia.use
           .standardConfiguration()
           .developmentLogging()
		   .plugin("aurelia-bootstrap")
           .plugin("aurelia-validation")
		   .feature("resources");

    aurelia.start().then(() => aurelia.setRoot());
};