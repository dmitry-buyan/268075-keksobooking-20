'use strict';

(function () {
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo img');

  var uploadFile = function (fileChooser, filePreview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        filePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var resetPreview = function () {
    avatarPreview.src = DEFAULT_AVATAR;
    photoPreview.src = '';
    photoPreview.classList.add('hidden');
  };

  var onAvatarChange = function () {
    uploadFile(avatarChooser, avatarPreview);
  };

  var onPhotoChange = function () {
    photoPreview.classList.remove('hidden');
    uploadFile(photoChooser, photoPreview);
  };

  avatarChooser.addEventListener('change', onAvatarChange);

  photoChooser.addEventListener('change', onPhotoChange);

  window.preview = {
    resetPreview: resetPreview
  };
})();
