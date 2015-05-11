'use strict';

var fs = require("fs"),
    vm = require('vm'),
    GitHubApi = require("github"),
    expect = require('expect.js');

vm.runInThisContext('var window = JSON.parse(\'{}\')'); // To avoid Mocha Explote: ReferenceError: window is not defined

// Load adaptive library into the node context
vm.runInThisContext(fs.readFileSync('adaptive-arp-ts/adaptive.js'));

describe('adaptive-arp-javascript', function () {

    /**
     * Test to try the current API version of the platform
     */
    it('Check API version', function (done) {

        if (JSON.parse(process.env.TRAVIS_PULL_REQUEST)) {
            done();
        } else {
            var apiVersion = Adaptive.AppRegistryBridge.getInstance().getAPIVersion();

            var github = new GitHubApi({
                version: "3.0.0"
            });

            github.authenticate({
                type: "token",
                token: process.env.GH_TOKEN_NODE
            });

            github.repos.getTags({
                user: 'AdaptiveMe',
                repo: 'adaptive-arp-api',
                page: 0,
                per_page: 1
            }, function (error, result) {
                if (error) {
                    console.log("ERROR: " + error);
                } else {
                    expect(result[0].name).to.equal(apiVersion);
                    done();
                }
            });
        }
    });

});
