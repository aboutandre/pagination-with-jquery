/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const $header = $('.page-header.cf');
const $studentItem = $('.student-item');
const $studentItemNotFiltered = $('.student-item').not('.filtered');
const $studentDetails = $('.student-details h3');
const $studentAmmout = $studentItem.length;
const limitPerPage = 5;

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 students, the last page will only display four
const showPage = (list = $('.student-item'), page = 0) => {
    console.log('How many have not been filtered out: ' + $('.student-item').not('.filtered').length);
    list.each(function (index) {
        let rangeLow = (page * limitPerPage);
        let rangeHigh = (page * limitPerPage) + limitPerPage;
        if (index >= rangeLow && index < rangeHigh) {
            // console.log(index);
            $(this).show();
        } else {
            // console.log('This should be hidden: ' + index);
            $(this).hide();
        }
    })
    // TODO 
    // When a search yields 0 results, a message is displayed on the page, 
    // informing the user that no results have been found.
};

// Create and append the pagination links - Creating a function that can do this is a good approach
const createPagination = (totalAmmount = $studentAmmout) => {
    $('.pagination').remove();
    let pagesTotal = Math.round(totalAmmount / limitPerPage) + 1;
    // console.log('The total pages is ' + (pagesTotal - 1));
    let pagination = '';
    if (pagesTotal <= 2) {
        return;
    } else {
        pagination += '<ul class="pagination"><li><a href="#/" class="button-page active">1</a></li>';
        for (let i = 2; i < pagesTotal; i++) {
            let paginationItem = '<li><a href="#/" class="button-page">' + i + '</a></li>';
            pagination += paginationItem;
        }
        pagination += '</ul>';
        $('.page').append(pagination);
    }
}

// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
const navigatePage = (list = $('.student-item')) => {
    $('.button-page').on('click', function () {
        if ($(this).hasClass === 'active') {
            return false;
        } else {
            $('.button-page').removeClass('active');
            $(this).addClass('active');
            showPage(list, $(this).parent().index());
            // console.log($(this).parent().index());
        }
    })
}

showPage();
createPagination();
navigatePage();

// Search
const filter = `<div class="student-search">
                    <input placeholder="Search for students..." class="search-box" />
                    <button class="search-button">Search</button>
                </div>
`;
$header.append(filter);

// Make jQuery :contains Case-Insensitive - via "https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/"
$.expr[":"].contains = $.expr.createPseudo(function (arg) {
    return function (elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

function listFilter(list) {
    $('.search-box').on('keyup', function () {

        var filter = $(this).val();
        if (filter) {
            // this finds all links in a list that contain the input,
            // and hide the ones not containing the input while showing the ones that do
            $(list).find(".student-details h3:not(:contains(" + filter + "))").parent().parent().removeClass('filtered').hide();
            $(list).find(".student-details h3:contains(" + filter + ")").parent().parent().addClass('filtered').show();
        } else {
            $(list).find(".student-details h3:contains(" + filter + ")").parent().parent().addClass('filtered').hide();
        }
        showPage($('.student-item.filtered'));
        createPagination($('.student-item.filtered').length);
        navigatePage($('.student-item.filtered'));
        // return false;
    })
}

listFilter($('.student-list'));