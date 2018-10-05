/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Here we create all the variables that we need for our app
const $header = $('.page-header.cf');
const $studentItem = $('.student-item');
const $studentAmmout = $studentItem.length;
const limitPerPage = 10;
const noResults = `<div class="no-results"><h2>Oh no!</h2><p>Your search returned <em>no results</em> =( </p><p>Redefine your search query</p></div>`;
const filter = `<div class="student-search"><input placeholder="Search for students..." class="search-box" /></div>`;

/** 
 * This function controlls how many items are shown in each page.
 * It takes two default arguments:
 * one that will overwritte when the list is filtered
 * and another one to set the page
**/
const showPage = (list = $('.student-item'), page = 0) => {
    // If there was a "zero results" box, we remove it
    $('.no-results').remove();
    // Here we iterate through all the current items that are not filtered
    list.each(function (index) {
        // We set our ranges, based on the limit of students per page (in this case the variable 'limitPerPage')
        let rangeLow = (page * limitPerPage);
        let rangeHigh = (page * limitPerPage) + limitPerPage;
        // If the item we are iterating is inside this range we show it...
        if (index >= rangeLow && index < rangeHigh) {
            $(this).show();
            // ...otherwise we hide it.
        } else {
            $(this).hide();
        }
    })
    // If the ammount of items that have been filtered equals the ammount of total students 
    // AND there is no "zero results" box in the page we add a "zero results" box
    if ($('.student-item.filtered').length == $studentAmmout && !$('.no-results').length > 0) {
        $('.page').append(noResults);
    }
};

/** 
* This function creates our pagination, if necessary.
* It takes one default parameter to know how many students are not filtered, and to create the
* ammount of pages accordingly
**/
const createPagination = (totalAmmount = $studentAmmout) => {
    // If there was a pagination, we remove it
    $('.pagination').remove();
    // We calculate how many pages we need based on the ammount of unfiltered students
    let pagesTotal = Math.round(totalAmmount / limitPerPage) + 1;
    // console.log('The total pages is ' + (pagesTotal - 1));
    // Here we start our string that will concatenate all the necessary page buttons for the ammount of students that we have
    let pagination = '';
    // If we have only one page, then stop
    if (pagesTotal <= 2) {
        return;
        // If we have more than one page continue
    } else {
        // This creates our starting HTML parent node for the page buttons
        pagination += '<ul class="pagination"><li><a href="#/" class="button-page active">1</a></li>';
        // We loop as long as needed to create all the buttons for the pages we need
        for (let i = 2; i <= pagesTotal; i++) {
            let paginationItem = '<li><a href="#/" class="button-page">' + i + '</a></li>';
            // And we concatenate this to our parent
            pagination += paginationItem;
        }
        // We close our parent node
        pagination += '</ul>';
        // And append to create string to the page
        $('.page').append(pagination);
    }
}

/**
 * This function controls our pagination buttons.
 * It takes one default parameter to know how many students are not filtered
 */
const navigatePage = (list = $('.student-item')) => {
    // We add an event listener to watch for a click on our paginatoin buttons
    $('.button-page').on('click', function () {
        // If the user clicks on an already active button, ie. this page, then we do nothing
        if ($(this).hasClass === 'active') {
            return false;
        // If not we proceed
        } else {
            // We remove the class 'active' for all the buttons
            $('.button-page').removeClass('active');
            // And set this button, that has been clicked to active
            $(this).addClass('active');
            // We now call the showPage function and give two parameters, 
            // the "students that are not filtered" (list)
            // and this parent index, that serves as the pagination
            showPage(list, $(this).parent().index());
        }
    })
}

// Search
// Make jQuery :contains Case-Insensitive - via "https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/"
$.expr[":"].contains = $.expr.createPseudo(function (arg) {
    return function (elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

/**
 * This function filters all the available students.
 * It starts with a default parameter to filter all the students.
 */
function listFilter(list = $('.student-list')) {
    // We add an event listener on the search box that will fire on every keyup
    $('.search-box').on('keyup', function () {
        // We create a nice variable to use in the filter
        let filter = $(this).val();
        // If we have a filter query
        if (filter) {
            // This finds all the students that contain the value in the filter and show them
            // While hiding all the others that do not match the query
            $(list).find(".student-details h3:not(:contains(" + filter + "))").parent().parent().addClass('filtered').removeClass('is-visible').hide();
            $(list).find(".student-details h3:contains(" + filter + ")").parent().parent().removeClass('filtered').addClass('is-visible').show();
        // else, if the filter is empty
        } else {
            $(list).find(".student-details h3:contains(" + filter + ")").parent().parent().removeClass('filtered').addClass('is-visible').show();
        }
        // Now we call the functions again with new parameters, namely to show only the items that have not been filtered.
        showPage($('.student-item.is-visible'));
        createPagination($('.student-item.is-visible').length);
        navigatePage($('.student-item.is-visible'));
        // console.log('How many have not been filtered out: ' + $('.student-item').not('.filtered').length);
    })
}

// We add the header to the page
$header.append(filter);

// We call all the functions
showPage();
createPagination();
navigatePage();
listFilter();
