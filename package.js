Package.describe({
    name: 'risul:chance',
    summary: 'Meteor package for jsondiffpatch - Diff & patch JavaScript objects: https://github.com/benjamine/jsondiffpatch',
    version: '1.0.0',
    git: 'https://github.com/risul/meteor-jsondiffpatch'
});

Npm.depends({
    jsondiffpatch: '0.1.2.7'
});

Package.onUse(function(api) {
    api.versionsFrom('METEOR@0.9.2.2');
    api.export('jsondiffpatch');
    api.addFiles('.npm/package/node_modules/jsondiffpatch/public/build/jsondiffpatch-full.min.js', ['client']);
    api.addFiles('lib/jsondiffpatch.js', 'server');
});