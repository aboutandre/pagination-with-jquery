/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const $filter = $('<input />');
const $header = $('.page-header.cf');
const $studentItem = $('.student-item');
const $studentAmmout = $studentItem.length;
const limitPerPage = 5;

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 students, the last page will only display four
const showPage = (page = 0, list = $studentItem) => {
    list.each(function (index, element) {
        let rangeLow = (page * limitPerPage);
        let rangeHigh = (page * limitPerPage) + limitPerPage;
        if (index >= rangeLow && index < rangeHigh) {
            // console.log(index);
            $(element).show();
        } else {
            // console.log('This should be hidden: ' + index);
            $(element).hide();
        }
    })
};

// Create and append the pagination links - Creating a function that can do this is a good approach
const createPagination = (list) => {
    $('.pagination').remove();
    let pagesTotal = Math.round($studentAmmout / limitPerPage) + 1;
    // console.log('The total pages is ' + (pagesTotal - 1));
    let pagination = '';
    pagination += '<ul class="pagination"><li><a href="#/" class="button-page active">1</a></li>';
    for (let i = 2; i < pagesTotal; i++) {
        let paginationItem = '<li><a href="#/" class="button-page">' + i + '</a></li>';
        pagination += paginationItem;
    }
    pagination += '</ul>';
    $('.page').append(pagination);
}

// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
const navigatePage = () => {
    $('.button-page').on('click', function () {
        if ($(this).hasClass === 'active') {
            return false;
        } else {
            $('.button-page').removeClass('active');
            $(this).addClass('active');
            showPage($(this).parent().index());
            // console.log($(this).parent().index());
        }
    })
}

showPage();
createPagination();
navigatePage();

// Search
$header.append($filter);