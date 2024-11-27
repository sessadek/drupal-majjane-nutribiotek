(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.chip = {
    attach(context) {
      $(document).ready(function () {
        context.querySelectorAll('.chip--dismissable').forEach((chip) => {
          chip.addEventListener('click', () => {
            chip.classList.toggle('chip--dismissed');
          })
        });
      });
      
    },
  };
}(jQuery, Drupal, drupalSettings));
