/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const $header = $('.page-header.cf');
const $studentItem = $('.student-item');
const $studentDetails = $('.student-details h3');
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
const filter = `<div class="student-search">
                    <input placeholder="Search for students..." class="search-box" />
                    <button class="search-button">Search</button>
                </div>
`;
$header.append(filter);

(function ($) {
    // custom css expression for a case-insensitive contains()
    jQuery.expr[':'].Contains = function (a, i, m) {
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    function listFilter(list) {
        $('.search-box')
            .change(function () {
                var filter = $(this).val();
                if (filter) {
                    // this finds all links in a list that contain the input,
                    // and hide the ones not containing the input while showing the ones that do
                    $(list).find(".student-details h3:not(:Contains(" + filter + "))").parent().parent().slideUp();
                    $(list).find(".student-details h3:Contains(" + filter + ")").parent().parent().slideDown();
                } else {
                    $(list).find(".student-details h3:Contains(" + filter + ")").parent().parent().slideDown();
                }
                return false;
            })
            .keyup(function () {
                // fire the above change event after every letter
                $(this).change();
            });
    }

    listFilter($('.student-list'));
}(jQuery));