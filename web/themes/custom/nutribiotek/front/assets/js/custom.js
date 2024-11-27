// Define responsive breakpoints for different screen sizes
var breakpoints = {
	xs: 0,      // Extra small devices (0px and up)
	sm: 375,    // Small devices (375px and up), such as small mobile screens
	md: 992,    // Medium devices (992px and up), typically tablets and small desktops
	lg: 1199    // Large devices (1199px and up), for larger desktops
};

// Declare a global variable `app` to serve as the main application namespace or entry point
var app;

(function ($, Drupal, drupalSettings) {
	Drupal.behaviors.ThemeBehaviour = {
		attach: function (context, settings) {
			var app = {
				_init: function () {
					this.swiperNewsHome();
					this.swiper_pertners();
					this.toggleCustomDropdown();
					this.current_lang();
					this.dropdown_icons();
					this.toggleNavigationMenu();
					this.imgnavheader();
					this.lang_dropdown();
					this.size_remove();
					this.hide_emptyitems();
					this.custem_form();
					this.search_form_actualite();
					this.toggleHeaderOnScroll();
					this.addDropdownIconsToNav();
					// this.initializeInternationalTelephoneInput();
					this.linkedInSwiper();
					this.handleFileInputInteraction();
					this.play_video();
				},
				// Initialize the Swiper slider for the 'swiper_chiffres_home' section on the homepage
				swiperNewsHome: function () {
					// Check if the element with class 'swiper_chiffres_home' exists on the page
					if (document.querySelector('.swiper_chiffres_home')) {
						// Define Swiper slider options
						let options = {
							spaceBetween: 10,
							grabCursor: true,
							a11y: true,
							freeMode: true,
							speed: 4000,
							loop: true,
							slidesPerView: 1,  // moad
							slidesPerGroup: 1, // Number of slides per swipe
							autoplay: {
								delay: 0.5,
								disableOnInteraction: false,
							},
							breakpoints: {
								[breakpoints.xs]: {
									slidesPerView: 1,
									spaceBetween: 10,
								},
								[breakpoints.sm]: {
									slidesPerView: 2,
								},
								[breakpoints.md]: {
									slidesPerView: 3,
								},
								[breakpoints.lg]: {
									slidesPerView: 3,
								}
							},
						}
						// Initialize Swiper with specified options on the 'swiper_chiffres_home' element
						var swiper_chiffres = new Swiper('.swiper_chiffres_home', options);
					}
				},
				swiper_pertners: function () {
					if (document.querySelector('.swipcontainer_partners')) {
						var swiperrrrqe = new Swiper('.swipcontainer_partners', {
							slidesPerView: 1, // Adjust to show multiple slides if needed
							spaceBetween: 20, // Spacing between slides
							navigation: {
								nextEl: '.button-next',
								prevEl: '.button-prev',
							},
							pagination: {
								el: '.swiper-pagination',
								clickable: true,
							},
							loop: false, // Enable looping if required
						});
					}
				},
				toggleCustomDropdown: function () {
					// Toggle the dropdown menu on button click
					$('.custom-dropdown-toggle').click(function () {
						$(this).next('.custom-dropdown-menu').toggle();
						$(this).toggleClass('active_dropdown'); // Toggle the active class correctly
					});

					// Close dropdown if clicking outside
					$(document).click(function (e) {
						if (!$(e.target).closest('.custom-dropdown').length) {
							$('.custom-dropdown-menu').hide();
							$(".custom-dropdown-toggle").removeClass('active_dropdown'); // Remove the active class when clicking outside
						}
					});
				},
				current_lang: function () {
					$(document).ready(function() {
						const currentLang = $('html').attr('lang'); // Get current language from <html> tag
						// Capitalize only the first letter
						const formattedLang = currentLang.charAt(0).toUpperCase() + currentLang.slice(1);
						// Update the button content with the formatted language code and the dropdown arrow icon
						$('.custom-dropdown-toggle').html(`
							${formattedLang}
							<img src="/themes/custom/nutribiotek/front/assets/images/dropdown.svg" alt="dropdown icon">
						`);
					});
				},
				dropdown_icons: function () {
					// Define the image HTML
					const dropdownIcon = '<img src="/themes/custom/nutribiotek/front/assets/images/dropdown_icon_nav.svg" class="dropdown-icon-nav" alt="dropdown icon">';
					// Iterate over each `.menu-item--expanded` in `.menu-level-0`
					$('header .menu-level-0 .menu-item--expanded').each(function() {
						const link = $(this).find('a').first();
						// Only append the icon if it’s not already present
						if (link.find('img[alt="dropdown icon"]').length === 0) {
							link.append(dropdownIcon);
						}
					});
				},
				toggleNavigationMenu: function () {
					// Open the navigation menu on menu button click
					$('.menu_button').click(function () {
						$('.navigation_menu').toggleClass('active');
					});

					// Close the navigation menu on close button click
					$('.close_btn').click(function () {
						$('.navigation_menu').removeClass('active');
					});
				},imgnavheader: function () {
					// Add class on load
					$('.menu-level-1 .menu-item img').first().addClass('active_navbar_img');
					// Hover effect
					$('.menu-level-1 .menu-item').hover(
						function() {
							// On hover
							$(this).find('img').addClass('active_navbar_img');
						},
						function() {
							// On hover out
							$(this).find('img').removeClass('active_navbar_img');
							$('.menu-level-1 .menu-item img').first().addClass('active_navbar_img');
						}
					);
				},lang_dropdown: function () {
					$('.custom-dropdown-menu .language-link').each(function() {
						// Get the first two letters, convert first to uppercase and second to lowercase
						var languageCode = $(this).text().substring(0, 2);
						$(this).text(languageCode.charAt(0).toUpperCase() + languageCode.charAt(1).toLowerCase());
					});
				}
				,size_remove: function () {
					$('input').each(function() {
						$(this).removeAttr('size');
					});
				},hide_emptyitems: function () {
					// Select all breadcrumb links and check if they are empty
					$('.breadcrumb_link').each(function() {
						if ($(this).text().trim() === '') {
							// Hide the empty link's parent element
							$(this).closest('.breadcrumb_item').hide();
						}
					});
				},custem_form: function () {
					// Target the form by its ID
					const $form = $('#contact-message-feedback-form');
					if ($form.length) {

					// Add the class 'input_form' to each input field inside the form
					$form.find('input[type="text"], input[type="email"]').each(function() {
						// Add the class 'input_form'
						$(this).addClass('input_form mb-3');

						// Find the closest label and remove it
						const $label = $(this).closest('.form-item').find('label');
						if ($label.length) {
							// Set the label text as the input's placeholder value
							$(this).attr('placeholder', $label.text().trim());
							
							// Remove the label from the form
							$label.remove();
						}
					});

					// Add the class 'input_form' to the textarea field and apply similar logic
					$form.find('textarea').each(function() {
						$(this).addClass('input_form mb-3');
						$(this).attr('rows', 4);  // Set rows to 4

						// Find the closest label and remove it
						const $label = $(this).closest('.form-item').find('label');
						if ($label.length) {
							// Set the label text as the textarea's placeholder value
							$(this).attr('placeholder', $label.text().trim());

							// Remove the label from the form
							$label.remove();
						}
					});
					// Add the class 'primary_btn_global w-100' to the submit input
					$form.find('input[type="submit"]').each(function() {
						$(this).addClass('primary_btn_global w-100');
					});
					$form.find('input[type="checkbox"]').each(function() {
						// Add the required classes to the checkbox
						$(this).addClass('primary_checkbox_class'); // Optional custom class
				
						// Find the closest label
						const $label = $(this).closest('.form-item').find('label');
						if ($label.length) {
							// Add d-flex gap-2 class to the parent div (the form-item div)
							const $parentDiv = $(this).closest('.form-item');
							$parentDiv.addClass('d-flex gap-3 mb-5');
				            $label.addClass('link_label');

							// Set the label text as the input's placeholder value
							$(this).attr('id', 'terms-conditions'); // Example ID
							$label.attr('for', 'terms-conditions'); // Example 'for' attribute for label
						}
					});
					$form.find('input[type="tel"]').each(function() {
						// Add the classes 'input_form' and 'input_tel'
						$(this).addClass('input_form input_tel');
						$(this).closest('.form-item').addClass('mb-3');

						// Find the closest label and remove it
						const $label = $(this).closest('.form-item').find('label');
						if ($label.length) {
							// Remove the label from the form
							$label.remove();
						}
					});
					// Insert <div class="my-3 line-middle"></div> after the 4th form-item
					const $fourthFormItem = $form.find('.form-item').eq(4); // Select the 4th .form-item (index starts at 0)
					if ($fourthFormItem.length) {
						$fourthFormItem.after('<div class="my-3 line-middle"></div>'); // Insert the div after the 4th item
					}

					const $firstTwoItems = $form.find('.form-item').slice(0, 2); // Select the first two form-items
					const $rowDiv = $('<div class="row"></div>'); // Create a new div with class 'row'
					$firstTwoItems.each(function() {
						const $colDiv = $('<div class="col-6"></div>');
						$colDiv.append($(this)); // Move the form item into the col div
						$rowDiv.append($colDiv); // Append col div into the row div
					});
					$form.prepend($rowDiv); // Insert the row div at the start of the form
					}

				},search_form_actualite: function() {
					// Target the form by its ID
					const $form = $('#views-exposed-form-actualites-block-1');
				    $form.css('text-align', 'end');
					if ($form.length) {

					// Add the class 'search_input' to each text input field inside the form
					$form.find('input[type="text"]').each(function() {
						// Add the class 'search_input'
						$(this).addClass('search_input');
				
						// Find the closest label and set it as the input's placeholder, then remove the label
						const $label = $(this).closest('.form-item').find('label');
						if ($label.length) {
							$(this).attr('placeholder', $label.text().trim());
							$label.remove();
						}
					});
					$('#edit-submit-actualites').remove();
					$('#edit-reset').addClass('reset_link');
					}
				},
				toggleHeaderOnScroll: function () {
					const logo = $('.site_logo');
					const mainHeader = $('.main_header');
					// Check if we are NOT on the homepage and NOT on /fr, /en, /ar
					const excludedPaths = ['/', '/fr', '/en', '/ar'];
					// Check if we are NOT on the homepage
					if (!excludedPaths.includes(window.location.pathname)) {
						// Add the 'white_header' class and adjust the logo on non-homepage load
						mainHeader.addClass('white_header');
						logo.addClass('white_size_logo');
					} else {
						// Handle the scroll event ONLY on the homepage
						$(window).scroll(function () {
							if ($(this).scrollTop() > 100) {
								mainHeader.addClass('white_header');
								logo.addClass('white_size_logo');
							} else {
								mainHeader.removeClass('white_header');
								logo.removeClass('white_size_logo');
							}
						});
					}
				},
				addDropdownIconsToNav: function () {
					// $('.main_header .menu-item--expanded > a:first').each(function () {
					// 	// Append the dropdown icon to the <a> tag inside .main_header and menu-item--expanded
					// 	$(this).append('<img src="assets/images/dropdown_icon_nav.svg" class="dropdown-icon-nav" alt="Dropdown Icon">');
					// });
				},
				initializeInternationalTelephoneInput: function () {
					var input = document.querySelector(".form-type-tel input[type='tel']");
					if (input) {
						var iti = window.intlTelInput(input, {
							initialCountry: "auto", // Automatically detect the user's country
							geoIpLookup: function (callback) {
								$.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
									var countryCode = (resp && resp.country) ? resp.country : "us"; // Default to US if no country found
									callback(countryCode);
								});
							},
							utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.0/js/utils.js" // Load utils.js for formatting
						});

						// Optional: Handle form submission
						$("form").on("submit", function (e) {
							// e.preventDefault(); // Prevent the default form submission
							var phoneNumber = iti.getNumber(); // Get the full phone number with country code
							console.log("Phone Number: " + phoneNumber); // Output the phone number
						});
					}
				},
				linkedInSwiper: function () {
					if (document.querySelector('.linkedin_swiper')) {
						var swiper = new Swiper(".linkedin_swiper", {
							spaceBetween: 30,
							slidesPerView: 'auto',
							scrollbar: {
								el: ".swiper-scrollbar",
								hide: false,
							}
						});
					}
				},
				handleFileInputInteraction: function () {
					// Click event for file buttons
					$('.file_btn').on('click', function () {
						const $fileInput = $(this).closest('.input_form').siblings('.file_input'); // Get the closest hidden file input
						$fileInput.click(); // Trigger the hidden file input click
					});
				
					// Change event for file inputs
					$('.file_input').on('change', function () {
						const fileName = this.files.length > 0 ? this.files[0].name : 'Aucun fichier choisi'; // Get the selected file name or default message
						$(this).siblings('.input_form').find('.inpput_file_txt').text(fileName); // Update the text to show the file name
					});
				},
				play_video: function () {
					const playButton = document.querySelector('.video_icon');
					const videoLink = document.querySelector('.video-link');
					if(playButton){
						playButton.addEventListener('click', function () {
							Fancybox.show([{ src: videoLink.href, type: "video" }]);
						});
					}
				}
				
			}

			// init app
			app._init();


			// Select all product containers
			const productItems = document.querySelectorAll('.product_cnt');

			// Create an Intersection Observer instance
			const observer = new IntersectionObserver((entries) => {
				if (window.innerWidth < 700) {  // Check if window width is < 500px
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('hover');  // Add hover class
						} else {
							entry.target.classList.remove('hover');  // Optional: Remove when out of view
						}
					});
				}
			}, { threshold: 1 });  // Trigger when 50% of the element is visible

			// Observe each product item
			productItems.forEach((item) => observer.observe(item));

			// Update observer on window resize
			window.addEventListener('resize', () => {
				productItems.forEach((item) => observer.observe(item));
			});

			

			document.querySelectorAll('.dropdown_iteme').forEach(item => {
				const content = item.querySelector('.dropdown_content');

				item.addEventListener('click', () => {
					// Close other open dropdowns
					document.querySelectorAll('.dropdown_iteme').forEach(i => {
						if (i !== item) {
							i.classList.remove('active');
							i.querySelector('.dropdown_content').style.maxHeight = '0';
						}
					});

					// Toggle the clicked dropdown
					item.classList.toggle('active');
					if (item.classList.contains('active')) {
						content.style.maxHeight = content.scrollHeight + 'px';
					} else {
						content.style.maxHeight = '0';
					}
				});
			});
		}
	};
}(jQuery, Drupal, drupalSettings));

