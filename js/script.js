/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const $filter = $('<input type="text" />');
const $header = $('.page-header.cf');
const $allStudents = $('.student-item.cf');
const $studentsCount = $allStudents.length;
const studentsPerPage = 5;
let $visibleStudentsAmmount = $studentsCount; // This is the current number of students that have not been filtered

// Create a function to hide all of the items in the list except for the ten you want to show
// Tip: Keep in mind that with a list of 54 students, the last page will only display four
const showVisibleAndUnfilteredStudents = function () {
    $('.student-item:not(".filtered"):gt(' + (studentsPerPage - 1) + ')').hide();
};

// Create and append the pagination links - Creating a function that can do this is a good approach
const createPagination = function () {
    let pagesTotal = Math.round($visibleStudentsAmmount / studentsPerPage) + 1;
    console.log('The total pages is ' + pagesTotal);
    $('.pagination').remove();
    let pagination = '';
    pagination += '<ul class="pagination">';
    for (let i = 1; i < pagesTotal; i++) {
        let paginationItem = '<li><a href="#/" class="button-page">' + i + '</a></li>';
        pagination += paginationItem;
    }
    pagination += '</ul>';
    $('.page').append(pagination);
}

showVisibleAndUnfilteredStudents();
createPagination();

// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here


$header.append($filter);

// Search
$filter.keyup(function () {
    let currentQuery = this; // We alias "this" so that it allows us to still access the original value of this.

    let $matchingStudents = $allStudents.filter(function (i, currentStudent) {
        let studentText = $(currentStudent).text().toUpperCase()
        let searchText = currentQuery.value.toUpperCase();
        return ~studentText.indexOf(searchText);
    });

    $allStudents.addClass('filtered').hide(); // We hide all students
    $matchingStudents.removeClass('filtered').show(); // We show only the students that match the search query
    $visibleStudentsAmmount = $allStudents.not('.filtered').length;
    console.log('The max visible student ammount is ' + $visibleStudentsAmmount);
    showVisibleAndUnfilteredStudents();
    createPagination();
    $allStudents.not('.filtered').css("background-color", "yellow");
});
