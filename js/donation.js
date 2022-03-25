/*
 * donation page extra js, nice one-time/recur switcher
 *   
 */

/*jslint indent: 2 */
/*global CRM, ts */

CRM.$(function ($) {
  'use strict';
  var recurSettings = (typeof CRM.contributionrecur == 'undefined') ? CRM.vars.contributionrecur : CRM.contributionrecur;
  $('#priceset-div').before('<div class="gift-type-select"><div id="monthly-gift"><label>Monthly Gift</label></div><div id="one-time-gift"><label>One-time Gift</label></div></div>');
  if ($('#is_recur').prop('checked')) {
    setRecur();
  }
  else {
    setOneTime();
  }
  $('#one-time-gift').click(function() {
    $('#is_recur').prop('checked',false);
    setOneTime();
  });
  $('#monthly-gift').click(function() {
    $('#is_recur').prop('checked',true);
    setRecur();
  });
  $("#is_recur").change(function() {
    if (this.checked) {
      setRecur();
    }
    else {
      setOneTime();
    }
  });

  /* filter function to identify the 0 amount radio option */
  function zeroDataAmount(index, elem) {
    var amt = parseFloat($(elem).attr('data-amount'));
    return (amt == 0);
  }

  // when switching to recur, set all the one-time 'data' values to 0!
  function setRecur() {
    $('#one-time-gift').removeClass('selected');
    $('#monthly-gift').addClass('selected');
    var giftAmount = $(recurSettings.one_time_gift_section).find('input:checked').attr('data-amount');
    var otherGiftAmount = $(recurSettings.other_one_time_amount_section).find('input').val();
    $(recurSettings.one_time_gift_section).find('input').prop('checked',false);
    $(recurSettings.one_time_gift_section).find('input').filter(zeroDataAmount).trigger('click');
    $(recurSettings.one_time_gift_section).hide('slow');
    $(recurSettings.other_one_time_amount_section).find('input').val('0').blur();
    $(recurSettings.other_one_time_amount_section).hide('slow');
    $(recurSettings.monthly_gift_section).find('input').prop('checked',false);
    $(recurSettings.monthly_gift_section).show('slow');
    $(recurSettings.other_amount_section).show('slow');
    $(recurSettings.monthly_gift_section).find('input').prop('checked',false);
    var calcThis = $(recurSettings.monthly_gift_section).find('input[data-amount="'+giftAmount+'"]').trigger('click');
    if (calcThis.length > 0) {
      calculateCheckboxLineItemValue(calcThis);
    }
    $(recurSettings.other_amount_section).find('input').val(otherGiftAmount).blur();
  }
  function setOneTime() {
    $('#one-time-gift').addClass('selected');
    $('#monthly-gift').removeClass('selected');
    var giftAmount = $(recurSettings.monthly_gift_section).find('input:checked').attr('data-amount');
    var otherGiftAmount = $(recurSettings.other_amount_section).find('input').val();
    $(recurSettings.monthly_gift_section).find('input').prop('checked',false).blur();
    $(recurSettings.monthly_gift_section).find('input').filter(zeroDataAmount).trigger('click').blur(); // .prop('checked',true);
    $(recurSettings.monthly_gift_section).hide('slow');
    $(recurSettings.other_amount_section).find('input').val('0').blur();
    $(recurSettings.other_amount_section).hide('slow');
    $(recurSettings.one_time_gift_section).show('slow');
    $(recurSettings.other_one_time_amount_section).show('slow');
    $(recurSettings.one_time_gift_section).find('input').prop('checked',false).blur();
    var calcThis = $(recurSettings.one_time_gift_section).find('input[data-amount="'+giftAmount+'"]').trigger('click');
    if (calcThis.length > 0) {
      calculateCheckboxLineItemValue(calcThis);
    }
    $(recurSettings.other_one_time_amount_section).find('input').val(otherGiftAmount).blur();
  }
});