(function ($, Drupal) {
	Drupal.behaviors.customToggleContent = {
		attach: function (context, settings) {
			// Open the first info_content by default
			const $firstContent = $('.info_content', context).first().slideDown(); // Show the first content
			const $firstCloseButton = $('.close_button', context).first().addClass('active_close'); // Add active class to the first close button

			// Function to handle the toggle logic
			function toggleContent(content, closeButton) {
				// Close all other content sections and remove active class from their close buttons
				$('.info_content', context).not(content).slideUp(); // Close other contents
				$('.close_button', context).not(closeButton).removeClass('active_close'); // Remove active class

				// Toggle the clicked content
				const isVisible = content.is(':visible');
				content.slideToggle(); // Toggle the clicked content

				// Manage the active class for the close button
				if (!isVisible) {
					closeButton.addClass('active_close'); // Add class if content is now visible
				} else {
					closeButton.removeClass('active_close'); // Remove class if content is hidden
				}
			}

			// Click event for info_title
			$('.info_title', context).each(function () {
				if (!$(this).attr('data-processed')) {
					$(this).attr('data-processed', true);
					$(this).on('click', function () {
						const $content = $(this).next('.info_content');
						const $closeButton = $(this).find('.close_button');
						toggleContent($content, $closeButton); // Toggle the content
					});
				}
			});

			// Click event for close_button
			$('.close_button', context).each(function () {
				if (!$(this).attr('data-processed')) {
					$(this).attr('data-processed', true);
					$(this).on('click', function (e) {
						e.stopPropagation(); // Prevent parent event from triggering
						const $content = $(this).closest('.info_item').find('.info_content');
						toggleContent($content, $(this)); // Use the same function
					});
				}
			});
		}
	};
})(jQuery, Drupal);
