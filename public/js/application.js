
var createPoll = function(pollType) {

//Create a new Poll
var newPollForm = $("<form id='newPollForm'>");
var newPollQuestionFormGroup = $("<div class='form-group'> ")
var newPollLabel = $("<label for='pollQuestion'>Enter Poll Question:</label>").appendTo(newPollQuestionFormGroup);
var newPollQuestion = $("<input type='text' class='form-control' id='pollQuestion'> </div>").appendTo(newPollQuestionFormGroup);

var newPollSubmitButton = $("<input type='button' class='btn btn-primary' id='submitbutton' value='Submit Button'>");

newPollForm.append(newPollQuestionFormGroup).append(newPollSubmitButton);

//Add a data attribute that will be passed during service call.
$(newPollForm).attr('data-polltype',pollType)

//Append the poll to main content area
$("#mainContent").append(newPollForm);
}

$(document).ready(function(){

/**
 * This object controls the nav bar. Implement the add and remove
 * action over the elements of the nav bar that we want to change.
 *
 * @type {{flagAdd: boolean, elements: string[], add: Function, remove: Function}}
 */
var myNavBar = {

    flagAdd: true,

    elements: [],

    init: function (elements) {
        this.elements = elements;
    },

    add : function() {
        if(this.flagAdd) {
            for(var i=0; i < this.elements.length; i++) {
                document.getElementById(this.elements[i]).className += " fixed-theme";
            }
            this.flagAdd = false;
        }
    },

    remove: function() {
        for(var i=0; i < this.elements.length; i++) {
            document.getElementById(this.elements[i]).className =
                    document.getElementById(this.elements[i]).className.replace( /(?:^|\s)fixed-theme(?!\S)/g , '' );
        }
        this.flagAdd = true;
    }

};

/**
 * Init the object. Pass the object the array of elements
 * that we want to change when the scroll goes down
 */
myNavBar.init(  [
    "header",
    "header-container",
    "brand"
]);

/**
 * Function that manage the direction
 * of the scroll
 */
function offSetManager(){
      var yOffset = 0;
    var currYOffSet = window.pageYOffset;
      if(yOffset < currYOffSet) {
        myNavBar.add();
    }
    else if(currYOffSet == yOffset){
        myNavBar.remove();
    }

}

/**
 * bind to the document scroll detection
 */
window.onscroll = offSetManager;

/**
 * We have to do a first detectation of offset because the page
 * could be load with scroll down set.
 */
offSetManager();

$(".createPollButton").click( function(){
  //hide div's and create a poll
  $('.profileContent').hide();
  createPoll($(this).data('polltype'));
});

});
