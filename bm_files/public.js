
function getE(name) {
    if (document.getElementById)
        var elem = document.getElementById(name);
    else if (document.all)
        var elem = document.all[name];
    else if (document.layers)
        var elem = document.layers[name];
    return elem;
}

function OpenWindow(query, w, h, scroll) {
    var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 2;

    winprops = 'resizable=0, height=' + h + ',width=' + w + ',top=' + t + ',left=' + l + 'w';
    if (scroll) winprops += ',scrollbars=1';
    var f = window.open(query, "_blank", winprops);
}

function setLocation(url) {
    window.location.href = url;
}

function alignProductImages(productSet) {
    var maxImageHeight = 75;
    var maxProductDescriptionHeight = 30;
    $(productSet).find('.product-grid-item').each(function () {
        var picture = $(this).find('.picture');
        var description = $(this).find('.product-description');

        var pictureHeight = picture.outerHeight();
        if (pictureHeight == 0) {
            $(picture).find('a img').load(function () {
                var imageHeight = $(this).outerHeight();
                if (imageHeight > maxImageHeight) {
                    maxImageHeight = imageHeight;
                    applyProductSetImageHeight(productSet, imageHeight);
                }
            });
        }
        else {
            if (pictureHeight > maxImageHeight) {
                maxImageHeight = pictureHeight;
                applyProductSetImageHeight(productSet, pictureHeight);
            }
        }

        // determine the max description height
        var descriptionHeight = description.outerHeight();
        if (descriptionHeight > maxProductDescriptionHeight) {
            maxProductDescriptionHeight = descriptionHeight;
        }

    });

    //$(productSet).find('.product-grid-item .product-description').css('height', maxProductDescriptionHeight + 'px');
}

function applyProductSetImageHeight(productSet, imageHeight) {
    //$(productSet).find('.product-grid-item .picture').css('height', imageHeight + 'px');
}

function changeProductSet(productCategory, direction) {
    // hide the current visible set
    var currentProductSet = getVisibleProductSet(productCategory);
    $(currentProductSet).addClass('hidden');

    // show the next or previous set
    var newProductSet = (direction == 'next') ?
            $(currentProductSet).next() :
            $(currentProductSet).prev();

    if (direction == null)
        newProductSet = currentProductSet;

    $(newProductSet).removeClass('hidden');

    alignProductImages(newProductSet);

    // update the set buttons
    updateSetButtons(productCategory);
}

function getVisibleProductSet(productCategory) {
    var visibleProductSet = $(productCategory).children('.product-set').not('.hidden').first();
    if (visibleProductSet.length == 0) {
        visibleProductSet = $(productCategory).children('.product-set').first();
    }

    return visibleProductSet;
}

function updateSetButtons(productCategory) {
    var selectedProductSet = getVisibleProductSet(productCategory);
    var nextSet = $(productCategory).children('.next-set');
    var prevSet = $(productCategory).children('.prev-set');

    // get the index of selected product set
    var index = $(productCategory).children('.product-set').index(selectedProductSet);
    var productSetCount = $(productCategory).children('.product-set').length;
    if (index == 0) {
        // this is the first product set so hide the previous button
        $(prevSet).addClass('hidden');
    } else {
        $(prevSet).removeClass('hidden');
    }

    if (index == productSetCount - 1) {
        // this is the last product set so hide the next button
        $(nextSet).addClass('hidden');
    } else {
        $(nextSet).removeClass('hidden');
    }

}

function isImageOK(img) {
    if (!img.complete) {
        return false;
    }
    
    if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {
        return false;
    }

    return true;
}



function updateCufons() {
    Cufon.replace('.cufon-junction-regular', { fontFamily: 'junction regular', hover: true });
    Cufon.replace('.cufon-aargh-normal', { fontFamily: 'Aaargh Normal', hover: true });
    Cufon.replace('.cufon-segan-light', { fontFamily: 'Segan Light', hover: true });
    Cufon.replace('.cufon-caviar-dreams-bold', { fontFamily: 'Caviar Dreams Bold', hover: true });
    Cufon.replace('.cufon-caviar-dreams-bold-italic', { fontFamily: 'Caviar Dreams Bold Italic', hover: true });
    Cufon.replace('.cufon-caviar-dreams', { fontFamily: 'Caviar Dreams', hover: true });
    Cufon.replace('.cufon-caviar-dreams-italic', { fontFamily: 'Caviar Dreams Italic', hover: true });
}

