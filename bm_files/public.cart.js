function onBeginAddToCart() {
    waitForPopup();
}

function onCompleteAddToCart(html) {
    hidePopup();
    if (html.toString().indexOf('cart-warnings') != -1) {
        showMiniCartWarning(html);
        return;
    }
    showMiniCart();
}

var originalPointTotal = 0;
var currentPointTotal = 0;



function getPointCost(cartItemRow) {
    var priceHtml = $(cartItemRow).find('.productPrice').html();
    var price = Number(priceHtml.replace(/[^0-9\.]+/g, ''));
    var quantity = $(cartItemRow).find('.shoppingcartquantitytext').val();
    var points = Math.round(price * quantity).toFixed(1);
    return points;
}

function updateCartItemLoyaltyPoints(cartItemRow) {
    var pointCost = getPointCost(cartItemRow);
    var discountRow = $(cartItemRow).next('.cart-item-discount-row');
    var reducedPriceId = $(cartItemRow).find('.reducedPrice').attr('id');
    var productPriceId = $(cartItemRow).find('.productPrice').attr('id');
    var itemSubTotalId = $(cartItemRow).find('.itemSubTotal').attr('id');
    var reducedSubTotalId = $(cartItemRow).find('.reducedSubTotal').attr('id');
    var pointsButton = $(discountRow).find('.applyLoyaltyPointsButton');

    $(pointsButton).html('Use ' + pointCost + ' points for this item');
    $(pointsButton).data('points', pointCost);
    $(pointsButton).data('reducedPriceId', reducedPriceId);
    $(pointsButton).data('productPriceId', productPriceId);
    $(pointsButton).data('reducedSubTotalId', reducedSubTotalId);
    $(pointsButton).data('productSubTotalId', itemSubTotalId);


    $(pointsButton).click(function () {
        applyLoyaltyPoints($(this));
        return false;
    });
}

function applyLoyaltyPoints(loyaltyPointButton) {
    var data = $(loyaltyPointButton).data('points');
    var applied = $(loyaltyPointButton).data('applied');
    var reducedPriceId = $(loyaltyPointButton).data('reducedPriceId');
    var productPriceId = $(loyaltyPointButton).data('productPriceId');
    var reducedSubTotalId = $(loyaltyPointButton).data('reducedSubTotalId');
    var itemSubTotalId = $(loyaltyPointButton).data('productSubTotalId');

    if (!applied) {
        // apply the points
        $(loyaltyPointButton).data('applied', true);
        $(loyaltyPointButton).nextAll('input.loyaltyPointsApplied').val(data);
        $(loyaltyPointButton).addClass('used-points');
        $(loyaltyPointButton).html(data + ' points used');

        // mark down the product
        if (reducedPriceId.length > 0) {
            $('#' + reducedPriceId).removeClass('hidden');
        }

        // switch out the item line sub total for the reduced sub total
        if (reducedSubTotalId.length > 0) {
            $('#' + reducedSubTotalId).removeClass('hidden');
        }

        if (itemSubTotalId.length > 0) {
            $('#' + itemSubTotalId).addClass('hidden');
        }

        // add strikethrough on product price
        if (productPriceId.length > 0) {
            $('#' + productPriceId).addClass('fontStrikethrough');
        }

    }
    else {
        // remove the points
        $(loyaltyPointButton).data('applied', false);
        $(loyaltyPointButton).nextAll('input.loyaltyPointsApplied').val(0);
        $(loyaltyPointButton).removeClass('used-points');
        $(loyaltyPointButton).html('Use ' + data + ' points for this item');

        // remove the markdown price
        if (reducedPriceId.length > 0) {
            $('#' + reducedPriceId).addClass('hidden');
        }

        // switch out the reduced item line sub total for normal one
        if (reducedSubTotalId.length > 0) {
            $('#' + reducedSubTotalId).addClass('hidden');
        }

        if (itemSubTotalId.length > 0) {
            $('#' + itemSubTotalId).removeClass('hidden');
        }

        // remove strikethough on product price
        if (productPriceId.length > 0) {
            $('#' + productPriceId).removeClass('fontStrikethrough');
        }

    }

    updateLoyaltyPoints();
}

function updateLoyaltyPointButtons() {
    $('.cart-item-row').each(function () {
        updateCartItemLoyaltyPoints($(this));
    });
}

function updateLoyaltyPoints() {
    // determine the available points left;
    currentPointTotal = originalPointTotal;

    $('.cart-item-discount-row .used-points').each(function () {
        currentPointTotal = currentPointTotal - $(this).data('points');
    });

    // update the available points textbox
    $('.loyalty-points-summary .available-textbox').val(currentPointTotal);

    // determine if points can still be applied to unapplied items
    $('.cart-item-discount-row .applyLoyaltyPointsButton').each(function () {
        var applied = $(this).data('applied');
        if (!applied) {
            var points = $(this).data('points');

            if (Number(points) > Number(currentPointTotal)) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }
    });

    //updateCartTotals();
}

function updateCartTotals() {
    var cartSubTotal = 0;

    // add up all the normal item sub totals shown
    $('.itemSubTotal').each(function () {
        if (!$(this).hasClass('hidden')) {
            var itemSubTotal = Number($(this).html().replace(/[^0-9\.]+/g, ''));
            cartSubTotal += itemSubTotal;
        }
    });

    // add up allo the discount sub totals shown
    $('.reducedSubTotal').each(function () {
        if (!$(this).hasClass('hidden')) {
            var itemSubTotal = Number($(this).html().replace(/[^0-9\.]+/g, ''));
            cartSubTotal += itemSubTotal;
        }
    });

    var cartTaxTotal = Number($('#cart-tax-total').html().replace(/[^0-9\.]+/g, ''));
    cartTaxTotal = Math.round(cartTaxTotal).toFixed(2);
    cartSubTotal = Math.round(cartSubTotal).toFixed(2);
    var cartTotal = cartTaxTotal + cartSubTotal;

    $('#cart-sub-total').html('$' + cartSubTotal);
    $('#cart-total').html('$' + cartTotal);
}
