'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');

  var setAddressFieldValue = function () {
    addressField.value = map.offsetWidth / 2 + ', ' + map.offsetHeight / 2;
  };

  var activateForm = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      if (formFieldsets[i].hasAttribute('disabled')) {
        formFieldsets[i].removeAttribute('disabled');
      }
    }
  };

  var deactivateForm = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      if (!formFieldsets[i].hasAttribute('disabled')) {
        formFieldsets[i].setAttribute('disabled', 'disabled');
      }
    }
  };

  window.form = {
    setAddressFieldValue: setAddressFieldValue,
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})();