function adjustPageSize() {

    var centerColHeight = $('.master-wrapper-center-3').height();
    var footerHeight = $('.footer').height();
    var leftColHeight = $('.master-wrapper-leftside-3').height();
    var rightColHeight = $('.master-wrapper-rightside-3').height();
    var maxColHeight = (leftColHeight > rightColHeight) ? leftColHeight : rightColHeight;

    if (centerColHeight < maxColHeight) {
        $('.master-wrapper-cph-3').css('min-height', maxColHeight - footerHeight - 40);
    }
    //            else {
    //                var columnHeight = $('.master-wrapper-content').height();
    //                var leftAdHeight = $('.master-wrapper-leftside-3 .ad-space').height();
    //                var rightAdHeight = $('.master-wrapper-rightside-3 .ad-space').height();
    //                var headerHeight = $('.header').height();
    //                var menuHeight = $('.headermenu').height();
    //                var padding = 40;

    //                rightAdHeight += (columnHeight - headerHeight - menuHeight - rightColHeight - padding);
    //                leftAdHeight += (columnHeight - headerHeight - menuHeight - leftColHeight - padding);

    //                $('.master-wrapper-leftside-3 .ad-space').css('min-height', leftAdHeight);
    //                $('.master-wrapper-rightside-3 .ad-space').css('min-height', rightAdHeight);
    //                
    //            }

}

function alignProductGridRows(productGrid) {
    $(productGrid).find('.slider').each(function () {
        var maxImageHeight = 75;
        var maxProductDescriptionHeight = 30;
        var sliderLength = 0;
        $(this).find('.product-grid-item').each(function () {

            // determine the max picture height
            var pictureHeight = $(this).find('.picture').outerHeight();
            if (pictureHeight > maxImageHeight) {
                maxImageHeight = pictureHeight;
            }

            // determine the max description height
            var descriptionHeight = $(this).find('.product-description').outerHeight();
            if (descriptionHeight > maxProductDescriptionHeight) {
                maxProductDescriptionHeight = descriptionHeight;
            }

            sliderLength += $(this).outerWidth(true);
        });

        $(this).data('length', sliderLength);

        $(this).find('.product-grid-item .picture').css('height', maxImageHeight);
        $(this).find('.product-grid-item .product-description').css('height', maxProductDescriptionHeight);

        var newSliderHeight = maxImageHeight + maxProductDescriptionHeight + 65;
        $(this).css('height', newSliderHeight);
        $(this).parent('.product-category').css('height', newSliderHeight);

    });
}

var integerExpression = "/^\d+$/";
function isNumeric(s) {

}

function slideForward() {
    var slider = $(this).parent('.product-category').find('.slider');
    var left = $(slider).css('left').replace('px', '');
    if (isNaN(left)) {
        left = 0;
    }
    var sliderLength = $(slider).data('length');
    var productCategoryDisplayWidth = $('.product-category').first().outerWidth();
    if (sliderLength > (Math.abs(left) + productCategoryDisplayWidth)) {
        unbindSlide();
        $(slider).animate({ left: '-=300' }, 600, function () {
            bindSlide();
            updateSliderButtons(this);
        });
    }
}

function slideBackward() {
    var slider = $(this).parent('.product-category').find('.slider');
    var left = $(slider).css('left').replace('px', '');
    if (isNaN(left)) {
        left = 0;
    }
    var sliderLength = $(slider).data('length');
    if (left < 0) {
        unbindSlide();
        $(slider).animate({ left: '+=300' }, 600, function () {
            bindSlide();
            updateSliderButtons(this);
        });
    }
}

function updateSliderButtons(slider) {
    var productCategory = $(slider).parent('.product-category');
    var productCategoryDisplayWidth = $(productCategory).outerWidth();

    var sliderLength = $(slider).data('length');
    var left = $(slider).css('left').replace('px', '');
    if (isNaN(left)) {
        left = 0;
    }

    if (left >= 0) {
        $(productCategory).find('.previous').addClass('hidden');
    } else {
        $(productCategory).find('.previous').removeClass('hidden');
    }

    if (sliderLength > (Math.abs(left) + productCategoryDisplayWidth)) {
        $(productCategory).find('.next').removeClass('hidden');
    } else {
        $(productCategory).find('.next').addClass('hidden');
    }
}

function initSliderButtons() {
    $('.product-category .slider').each(function() {
        updateSliderButtons(this);
    });
}

function bindSlide() {
    $('.product-category .next').click(slideForward);
    $('.product-category .previous').click(slideBackward);
}

function unbindSlide() {
    $('.product-category .next').unbind('click');
    $('.product-category .previous').unbind('click');
}


function prefilledUnFocus(el, unel) {

    var s = $(el).val();

    if (!s || ('' == $.trim(s))) {
        
        $(unel).show();
        $(el).hide();
    }
}


function prefilledReFocusField(dummy, el) {
  
    $(el).show();
    $(el).focus();
    $(dummy).hide();
}