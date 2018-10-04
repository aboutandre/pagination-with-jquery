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
            console.log(index);
            $(element).show();
        } else {
            console.log('This should be hidden: ' + index);
            $(element).hide();
        }
    })
};
showPage();



// Create and append the pagination links - Creating a function that can do this is a good approach




// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here





// Search
$header.append($filter);