/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    'use strict';
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('url property defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name property defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });

    /* A new test suite named "The menu"
     * this contains all test related to menu
     */
    describe('The menu', function() {
        /* Write a test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden on load', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('change visibility when menu icon clicked', function() {
            var icon = $('.menu-icon-link');
            
            icon.click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();

            icon.click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
        });
        
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        /* Function done() is used since loadFeed() is asynchronous */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Once asynchronous call is completed, then only execute below test */
        it('should have at leaset one entry', function(){

            /* Grab  <article> tag under feed container */
            var entry = $('.feed a').children('.entry');

            /* Check at lease one feed exists */
            expect(entry.length).toBeGreaterThan(0);
            done();
        });

    });

    /* Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var previousFeed;
        
        beforeEach(function(done) {

            /* Load first feed */
            loadFeed(0, function() {
                previousFeed = $('.feed').html();

                /* Load second feed*/
                loadFeed(1, done);
            });
        });

        it('content actually changes', function() {
            expect($('.feed').html()).not.toBe(previousFeed);
            done();
        });

        /* set first feed screen */
        afterEach(function() {
            loadFeed(0);
        });

    });
           
}());
