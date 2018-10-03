/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const $filter = $('<input type="text" />');
const $header = $('.page-header.cf');
const $allStudents = $('.student-item.cf');

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four




// Create and append the pagination links - Creating a function that can do this is a good approach




// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here


$header.append($filter);

// Search
$filter.keyup(function(){    
    let currentQuery = this; // We alias "this" so that it allows us to still access the original value of this.

    let $matchingStudents = $allStudents.filter(function(i, currentStudent){
        let studentText = $(currentStudent).text().toUpperCase()
        let searchText = currentQuery.value.toUpperCase();
        return ~studentText.indexOf(searchText);
    });
    
    $allStudents.hide(); // We hide all students
    $matchingStudents.show(); // We show only the students that match the search query
});
