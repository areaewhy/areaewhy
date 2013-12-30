// displays drop down popup windows in header links
function showHeaderDropDown(dropdown) {
    var selectedId = $(dropdown).attr("id");
    $('.header-dropdown').each(function () {
        var currentId = $(this).attr("id");
        if (selectedId != currentId) {
            $(this).hide();
        }
    });

    dropdown.toggle();

    // the following event sink causes the dropdown content
    // to disappear after 3 seconds.
    dropdown.mouseleave(function () {

        if (dropdown.is(':visible')) {
            setTimeout(function () {
                dropdown.hide();
            }, 3000);
        }
    });
}

// utility function for centering elements
jQuery.fn.center = function (parent) {
    if (parent == null)
        parent = $(window);
    this.css('position', 'absolute');
    var top = ((parent.height() - this.outerHeight()) / 2) + parent.scrollTop();
    if (top < 0) top = 0;
    var left = ((parent.width() - this.outerWidth()) / 2) + parent.scrollLeft();
    if (left < 0) left = 0;

    this.css("top", top + "px");
    this.css("left", left + "px");
    return this;
};

jQuery.fn.updateFormsValidation = function () {
    this.find("form:data-ajax-update").each(function () {
        $.validator.unobtrusive.parse(this);
    });
};

// resizes the popup if visible
function resizePopup() {
    if ($('#popup-window').is(":visible")) {
        $('#popup-window').center();
    }
}

// sets the current cursor to a wait cursor
function showWaitCursor() {
    $('body').css({ 'cursor': 'wait' });
}

// resets the current cursor type
function resetCursor() {
    $('body').css({ 'cursor': 'auto' });
}

// alerts the user that a popup is going to be displayed
function waitForPopup(waitMessage) {
    // todo: implement custom wait messages
    $('#popup-background')
                .css({ 'opacity': '0.6' })
                .fadeIn('fast');

    $('#popup-wait-message')
                .center()
                .fadeIn();

    showWaitCursor();
}

// displays the popup
function showPopup(html) {
    $('#popup-window #popup-content').html(html);
    $('#popup-wait-message').fadeOut('fast');
    $('#popup-wait-spinner').center($('#popup-window'));
    $('#popup-window')
                .center()
                .fadeIn();

    resetCursor();
}

// hides the popup
function hidePopup() {
    $('#popup-window').fadeOut();
    $('#popup-background').fadeOut('fast');
    $('#popup-window #popup-content').empty();
    $('#popup-wait-message').fadeOut('fast');
}

function hidePopupWaitSpinner() {
    $('#popup-wait-spinner').hide();
}

