if (Meteor.isClient) {
    jsondiffpatch  = window.jsondiffpatch;
} else {
    jsondiffpatch = Npm.require('jsondiffpatch').create(options);
}