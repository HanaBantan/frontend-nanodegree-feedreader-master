/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    ////////////////////////////////////////////////////////////////////////////////////////

    describe('RSS Feeds', function () {
        var FIRST,
            END;
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('allFeeds variable has been defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // loop through each feed to make sure the URL is defined 
        it('URL defined', function () {
            var i = 0;

            while (i < allFeeds.length) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
                i++;
            };
        });

        // test loop to make sure all names are defined


        it('name are defined', function () {
            var i = 0;

            while (i < allFeeds.length) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
                i++;
            }

        });
    });

    // test to  make sure the menu is hedden if it is not clicked
    describe('The menu', function () {
        it('menue element hidden', function () {

            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        //test the visibility when the menu icon is clicked

        it('menu icon is clicked', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });

    // Write a test that ensures that there is at least a single entry in the feed  
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(1, function () {
                done();
            });
        });
        it('if the  entry has more than 0 entries', function () {
            // expect($('.entry .feed')).toBeDefined();
            let feed = document.querySelector('.feed .entry');
            expect(feed.children.length).toBeGreaterThan(0);
           
        });
    });

    //  test to ensures when a new feed is loaded the content changes

    describe('New Feed Selection', function () {
        beforeEach(function (done) {
            var container = document.querySelector('.feed')
            $('.feed').empty();
            // loadFeed(0, function () {
            //     //start = $('.feed').find(allFeeds.url);
            //     FIRST = container.innerHTML;
            // });
            // loadFeed(1, function () {
            //     END = container.innerHTML;
            //     done();
            // });
            loadFeed(0, function () {
                FIRST = $('.feed').html();
                loadFeed(1, function () {
                    END = $('.feed').html();
                    done();
                });
            });

        });

        it(' new feed is loaded', function (done) {
            expect(FIRST).not.toBe(END)
            done();

        });
    });
}());
