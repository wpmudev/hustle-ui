/*!
 * WPMU DEV Hustle UI
 * Copyright 2019 Incsub (https://incsub.com)
 * Licensed under GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.checkboxGdpr = function () {
    $('.hustle-ui .hustle-gdpr input').on('change', function (e) {
      var checkbox = $(e.target);
      var label = checkbox.parent();
      if (checkbox.is(':checked')) {
        label.removeClass('hustle-field-error');
      } else {
        label.addClass('hustle-field-error');
      }
    });
  };
})(jQuery);
(function ($) {
  // Enable strict mode
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.datepicker = function (el, fullDays, shortDays, minDays, fullMonths, shortMonths) {
    var input = $(el);
    $('.hustle-ui').each(function () {
      var container = $(this);
      var element = container.find(input);
      element.datepicker({
        monthNames: fullMonths,
        monthNamesShort: shortMonths,
        dayNames: fullDays,
        dayNamesMin: minDays,
        dayNamesShort: shortDays,
        minDate: '' !== element.data('min-date') ? element.data('min-date') : null,
        changeMonth: true === element.data('change-month'),
        changeYear: true === element.data('change-year'),
        yearRange: element.data('year-range'),
        dateFormat: '' !== element.data('format') ? element.data('format') : 'yy-mm-dd',
        isRTL: true === element.data('rtl-support') ? true : false,
        showButtonPanel: false,
        beforeShow: function beforeShow(input, inst) {
          // Remove all Hustle UI related classes
          inst.dpDiv.removeClass(function (index, css) {
            return (css.match(/\bhustle-\S+/g) || []).join(' ');
          });

          // Remove all Forminator UI related classes
          inst.dpDiv.removeClass(function (index, css) {
            return (css.match(/\bforminator-\S+/g) || []).join(' ');
          });
          inst.dpDiv.addClass('hustle-calendar');
          inst.dpDiv.addClass('hustle-module-' + container.data('id'));
          if ('undefined' !== typeof container.data('calendar-palette')) {
            inst.dpDiv.addClass('hustle-palette--' + container.data('calendar-palette'));
          }
        }
      });
    });
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.floatLoad = function (el) {
    var _float = $(el);
    var content = _float.find('.hustle-float-content');
    if (!_float.is('.hustle-float')) {
      return;
    }
    function abortLoad() {
      _float.hide();
    }
    function loadSelector() {
      var selector = hustleSettings.mobile_breakpoint < $(window).width() ? _float.data('desktop-selector') : _float.data('mobiles-selector');
      if (!selector.length) {
        abortLoad();
        return;
      }
      selector = $(selector);
      if (!selector.length) {
        abortLoad();
        return;
      }
      selector.css('position', 'relative');
      _float.appendTo(selector);
      show();
    }
    function reset() {
      _float.removeClass('hustle-show');
    }
    function show() {
      _float.css('display', '');
      _float.css('opacity', 1);

      // Module time
      setTimeout(function () {
        return _float.addClass('hustle-show');
      }, 0);

      // Layout time
      setTimeout(function () {
        return animation();
      }, 200);
    }
    function animation() {
      content.addClass('hustle-animate-in');
      $(document).trigger('hustle:module:displayed', content);
    }
    function init() {
      var offset = '';
      if (hustleSettings.mobile_breakpoint < $(window).width()) {
        if (_float.hasClass('hustle-displaying-in-large')) {
          return;
        }
        offset = _float.data('desktop-offset');
        _float.addClass('hustle-displaying-in-large');
        _float.removeClass('hustle-displaying-in-small');
      } else {
        if (_float.hasClass('hustle-displaying-in-small')) {
          return;
        }
        offset = _float.data('mobiles-offset');
        _float.addClass('hustle-displaying-in-small');
        _float.removeClass('hustle-displaying-in-large');
      }
      reset();
      if ('selector' === offset) {
        loadSelector();
      } else {
        show();
      }
    }
    init();
    return this;
  };
  HUI.inlineResizeSocialSharing = function (el) {
    var element = $(el);
    if (!element.is('.hustle-inline')) {
      return;
    }
    function init() {
      if (hustleSettings.mobile_breakpoint < $(window).width()) {
        element.addClass('hustle-displaying-in-large').removeClass('hustle-displaying-in-small');
      } else {
        element.removeClass('hustle-displaying-in-large').addClass('hustle-displaying-in-small');
      }
    }
    init();
    return this;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.escapeJS = function (string) {
    // Return the escaped text
    return string.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.inlineClose = function (el, autohideDelay) {
    var inline = $(el),
      content = inline.find('.hustle-inline-content');
    var preventAutohide = false;
    if (!inline.hasClass('hustle-inline')) {
      return;
    }
    function animationOut() {
      inline.slideUp(800);
      setTimeout(function () {
        inline.remove();
      }, 800);
    }
    function init() {
      if ('undefined' !== typeof autohideDelay && false !== autohideDelay) {
        setTimeout(function () {
          if (!preventAutohide) {
            inline.find('iframe').each(function (i, el) {
              return $(el).attr('src', $(el).attr('src'));
            });
            inline.trigger('hustle:module:hidden', this);
            animationOut();
          }
        }, autohideDelay);
      }
    }
    init();
    return this;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.inlineLoad = function (el) {
    var element = $(el);
    var content = element.find('.hustle-inline-content');
    var windowHeight = $(window).height();
    var elementPosition = element.offset().top;
    if (!element.is('.hustle-inline')) {
      return;
    }
    element.css('opacity', 1);
    function reset() {
      element.removeClass('hustle-show');
    }
    function animation() {
      var checkIntro = element.data('intro');
      var animateIn = 'no_animation';
      if ('' !== checkIntro) {
        animateIn = checkIntro;
      }
      if ('no_animation' !== animateIn) {
        content.addClass('hustle-animate');
      }
    }
    function animationIn() {
      var checkIntro = element.data('intro');
      var animateIn = 'no_animation';
      if ('' !== checkIntro) {
        animateIn = checkIntro;
      }
      if ('no_animation' !== animateIn) {
        content.addClass('hustle-animate-in--' + animateIn);
      }
    }
    function load(delay) {
      element.addClass('hustle-show');
      setTimeout(function () {
        animationIn();
        $(document).trigger('hustle:module:displayed', element);
      }, delay);
    }
    function init() {
      reset();
      animation();
      if (windowHeight > elementPosition || element.hasClass('hustle-preview')) {
        load(200);
      } else {
        if ('no_animation' === element.data('intro')) {
          load(100);
        } else {
          $(window).on('scroll', function () {
            var windowPosition = $(window).scrollTop() + windowHeight;
            if (windowPosition >= elementPosition) {
              load(100);
            }
          });
        }
      }
    }
    init();
    return this;
  };
})(jQuery);
(function ($) {
  // Enable strict mode
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.inlineResize = function (el) {
    var element = $(el);
    var elWidth = element.width();
    if (!element.is('.hustle-inline')) {
      return;
    }
    function init() {
      if (783 < Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) {
        if (element.hasClass('hustle-size--small')) {
          if (500 < elWidth) {
            element.removeClass('hustle-size--small');
          }
        } else {
          if (500 >= elWidth) {
            element.addClass('hustle-size--small');
          }
        }
      }
    }
    init();
    return this;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.inputFilled = function () {
    $('.hustle-ui .hustle-input').each(function (i, el) {
      var input = $(el);
      if ('' === input.val() && el.validity.valid) {
        input.parent().removeClass('hustle-field-filled');
      } else {
        input.parent().addClass('hustle-field-filled');
      }
    });
    $('.hustle-ui .hustle-input').on('keyup blur change', function () {
      var input = $(this);
      if ('' === input.val() && this.validity.valid) {
        input.parent().removeClass('hustle-field-filled');
      } else {
        input.parent().addClass('hustle-field-filled');
      }
    });
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.inputRequired = function () {
    $('.hustle-ui .hustle-input').blur(function () {
      var input = $(this);
      var label = input.parent();
      if (label.hasClass('hustle-field-required')) {
        if ('' === input.val()) {
          label.addClass('hustle-field-error');
        } else {
          label.removeClass('hustle-field-error');
        }
      }
    });
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.nonSharingSimulation = function (el) {
    var module = $(el);
    if (!module.is('.hustle-ui')) {
      return;
    }
    var optin = module.find('.hustle-optin'),
      button = module.find('.hustle-button-submit'),
      cta = module.find('.hustle-button-cta'),
      success = optin.find('.hustle-success'),
      layout = optin.find('.hustle-layout'),
      form = layout.find('.hustle-layout-form'),
      error = form.find('.hustle-error-message');
    function resetOnLoad() {
      form.find('.hustle-error-message').not(':first').remove();
      success.hide();
      error.hide();
    }
    function init() {
      resetOnLoad();

      // Prevent CTA from working.
      if (cta.length) {
        cta.on('click', function (e) {
          e.preventDefault();
        });
      }
      button.on('click', function (e) {
        var errors;
        e.preventDefault();
        e.stopPropagation();
        errors = HUI.optinValidate(module);
        if (errors.length) {
          HUI.optinError(error, errors);
        } else {
          HUI.optinSubmit(this, 1000);
          setTimeout(function () {
            HUI.optinSuccess(success, success.data('close-delay'));
          }, 1000);
        }
      });
    }
    init();
    return this;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.optinError = function (el, errors) {
    var message = $(el),
      $form = message.closest('form');
    if (!message.is('.hustle-error-message')) {
      return;
    }
    function init(errors) {
      var first = true;
      if (!Array.isArray(errors)) {
        var newErrors = [];
        $.each(errors, function (index, value) {
          newErrors.push(value);
        });
        errors = newErrors;
      }
      if ('undefined' !== typeof errors && errors.length) {
        $.each(errors, function (index, element) {
          if ('undefined' === typeof element || !element) {
            return true;
          }
          if (first) {
            message.append('<p>' + HUI.escapeJS(element) + '</p>');
            first = false;
          } else {
            $('<div class="hustle-error-message"><p>' + HUI.escapeJS(element) + '</p></div>').appendTo($form);
          }
        });
      }
      if ('undefined' === typeof errors || first) {
        message.append('<p>' + HUI.escapeJS(message.data('default-error')) + '</p>');
      }
      message.show();
    }
    init(errors);
    return this;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.optinSubmit = function (el) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var button = $(el);
    var module = button.closest('.hustle-ui');
    var optin = module.find('.hustle-optin');
    if (!button.is('.hustle-button-submit') || !optin[0] || !optin.length) {
      return;
    }
    function init() {
      button.addClass('hustle-button-onload').attr('aria-label', button.attr('data-loading-text'));
      if (false !== delay) {
        var delayValue = !isNaN(parseInt(delay)) ? delay : '1000';
        setTimeout(function () {
          button.removeClass('hustle-button-onload').removeAttr('aria-label');
        }, delayValue);
      }
    }
    init();
    return this;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.optinSuccess = function (el) {
    var success = $(el);
    var container = success.closest('.hustle-ui');
    var layout = container.find('.hustle-layout');
    var closeDelay = success.data('close-delay');
    if (!success.is('.hustle-success')) {
      return;
    }
    function successMessage() {
      var hideLayout = function hideLayout() {
          return layout.slideUp(800);
        },
        showSuccess = function showSuccess() {
          return success.slideDown();
        };
      hideLayout();
      setTimeout(function () {
        showSuccess();
      }, 800);
      if (closeDelay || 0 === closeDelay) {
        var closeModule = null;
        if (container.is('.hustle-slidein')) {
          closeModule = HUI.slideinClose;
        } else if (container.is('.hustle-popup')) {
          closeModule = HUI.popupClose;
        } else if (container.is('.hustle-inline')) {
          closeModule = HUI.inlineClose;
        }
        setTimeout(function () {
          return closeModule(container, 0);
        }, closeDelay);
      }
    }
    function init() {
      successMessage();
    }
    init();
    return this;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.optinValidate = function (el) {
    var module = $(el),
      errors = [],
      form = module.find('.hustle-layout-form');
    function resetOnClick() {
      var input = form.find('.hustle-field'),
        checkbox = form.find('.hustle-checkbox'),
        error = form.find('.hustle-error-message');
      form.find('.hustle-error-message').not(':first').remove();
      input.removeClass('hustle-field-error');
      checkbox.removeClass('hustle-field-error');
      error.html('').hide();
    }
    function checkGdpr() {
      var label = form.find('.hustle-gdpr'),
        input = label.find('input');
      if (!label.length || input.is(':checked')) {
        label.removeClass('hustle-field-error');
      } else {
        label.addClass('hustle-field-error');
        errors.push(input.data('required-error'));
      }
    }
    function checkRequired() {
      var input = form.find('.hustle-input');
      var label = input.parent();
      label.each(function () {
        var field = $(this);
        if (field.hasClass('hustle-field-required')) {
          if ('' === field.find('input').val()) {
            field.addClass('hustle-field-error');
            errors.push(field.find('.hustle-input').data('required-error'));
          } else {
            field.removeClass('hustle-field-error');
          }
        }
      });
    }
    function init() {
      resetOnClick();
      checkRequired();
      checkGdpr();
    }
    init();
    return errors;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.popupClose = function (el, autohideDelay) {
    var popup = $(el),
      close = popup.find('.hustle-button-close'),
      overlay = popup.find('.hustle-popup-mask'),
      content = popup.find('.hustle-popup-content'),
      neverSee = popup.find('.hustle-nsa-link');
    var preventAutohide = false;
    if (!close.length) {
      return;
    }
    if (!popup.hasClass('hustle-popup')) {
      return;
    }
    function removeIntro() {
      var checkIntro = popup.data('intro');
      var animateIn = checkIntro;
      content.removeClass('hustle-animate-in--' + animateIn);
    }
    function animationOut() {
      var checkOutro = popup.data('outro');
      var animateOut = checkOutro;
      content.addClass('hustle-animate-out--' + animateOut);
    }
    function escapeKeyClose(e) {
      if (27 === e.keyCode) {
        preventAutohide = true;
        popup.trigger('hustle:module:esc_key_pressed', this);
        closePopup();
      }
    }
    function closePopup() {
      var checkOutro = popup.data('outro');
      var delay = 1000;
      var animateOut = 'no_animation';
      if ('' !== checkOutro) {
        animateOut = checkOutro;
      }
      if ('no_animation' === animateOut) {
        delay = 0;
      }
      if ('fadeOut' === animateOut) {
        delay = 305;
      }
      if ('newspaperOut' === animateOut) {
        delay = 505;
      }
      if ('bounceOut' === animateOut) {
        delay = 755;
      }
      popup.removeClass('hustle-animation-stopped');
      popup.find('iframe').each(function (i, el) {
        return $(el).attr('src', $(el).attr('src'));
      });
      animationOut();
      removeIntro();
      setTimeout(function () {
        popup.removeClass('hustle-show');
        content.removeClass('hustle-animate-out--' + animateOut);
        if (!$('.hustle-show.hustle-scroll-forbidden').length) {
          $('html').removeClass('hustle-no-scroll');
        }
        HUI.trapFocus();
      }, delay);
    }
    function init() {
      $(document).off('keydown.hustle.escKey', escapeKeyClose);
      $(document).on('keydown.hustle.escKey', escapeKeyClose);
      popup.on('click', function () {
        preventAutohide = true;
      });
      if ('undefined' !== typeof autohideDelay && false !== autohideDelay) {
        setTimeout(function () {
          if (!preventAutohide) {
            popup.trigger('hustle:module:hidden', this);
            closePopup();
          }
        }, autohideDelay);
      }
      close.on('click', function (e) {
        popup.trigger('hustle:module:closed', this);
        closePopup();
        e.preventDefault();
        e.stopPropagation();
      });
      neverSee.on('click', function (e) {
        e.preventDefault();
        popup.trigger('hustle:module:clicked_never_see', this);
        closePopup();
      });
      if (1 === popup.data('overlay-close')) {
        overlay.on('click', function (e) {
          popup.trigger('hustle:module:click_outside', this);
          closePopup();
          e.preventDefault();
          e.stopPropagation();
        });
      }
    }
    init();
    return this;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.popupLoad = function (el, autohideDelay) {
    var popup = $(el);
    var content = popup.find('.hustle-popup-content');
    var popupId = $('#' + popup.attr('id'));
    var popupWrapper = popupId.find('.hustle-layout');
    if (!popup.is('.hustle-popup')) {
      return;
    }
    popup.css('opacity', 1);
    function animation() {
      content.addClass('hustle-animate');
    }
    function animationIn() {
      var checkIntro = popup.data('intro');
      var animateIn = checkIntro;
      var delay = 1000;
      if ('no_animation' === animateIn) {
        delay = 0;
      }
      if ('bounceIn' === animateIn || 'bounceInUp' === animateIn || 'bounceInDown' === animateIn || 'bounceInLeft' === animateIn || 'bounceInRight' === animateIn) {
        delay = 755;
      }
      if ('fadeIn' === animateIn) {
        delay = 305;
      }
      if ('newspaperIn' === animateIn) {
        delay = 505;
      }
      content.addClass('hustle-animate-in--' + animateIn);
      setTimeout(function () {
        popup.addClass('hustle-animation-stopped');
      }, delay + 50);
    }
    function resizeObjectsInContent() {
      var containerWidth = popup.find('.hustle-group-content').outerWidth();
      popup.find('iframe, object, video').each(function () {
        var iframe = $(this);
        var width = iframe.attr('width');
        var height = iframe.attr('height');
        var ratio;
        if (_typeof(width) !== undefined && _typeof(height) !== undefined && 0 < width) {
          ratio = containerWidth / width;
          iframe.css({
            'width': containerWidth,
            'height': height * ratio
          });
        }
      });
    }
    function init() {
      popup.removeClass('hustle-show');
      animation();

      // Module time.
      popup.addClass('hustle-show');

      // Layout time.
      setTimeout(function () {
        animationIn();
        $(document).trigger('hustle:module:displayed', popup);
        HUI.trapFocus();
      }, 200);

      // resize iframes, object and videos
      resizeObjectsInContent();
      HUI.popupClose(el, autohideDelay);
    }
    init();
    return this;
  };
})(jQuery);
(function () {
  // Enable strict mode
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.maybeRenderRecaptcha = function ($module, self) {
    var _$module$data = $module.data(),
      renderId = _$module$data.renderId,
      moduleId = _$module$data.id,
      $recaptchaContainer = $module.find('#hustle-modal-recaptcha-' + moduleId + '-' + renderId);

    // If there's no recaptcha field, nothing to do here.
    if (!$recaptchaContainer.length) {
      return;
    }

    // The data for rendering the recaptcha is in the container.
    var _$recaptchaContainer$ = $recaptchaContainer.data(),
      sitekey = _$recaptchaContainer$.sitekey,
      version = _$recaptchaContainer$.version,
      theme = _$recaptchaContainer$.theme,
      size = _$recaptchaContainer$.size,
      badge = _$recaptchaContainer$.badge;

    // Use a wrapper to be removed and added again on re-render. Required for preview in admin's settings page.
    var $wrapper = $recaptchaContainer.find('.hustle-recaptcha-badge');
    if ($wrapper.length) {
      var captchaId = $recaptchaContainer.attr('recaptcha-id');
      $wrapper.remove();
      grecaptcha.reset(captchaId);
    }
    $recaptchaContainer.append('<div class="hustle-recaptcha-badge"></div>');
    $wrapper = $recaptchaContainer.find('.hustle-recaptcha-badge');
    var data = {
      sitekey: sitekey,
      theme: theme,
      size: size,
      badge: badge,
      'expired-callback': function expiredCallback() {
        return grecaptcha.reset($recaptchaContainer.attr('recaptcha-id'));
      }
    };
    if ('v2_checkbox' === version) {
      $module.find('.hustle-modal-body button').prop('disabled', true);
      data.callback = function (token) {
        $module.find('input[name="recaptcha-response"]').val(token);
        $module.find('.hustle-layout-body button').prop('disabled', false);
      };
    } else {
      data.callback = function (token) {
        $module.find('input[name="recaptcha-response"]').val(token);

        // Callback for when recaptcha has been executed. Triggers the form submission on frontend.
        if (self) {
          self.doSubmit($recaptchaContainer.closest('.hustle-layout-form'));
        }
      };
    }
    data['error-callback'] = function () {
      var form = $recaptchaContainer.closest('.hustle-layout-form'),
        errors = ['Coud not get recaptcha response. Please, contact the site administrator.'];
      HUI.optinError(form.find('.hustle-error-message'), errors);
      form.find('.hustle-button-submit').prop('disabled', true);
      $wrapper.addClass('hustle-recaptcha-preview-has-error');
    };
    if ('undefined' !== typeof grecaptcha) {
      // Do render the recaptcha. Keep the recaptcha's ID in the container for later use.
      grecaptcha.ready(function () {
        var recaptchaId = grecaptcha.render($wrapper[0], data);
        $recaptchaContainer.attr('recaptcha-id', recaptchaId);
      });
    }
  };
})();

/*!
 * Select2 4.1.0-rc.0
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 *
 * Modified logic/function,etc besides formatting should be marked with //HUI-SELECT2
 * For easy debugging process or update upstream of select
 */
;
(function (factory) {
  // HUI-SELECT2 disable AMD and module exports
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 = function () {
    // Restore the Select2 AMD loader so it can be used
    // Needed mostly in the language files, where the loader is not inserted
    if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
      var S2 = jQuery.fn.select2.amd;
    }
    var S2;
    (function () {
      if (!S2 || !S2.requirejs) {
        if (!S2) {
          S2 = {};
        } else {
          require = S2;
        }
        /**
         * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
         * Released under MIT license, http://github.com/requirejs/almond/LICENSE
         */
        //Going sloppy to avoid 'use strict' string cost, but strict practices should
        //be followed.
        /*global setTimeout: false */

        var requirejs, require, define;
        (function (undef) {
          var main,
            _req,
            makeMap,
            handlers,
            defined = {},
            waiting = {},
            config = {},
            defining = {},
            hasOwn = Object.prototype.hasOwnProperty,
            aps = [].slice,
            jsSuffixRegExp = /\.js$/;
          function hasProp(obj, prop) {
            return hasOwn.call(obj, prop);
          }

          /**
           * Given a relative module name, like ./something, normalize it to
           * a real name that can be mapped to a path.
           * @param {String} name the relative name
           * @param {String} baseName a real name that the name arg is relative
           * to.
           * @returns {String} normalized name
           */
          function normalize(name, baseName) {
            var nameParts,
              nameSegment,
              mapValue,
              foundMap,
              lastIndex,
              foundI,
              foundStarMap,
              starI,
              i,
              j,
              part,
              normalizedBaseParts,
              baseParts = baseName && baseName.split("/"),
              map = config.map,
              starMap = map && map['*'] || {};

            //Adjust any relative paths.
            if (name) {
              name = name.split('/');
              lastIndex = name.length - 1;

              // If wanting node ID compatibility, strip .js from end
              // of IDs. Have to do this here, and not in nameToUrl
              // because node allows either .js or non .js to map
              // to same file.
              if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
              }

              // Starts with a '.' so need the baseName
              if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
              }

              //start trimDots
              for (i = 0; i < name.length; i++) {
                part = name[i];
                if (part === '.') {
                  name.splice(i, 1);
                  i -= 1;
                } else if (part === '..') {
                  // If at the start, or previous value is still ..,
                  // keep them so that when converted to a path it may
                  // still work when converted to a path, even though
                  // as an ID it is less than ideal. In larger point
                  // releases, may be better to just kick out an error.
                  if (i === 0 || i === 1 && name[2] === '..' || name[i - 1] === '..') {
                    continue;
                  } else if (i > 0) {
                    name.splice(i - 1, 2);
                    i -= 2;
                  }
                }
              }
              //end trimDots

              name = name.join('/');
            }

            //Apply map config if available.
            if ((baseParts || starMap) && map) {
              nameParts = name.split('/');
              for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");
                if (baseParts) {
                  //Find the longest baseName segment match in the config.
                  //So, do joins on the biggest to smallest lengths of baseParts.
                  for (j = baseParts.length; j > 0; j -= 1) {
                    mapValue = map[baseParts.slice(0, j).join('/')];

                    //baseName segment has  config, find if it has one for
                    //this name.
                    if (mapValue) {
                      mapValue = mapValue[nameSegment];
                      if (mapValue) {
                        //Match, update name to the new value.
                        foundMap = mapValue;
                        foundI = i;
                        break;
                      }
                    }
                  }
                }
                if (foundMap) {
                  break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                  foundStarMap = starMap[nameSegment];
                  starI = i;
                }
              }
              if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
              }
              if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
              }
            }
            return name;
          }
          function makeRequire(relName, forceSync) {
            return function () {
              //A version of a require function that passes a moduleName
              //value for items that may need to
              //look up paths relative to the moduleName
              var args = aps.call(arguments, 0);

              //If first arg is not require('string'), and there is only
              //one arg, it is the array form without a callback. Insert
              //a null so that the following concat is correct.
              if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
              }
              return _req.apply(undef, args.concat([relName, forceSync]));
            };
          }
          function makeNormalize(relName) {
            return function (name) {
              return normalize(name, relName);
            };
          }
          function makeLoad(depName) {
            return function (value) {
              defined[depName] = value;
            };
          }
          function callDep(name) {
            if (hasProp(waiting, name)) {
              var args = waiting[name];
              delete waiting[name];
              defining[name] = true;
              main.apply(undef, args);
            }
            if (!hasProp(defined, name) && !hasProp(defining, name)) {
              throw new Error('No ' + name);
            }
            return defined[name];
          }

          //Turns a plugin!resource to [plugin, resource]
          //with the plugin being undefined if the name
          //did not have a plugin prefix.
          function splitPrefix(name) {
            var prefix,
              index = name ? name.indexOf('!') : -1;
            if (index > -1) {
              prefix = name.substring(0, index);
              name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
          }

          //Creates a parts array for a relName where first part is plugin ID,
          //second part is resource ID. Assumes relName has already been normalized.
          function makeRelParts(relName) {
            return relName ? splitPrefix(relName) : [];
          }

          /**
           * Makes a name map, normalizing the name, and using a plugin
           * for normalization if necessary. Grabs a ref to plugin
           * too, as an optimization.
           */
          makeMap = function makeMap(name, relParts) {
            var plugin,
              parts = splitPrefix(name),
              prefix = parts[0],
              relResourceName = relParts[1];
            name = parts[1];
            if (prefix) {
              prefix = normalize(prefix, relResourceName);
              plugin = callDep(prefix);
            }

            //Normalize according
            if (prefix) {
              if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relResourceName));
              } else {
                name = normalize(name, relResourceName);
              }
            } else {
              name = normalize(name, relResourceName);
              parts = splitPrefix(name);
              prefix = parts[0];
              name = parts[1];
              if (prefix) {
                plugin = callDep(prefix);
              }
            }

            //Using ridiculous property names for space reasons
            return {
              f: prefix ? prefix + '!' + name : name,
              //fullName
              n: name,
              pr: prefix,
              p: plugin
            };
          };
          function makeConfig(name) {
            return function () {
              return config && config.config && config.config[name] || {};
            };
          }
          handlers = {
            require: function require(name) {
              return makeRequire(name);
            },
            exports: function exports(name) {
              var e = defined[name];
              if (typeof e !== 'undefined') {
                return e;
              } else {
                return defined[name] = {};
              }
            },
            module: function module(name) {
              return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
              };
            }
          };
          main = function main(name, deps, callback, relName) {
            var cjsModule,
              depName,
              ret,
              map,
              i,
              relParts,
              args = [],
              callbackType = _typeof(callback),
              usingExports;

            //Use name if no relName
            relName = relName || name;
            relParts = makeRelParts(relName);

            //Call the callback to define the module, if necessary.
            if (callbackType === 'undefined' || callbackType === 'function') {
              //Pull out the defined dependencies and pass the ordered
              //values to the callback.
              //Default to [require, exports, module] if no deps
              deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
              for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relParts);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                  args[i] = handlers.require(name);
                } else if (depName === "exports") {
                  //CommonJS module spec 1.1
                  args[i] = handlers.exports(name);
                  usingExports = true;
                } else if (depName === "module") {
                  //CommonJS module spec 1.1
                  cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) || hasProp(waiting, depName) || hasProp(defining, depName)) {
                  args[i] = callDep(depName);
                } else if (map.p) {
                  map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                  args[i] = defined[depName];
                } else {
                  throw new Error(name + ' missing ' + depName);
                }
              }
              ret = callback ? callback.apply(defined[name], args) : undefined;
              if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef && cjsModule.exports !== defined[name]) {
                  defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                  //Use the return value from the function.
                  defined[name] = ret;
                }
              }
            } else if (name) {
              //May just be an object definition for the module. Only
              //worry about defining if have a module name.
              defined[name] = callback;
            }
          };
          requirejs = require = _req = function req(deps, callback, relName, forceSync, alt) {
            if (typeof deps === "string") {
              if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
              }
              //Just return the module wanted. In this scenario, the
              //deps arg is the module name, and second arg (if passed)
              //is just the relName.
              //Normalize module name, if it contains . or ..
              return callDep(makeMap(deps, makeRelParts(callback)).f);
            } else if (!deps.splice) {
              //deps is a config object, not an array.
              config = deps;
              if (config.deps) {
                _req(config.deps, config.callback);
              }
              if (!callback) {
                return;
              }
              if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
              } else {
                deps = undef;
              }
            }

            //Support require(['a'])
            callback = callback || function () {};

            //If relName is a function, it is an errback handler,
            //so remove it.
            if (typeof relName === 'function') {
              relName = forceSync;
              forceSync = alt;
            }

            //Simulate async callback;
            if (forceSync) {
              main(undef, deps, callback, relName);
            } else {
              //Using a non-zero value because of concern for what old browsers
              //do, and latest browsers "upgrade" to 4 if lower value is used:
              //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
              //If want a value immediately, use require('id') instead -- something
              //that works in almond on the global level, but not guaranteed and
              //unlikely to work in other AMD implementations.
              setTimeout(function () {
                main(undef, deps, callback, relName);
              }, 4);
            }
            return _req;
          };

          /**
           * Just drops the config on the floor, but returns req in case
           * the config return value is used.
           */
          _req.config = function (cfg) {
            return _req(cfg);
          };

          /**
           * Expose module registry for debugging and tooling
           */
          requirejs._defined = defined;
          define = function define(name, deps, callback) {
            if (typeof name !== 'string') {
              throw new Error('See almond README: incorrect module build, no module name');
            }

            //This module may not have dependencies
            if (!deps.splice) {
              //deps is not an array, so probably means
              //an object literal or factory function for
              //the value. Adjust args.
              callback = deps;
              deps = [];
            }
            if (!hasProp(defined, name) && !hasProp(waiting, name)) {
              waiting[name] = [name, deps, callback];
            }
          };
          define.amd = {
            jQuery: true
          };
        })();
        S2.requirejs = requirejs;
        S2.require = require;
        S2.define = define;
      }
    })();
    S2.define("almond", function () {});

    /* global jQuery:false, $:false */
    S2.define('jquery', [], function () {
      var _$ = jQuery || $;
      if (_$ == null && console && console.error) {
        console.error('Select2: An instance of jQuery or a jQuery-compatible library was not ' + 'found. Make sure that you are including jQuery before Select2 on your ' + 'web page.');
      }
      return _$;
    });
    S2.define('select2/utils', ['jquery'], function ($) {
      var Utils = {};
      Utils.Extend = function (ChildClass, SuperClass) {
        var __hasProp = {}.hasOwnProperty;
        function BaseConstructor() {
          this.constructor = ChildClass;
        }
        for (var key in SuperClass) {
          if (__hasProp.call(SuperClass, key)) {
            ChildClass[key] = SuperClass[key];
          }
        }
        BaseConstructor.prototype = SuperClass.prototype;
        ChildClass.prototype = new BaseConstructor();
        ChildClass.__super__ = SuperClass.prototype;
        return ChildClass;
      };
      function getMethods(theClass) {
        var proto = theClass.prototype;
        var methods = [];
        for (var methodName in proto) {
          var m = proto[methodName];
          if (typeof m !== 'function') {
            continue;
          }
          if (methodName === 'constructor') {
            continue;
          }
          methods.push(methodName);
        }
        return methods;
      }
      Utils.Decorate = function (SuperClass, DecoratorClass) {
        var decoratedMethods = getMethods(DecoratorClass);
        var superMethods = getMethods(SuperClass);
        function DecoratedClass() {
          var unshift = Array.prototype.unshift;
          var argCount = DecoratorClass.prototype.constructor.length;
          var calledConstructor = SuperClass.prototype.constructor;
          if (argCount > 0) {
            unshift.call(arguments, SuperClass.prototype.constructor);
            calledConstructor = DecoratorClass.prototype.constructor;
          }
          calledConstructor.apply(this, arguments);
        }
        DecoratorClass.displayName = SuperClass.displayName;
        function ctr() {
          this.constructor = DecoratedClass;
        }
        DecoratedClass.prototype = new ctr();
        for (var m = 0; m < superMethods.length; m++) {
          var superMethod = superMethods[m];
          DecoratedClass.prototype[superMethod] = SuperClass.prototype[superMethod];
        }
        var calledMethod = function calledMethod(methodName) {
          // Stub out the original method if it's not decorating an actual method
          var originalMethod = function originalMethod() {};
          if (methodName in DecoratedClass.prototype) {
            originalMethod = DecoratedClass.prototype[methodName];
          }
          var decoratedMethod = DecoratorClass.prototype[methodName];
          return function () {
            var unshift = Array.prototype.unshift;
            unshift.call(arguments, originalMethod);
            return decoratedMethod.apply(this, arguments);
          };
        };
        for (var d = 0; d < decoratedMethods.length; d++) {
          var decoratedMethod = decoratedMethods[d];
          DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
        }
        return DecoratedClass;
      };
      var Observable = function Observable() {
        this.listeners = {};
      };
      Observable.prototype.on = function (event, callback) {
        this.listeners = this.listeners || {};
        if (event in this.listeners) {
          this.listeners[event].push(callback);
        } else {
          this.listeners[event] = [callback];
        }
      };
      Observable.prototype.trigger = function (event) {
        var slice = Array.prototype.slice;
        var params = slice.call(arguments, 1);
        this.listeners = this.listeners || {};

        // Params should always come in as an array
        if (params == null) {
          params = [];
        }

        // If there are no arguments to the event, use a temporary object
        if (params.length === 0) {
          params.push({});
        }

        // Set the `_type` of the first object to the event
        params[0]._type = event;
        if (event in this.listeners) {
          this.invoke(this.listeners[event], slice.call(arguments, 1));
        }
        if ('*' in this.listeners) {
          this.invoke(this.listeners['*'], arguments);
        }
      };
      Observable.prototype.invoke = function (listeners, params) {
        for (var i = 0, len = listeners.length; i < len; i++) {
          listeners[i].apply(this, params);
        }
      };
      Utils.Observable = Observable;
      Utils.generateChars = function (length) {
        var chars = '';
        for (var i = 0; i < length; i++) {
          var randomChar = Math.floor(Math.random() * 36);
          chars += randomChar.toString(36);
        }
        return chars;
      };
      Utils.bind = function (func, context) {
        return function () {
          func.apply(context, arguments);
        };
      };
      Utils._convertData = function (data) {
        for (var originalKey in data) {
          var keys = originalKey.split('-');
          var dataLevel = data;
          if (keys.length === 1) {
            continue;
          }
          for (var k = 0; k < keys.length; k++) {
            var key = keys[k];

            // Lowercase the first letter
            // By default, dash-separated becomes camelCase
            key = key.substring(0, 1).toLowerCase() + key.substring(1);
            if (!(key in dataLevel)) {
              dataLevel[key] = {};
            }
            if (k == keys.length - 1) {
              dataLevel[key] = data[originalKey];
            }
            dataLevel = dataLevel[key];
          }
          delete data[originalKey];
        }
        return data;
      };
      Utils.hasScroll = function (index, el) {
        // Adapted from the function created by @ShadowScripter
        // and adapted by @BillBarry on the Stack Exchange Code Review website.
        // The original code can be found at
        // http://codereview.stackexchange.com/q/13338
        // and was designed to be used with the Sizzle selector engine.

        var $el = $(el);
        var overflowX = el.style.overflowX;
        var overflowY = el.style.overflowY;

        //Check both x and y declarations
        if (overflowX === overflowY && (overflowY === 'hidden' || overflowY === 'visible')) {
          return false;
        }
        if (overflowX === 'scroll' || overflowY === 'scroll') {
          return true;
        }
        return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;
      };
      Utils.escapeMarkup = function (markup) {
        var replaceMap = {
          '\\': '&#92;',
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          '\'': '&#39;',
          '/': '&#47;'
        };

        // Do not try to escape the markup if it's not a string
        if (typeof markup !== 'string') {
          return markup;
        }
        return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
          return replaceMap[match];
        });
      };

      // Cache objects in Utils.__cache instead of $.data (see #4346)
      Utils.__cache = {};
      var id = 0;
      Utils.GetUniqueElementId = function (element) {
        // Get a unique element Id. If element has no id,
        // creates a new unique number, stores it in the id
        // attribute and returns the new id with a prefix.
        // If an id already exists, it simply returns it with a prefix.

        var select2Id = element.getAttribute('data-select2-id');
        if (select2Id != null) {
          return select2Id;
        }

        // If element has id, use it.
        if (element.id) {
          select2Id = 'select2-data-' + element.id;
        } else {
          select2Id = 'select2-data-' + (++id).toString() + '-' + Utils.generateChars(4);
        }
        element.setAttribute('data-select2-id', select2Id);
        return select2Id;
      };
      Utils.StoreData = function (element, name, value) {
        // Stores an item in the cache for a specified element.
        // name is the cache key.
        var id = Utils.GetUniqueElementId(element);
        if (!Utils.__cache[id]) {
          Utils.__cache[id] = {};
        }
        Utils.__cache[id][name] = value;
      };
      Utils.GetData = function (element, name) {
        // Retrieves a value from the cache by its key (name)
        // name is optional. If no name specified, return
        // all cache items for the specified element.
        // and for a specified element.
        var id = Utils.GetUniqueElementId(element);
        if (name) {
          if (Utils.__cache[id]) {
            if (Utils.__cache[id][name] != null) {
              return Utils.__cache[id][name];
            }
            return $(element).data(name); // Fallback to HTML5 data attribs.
          }

          return $(element).data(name); // Fallback to HTML5 data attribs.
        } else {
          return Utils.__cache[id];
        }
      };
      Utils.RemoveData = function (element) {
        // Removes all cached items for a specified element.
        var id = Utils.GetUniqueElementId(element);
        if (Utils.__cache[id] != null) {
          delete Utils.__cache[id];
        }
        element.removeAttribute('data-select2-id');
      };
      Utils.copyNonInternalCssClasses = function (dest, src) {
        var classes;
        var destinationClasses = dest.getAttribute('class').trim().split(/\s+/);
        destinationClasses = destinationClasses.filter(function (clazz) {
          // Save all Select2 classes
          return clazz.indexOf('select2-') === 0;
        });
        var sourceClasses = src.getAttribute('class').trim().split(/\s+/);
        sourceClasses = sourceClasses.filter(function (clazz) {
          // Only copy non-Select2 classes
          return clazz.indexOf('select2-') !== 0;
        });
        var replacements = destinationClasses.concat(sourceClasses);
        dest.setAttribute('class', replacements.join(' '));
      };
      return Utils;
    });
    S2.define('select2/results', ['jquery', './utils'], function ($, Utils) {
      function Results($element, options, dataAdapter) {
        this.$element = $element;
        this.data = dataAdapter;
        this.options = options;
        Results.__super__.constructor.call(this);
      }
      Utils.Extend(Results, Utils.Observable);
      Results.prototype.render = function () {
        var $results = $('<ul class="select2-results__options" role="listbox"></ul>');
        if (this.options.get('multiple')) {
          $results.attr('aria-multiselectable', 'true');
        }
        this.$results = $results;
        return $results;
      };
      Results.prototype.clear = function () {
        this.$results.empty();
      };
      Results.prototype.displayMessage = function (params) {
        var escapeMarkup = this.options.get('escapeMarkup');
        this.clear();
        this.hideLoading();
        var $message = $('<li role="alert" aria-live="assertive"' + ' class="select2-results__option"></li>');
        var message = this.options.get('translations').get(params.message);
        $message.append(escapeMarkup(message(params.args)));
        $message[0].className += ' select2-results__message';
        this.$results.append($message);
      };
      Results.prototype.hideMessages = function () {
        this.$results.find('.select2-results__message').remove();
      };
      Results.prototype.append = function (data) {
        this.hideLoading();
        var $options = [];
        if (data.results == null || data.results.length === 0) {
          if (this.$results.children().length === 0) {
            this.trigger('results:message', {
              message: 'noResults'
            });
          }
          return;
        }
        data.results = this.sort(data.results);
        for (var d = 0; d < data.results.length; d++) {
          var item = data.results[d];
          var $option = this.option(item);
          $options.push($option);
        }
        this.$results.append($options);
      };
      Results.prototype.position = function ($results, $dropdown) {
        var $resultsContainer = $dropdown.find('.select2-results');
        $resultsContainer.append($results);
      };
      Results.prototype.sort = function (data) {
        var sorter = this.options.get('sorter');
        return sorter(data);
      };
      Results.prototype.highlightFirstItem = function () {
        var $options = this.$results.find('.select2-results__option--selectable');
        var $selected = $options.filter('.select2-results__option--selected');

        // Check if there are any selected options
        if ($selected.length > 0) {
          // If there are selected options, highlight the first
          $selected.first().trigger('mouseenter');
        } else {
          // If there are no selected options, highlight the first option
          // in the dropdown
          $options.first().trigger('mouseenter');
        }
        this.ensureHighlightVisible();
      };
      Results.prototype.setClasses = function () {
        var self = this;
        this.data.current(function (selected) {
          var selectedIds = selected.map(function (s) {
            return s.id.toString();
          });
          var $options = self.$results.find('.select2-results__option--selectable');
          $options.each(function () {
            var $option = $(this);
            var item = Utils.GetData(this, 'data');

            // id needs to be converted to a string when comparing
            var id = '' + item.id;
            if (item.element != null && item.element.selected || item.element == null && selectedIds.indexOf(id) > -1) {
              this.classList.add('select2-results__option--selected');
              $option.attr('aria-selected', 'true');
            } else {
              this.classList.remove('select2-results__option--selected');
              $option.attr('aria-selected', 'false');
            }
          });
        });
      };
      Results.prototype.showLoading = function (params) {
        this.hideLoading();
        var loadingMore = this.options.get('translations').get('searching');
        var loading = {
          disabled: true,
          loading: true,
          text: loadingMore(params)
        };
        var $loading = this.option(loading);
        $loading.className += ' loading-results';
        this.$results.prepend($loading);
      };
      Results.prototype.hideLoading = function () {
        this.$results.find('.loading-results').remove();
      };
      Results.prototype.option = function (data) {
        var option = document.createElement('li');
        option.classList.add('select2-results__option');
        option.classList.add('select2-results__option--selectable');
        var attrs = {
          'role': 'option'
        };
        var matches = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector;
        if (data.element != null && matches.call(data.element, ':disabled') || data.element == null && data.disabled) {
          attrs['aria-disabled'] = 'true';
          option.classList.remove('select2-results__option--selectable');
          option.classList.add('select2-results__option--disabled');
        }
        if (data.id == null) {
          option.classList.remove('select2-results__option--selectable');
        }
        if (data._resultId != null) {
          option.id = data._resultId;
        }
        if (data.title) {
          option.title = data.title;
        }
        if (data.children) {
          attrs.role = 'group';
          attrs['aria-label'] = data.text;
          option.classList.remove('select2-results__option--selectable');
          option.classList.add('select2-results__option--group');
        }
        for (var attr in attrs) {
          var val = attrs[attr];
          option.setAttribute(attr, val);
        }
        if (data.children) {
          var $option = $(option);
          var label = document.createElement('strong');
          label.className = 'select2-results__group';
          this.template(data, label);
          var $children = [];
          for (var c = 0; c < data.children.length; c++) {
            var child = data.children[c];
            var $child = this.option(child);
            $children.push($child);
          }
          var $childrenContainer = $('<ul></ul>', {
            'class': 'select2-results__options select2-results__options--nested',
            'role': 'none'
          });
          $childrenContainer.append($children);
          $option.append(label);
          $option.append($childrenContainer);
        } else {
          this.template(data, option);
        }
        Utils.StoreData(option, 'data', data);
        return option;
      };
      Results.prototype.bind = function (container, $container) {
        var self = this;
        var id = container.id + '-results';
        this.$results.attr('id', id);
        container.on('results:all', function (params) {
          self.clear();
          self.append(params.data);
          if (container.isOpen()) {
            self.setClasses();
            self.highlightFirstItem();
          }
        });
        container.on('results:append', function (params) {
          self.append(params.data);
          if (container.isOpen()) {
            self.setClasses();
          }
        });
        container.on('query', function (params) {
          self.hideMessages();
          self.showLoading(params);
        });
        container.on('select', function () {
          if (!container.isOpen()) {
            return;
          }
          self.setClasses();
          if (self.options.get('scrollAfterSelect')) {
            self.highlightFirstItem();
          }
        });
        container.on('unselect', function () {
          if (!container.isOpen()) {
            return;
          }
          self.setClasses();
          if (self.options.get('scrollAfterSelect')) {
            self.highlightFirstItem();
          }
        });
        container.on('open', function () {
          // When the dropdown is open, aria-expended="true"
          self.$results.attr('aria-expanded', 'true');
          self.$results.attr('aria-hidden', 'false');
          self.setClasses();
          self.ensureHighlightVisible();
        });
        container.on('close', function () {
          // When the dropdown is closed, aria-expended="false"
          self.$results.attr('aria-expanded', 'false');
          self.$results.attr('aria-hidden', 'true');
          self.$results.removeAttr('aria-activedescendant');
        });
        container.on('results:toggle', function () {
          var $highlighted = self.getHighlightedResults();
          if ($highlighted.length === 0) {
            return;
          }
          $highlighted.trigger('mouseup');
        });
        container.on('results:select', function () {
          var $highlighted = self.getHighlightedResults();
          if ($highlighted.length === 0) {
            return;
          }
          var data = Utils.GetData($highlighted[0], 'data');
          if ($highlighted.hasClass('select2-results__option--selected')) {
            self.trigger('close', {});
          } else {
            self.trigger('select', {
              data: data
            });
          }
        });
        container.on('results:previous', function () {
          var $highlighted = self.getHighlightedResults();
          var $options = self.$results.find('.select2-results__option--selectable');
          var currentIndex = $options.index($highlighted);

          // If we are already at the top, don't move further
          // If no options, currentIndex will be -1
          if (currentIndex <= 0) {
            return;
          }
          var nextIndex = currentIndex - 1;

          // If none are highlighted, highlight the first
          if ($highlighted.length === 0) {
            nextIndex = 0;
          }
          var $next = $options.eq(nextIndex);
          $next.trigger('mouseenter');
          var currentOffset = self.$results.offset().top;
          var nextTop = $next.offset().top;
          var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);
          if (nextIndex === 0) {
            self.$results.scrollTop(0);
          } else if (nextTop - currentOffset < 0) {
            self.$results.scrollTop(nextOffset);
          }
        });
        container.on('results:next', function () {
          var $highlighted = self.getHighlightedResults();
          var $options = self.$results.find('.select2-results__option--selectable');
          var currentIndex = $options.index($highlighted);
          var nextIndex = currentIndex + 1;

          // If we are at the last option, stay there
          if (nextIndex >= $options.length) {
            return;
          }
          var $next = $options.eq(nextIndex);
          $next.trigger('mouseenter');
          var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
          var nextBottom = $next.offset().top + $next.outerHeight(false);
          var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;
          if (nextIndex === 0) {
            self.$results.scrollTop(0);
          } else if (nextBottom > currentOffset) {
            self.$results.scrollTop(nextOffset);
          }
        });
        container.on('results:focus', function (params) {
          params.element[0].classList.add('select2-results__option--highlighted');
          params.element[0].setAttribute('aria-selected', 'true');
        });
        container.on('results:message', function (params) {
          self.displayMessage(params);
        });
        if ($.fn.mousewheel) {
          this.$results.on('mousewheel', function (e) {
            var top = self.$results.scrollTop();
            var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;
            var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
            var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();
            if (isAtTop) {
              self.$results.scrollTop(0);
              e.preventDefault();
              e.stopPropagation();
            } else if (isAtBottom) {
              self.$results.scrollTop(self.$results.get(0).scrollHeight - self.$results.height());
              e.preventDefault();
              e.stopPropagation();
            }
          });
        }
        this.$results.on('mouseup', '.select2-results__option--selectable', function (evt) {
          var $this = $(this);
          var data = Utils.GetData(this, 'data');
          if ($this.hasClass('select2-results__option--selected')) {
            if (self.options.get('multiple')) {
              self.trigger('unselect', {
                originalEvent: evt,
                data: data
              });
            } else {
              self.trigger('close', {});
            }
            return;
          }
          self.trigger('select', {
            originalEvent: evt,
            data: data
          });
        });
        this.$results.on('mouseenter', '.select2-results__option--selectable', function (evt) {
          var data = Utils.GetData(this, 'data');
          self.getHighlightedResults().removeClass('select2-results__option--highlighted').attr('aria-selected', 'false');
          self.trigger('results:focus', {
            data: data,
            element: $(this)
          });
        });
      };
      Results.prototype.getHighlightedResults = function () {
        var $highlighted = this.$results.find('.select2-results__option--highlighted');
        return $highlighted;
      };
      Results.prototype.destroy = function () {
        this.$results.remove();
      };
      Results.prototype.ensureHighlightVisible = function () {
        var $highlighted = this.getHighlightedResults();
        if ($highlighted.length === 0) {
          return;
        }
        var $options = this.$results.find('.select2-results__option--selectable');
        var currentIndex = $options.index($highlighted);
        var currentOffset = this.$results.offset().top;
        var nextTop = $highlighted.offset().top;
        var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);
        var offsetDelta = nextTop - currentOffset;
        nextOffset -= $highlighted.outerHeight(false) * 2;
        if (currentIndex <= 2) {
          this.$results.scrollTop(0);
        } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
          this.$results.scrollTop(nextOffset);
        }
      };
      Results.prototype.template = function (result, container) {
        var template = this.options.get('templateResult');
        var escapeMarkup = this.options.get('escapeMarkup');
        var content = template(result, container);
        if (content == null) {
          container.style.display = 'none';
        } else if (typeof content === 'string') {
          container.innerHTML = escapeMarkup(content);
        } else {
          $(container).append(content);
        }
      };
      return Results;
    });
    S2.define('select2/keys', [], function () {
      var KEYS = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
      };
      return KEYS;
    });
    S2.define('select2/selection/base', ['jquery', '../utils', '../keys'], function ($, Utils, KEYS) {
      function BaseSelection($element, options) {
        this.$element = $element;
        this.options = options;
        BaseSelection.__super__.constructor.call(this);
      }
      Utils.Extend(BaseSelection, Utils.Observable);
      BaseSelection.prototype.render = function () {
        var $selection = $('<span class="select2-selection" role="combobox" ' + ' aria-haspopup="true" aria-expanded="false">' + '</span>');
        this._tabindex = 0;
        if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
          this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
        } else if (this.$element.attr('tabindex') != null) {
          this._tabindex = this.$element.attr('tabindex');
        }
        $selection.attr('title', this.$element.attr('title'));
        $selection.attr('tabindex', this._tabindex);
        $selection.attr('aria-disabled', 'false');
        this.$selection = $selection;
        return $selection;
      };
      BaseSelection.prototype.bind = function (container, $container) {
        var self = this;
        var resultsId = container.id + '-results';
        this.container = container;
        this.$selection.on('focus', function (evt) {
          self.trigger('focus', evt);
        });
        this.$selection.on('blur', function (evt) {
          self._handleBlur(evt);
        });
        this.$selection.on('keydown', function (evt) {
          self.trigger('keypress', evt);
          if (evt.which === KEYS.SPACE) {
            evt.preventDefault();
          }
        });
        container.on('results:focus', function (params) {
          self.$selection.attr('aria-activedescendant', params.data._resultId);
        });
        container.on('selection:update', function (params) {
          self.update(params.data);
        });
        container.on('open', function () {
          // When the dropdown is open, aria-expanded="true"
          self.$selection.attr('aria-expanded', 'true');
          self.$selection.attr('aria-owns', resultsId);
          self._attachCloseHandler(container);
        });
        container.on('close', function () {
          // When the dropdown is closed, aria-expanded="false"
          self.$selection.attr('aria-expanded', 'false');
          self.$selection.removeAttr('aria-activedescendant');
          self.$selection.removeAttr('aria-owns');
          self.$selection.trigger('focus');
          self._detachCloseHandler(container);
        });
        container.on('enable', function () {
          self.$selection.attr('tabindex', self._tabindex);
          self.$selection.attr('aria-disabled', 'false');
        });
        container.on('disable', function () {
          self.$selection.attr('tabindex', '-1');
          self.$selection.attr('aria-disabled', 'true');
        });
      };
      BaseSelection.prototype._handleBlur = function (evt) {
        var self = this;

        // This needs to be delayed as the active element is the body when the tab
        // key is pressed, possibly along with others.
        window.setTimeout(function () {
          // Don't trigger `blur` if the focus is still in the selection
          if (document.activeElement == self.$selection[0] || $.contains(self.$selection[0], document.activeElement)) {
            return;
          }
          self.trigger('blur', evt);
        }, 1);
      };
      BaseSelection.prototype._attachCloseHandler = function (container) {
        $(document.body).on('mousedown.select2.' + container.id, function (e) {
          var $target = $(e.target);
          var $select = $target.closest('.select2');
          var $all = $('.select2.select2-container--open');
          $all.each(function () {
            if (this == $select[0]) {
              return;
            }
            var $element = Utils.GetData(this, 'element');

            // HUI-SELECT2 renamed function to HUIselect2
            $element.HUIselect2('close');
            // $element.select2('close');
          });
        });
      };

      BaseSelection.prototype._detachCloseHandler = function (container) {
        $(document.body).off('mousedown.select2.' + container.id);
      };
      BaseSelection.prototype.position = function ($selection, $container) {
        var $selectionContainer = $container.find('.selection');
        $selectionContainer.append($selection);
      };
      BaseSelection.prototype.destroy = function () {
        this._detachCloseHandler(this.container);
      };
      BaseSelection.prototype.update = function (data) {
        throw new Error('The `update` method must be defined in child classes.');
      };

      /**
       * Helper method to abstract the "enabled" (not "disabled") state of this
       * object.
       *
       * @return {true} if the instance is not disabled.
       * @return {false} if the instance is disabled.
       */
      BaseSelection.prototype.isEnabled = function () {
        return !this.isDisabled();
      };

      /**
       * Helper method to abstract the "disabled" state of this object.
       *
       * @return {true} if the disabled option is true.
       * @return {false} if the disabled option is false.
       */
      BaseSelection.prototype.isDisabled = function () {
        return this.options.get('disabled');
      };
      return BaseSelection;
    });
    S2.define('select2/selection/single', ['jquery', './base', '../utils', '../keys'], function ($, BaseSelection, Utils, KEYS) {
      function SingleSelection() {
        SingleSelection.__super__.constructor.apply(this, arguments);
      }
      Utils.Extend(SingleSelection, BaseSelection);
      SingleSelection.prototype.render = function () {
        var $selection = SingleSelection.__super__.render.call(this);
        $selection[0].classList.add('select2-selection--single');
        $selection.html('<span class="select2-selection__rendered"></span>' + '<span class="select2-selection__arrow" role="presentation">' + '<b role="presentation"></b>' + '</span>');
        return $selection;
      };
      SingleSelection.prototype.bind = function (container, $container) {
        var self = this;
        SingleSelection.__super__.bind.apply(this, arguments);
        var id = container.id + '-container';
        this.$selection.find('.select2-selection__rendered').attr('id', id).attr('role', 'textbox').attr('aria-readonly', 'true');
        this.$selection.attr('aria-labelledby', id);
        this.$selection.attr('aria-controls', id);
        this.$selection.on('mousedown', function (evt) {
          // Only respond to left clicks
          if (evt.which !== 1) {
            return;
          }
          self.trigger('toggle', {
            originalEvent: evt
          });
        });
        this.$selection.on('focus', function (evt) {
          // User focuses on the container
        });
        this.$selection.on('blur', function (evt) {
          // User exits the container
        });
        container.on('focus', function (evt) {
          if (!container.isOpen()) {
            self.$selection.trigger('focus');
          }
        });
      };
      SingleSelection.prototype.clear = function () {
        var $rendered = this.$selection.find('.select2-selection__rendered');
        $rendered.empty();
        $rendered.removeAttr('title'); // clear tooltip on empty
      };

      SingleSelection.prototype.display = function (data, container) {
        var template = this.options.get('templateSelection');
        var escapeMarkup = this.options.get('escapeMarkup');
        return escapeMarkup(template(data, container));
      };
      SingleSelection.prototype.selectionContainer = function () {
        return $('<span></span>');
      };
      SingleSelection.prototype.update = function (data) {
        if (data.length === 0) {
          this.clear();
          return;
        }
        var selection = data[0];
        var $rendered = this.$selection.find('.select2-selection__rendered');
        var formatted = this.display(selection, $rendered);
        $rendered.empty().append(formatted);
        var title = selection.title || selection.text;
        if (title) {
          $rendered.attr('title', title);
        } else {
          $rendered.removeAttr('title');
        }
      };
      return SingleSelection;
    });
    S2.define('select2/selection/multiple', ['jquery', './base', '../utils'], function ($, BaseSelection, Utils) {
      function MultipleSelection($element, options) {
        MultipleSelection.__super__.constructor.apply(this, arguments);
      }
      Utils.Extend(MultipleSelection, BaseSelection);
      MultipleSelection.prototype.render = function () {
        var $selection = MultipleSelection.__super__.render.call(this);
        $selection[0].classList.add('select2-selection--multiple');
        $selection.html('<ul class="select2-selection__rendered"></ul>');
        return $selection;
      };
      MultipleSelection.prototype.bind = function (container, $container) {
        var self = this;
        MultipleSelection.__super__.bind.apply(this, arguments);
        var id = container.id + '-container';
        this.$selection.find('.select2-selection__rendered').attr('id', id);
        this.$selection.on('click', function (evt) {
          self.trigger('toggle', {
            originalEvent: evt
          });
        });
        this.$selection.on('click', '.select2-selection__choice__remove', function (evt) {
          // Ignore the event if it is disabled
          if (self.isDisabled()) {
            return;
          }
          var $remove = $(this);
          var $selection = $remove.parent();
          var data = Utils.GetData($selection[0], 'data');
          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        });
        this.$selection.on('keydown', '.select2-selection__choice__remove', function (evt) {
          // Ignore the event if it is disabled
          if (self.isDisabled()) {
            return;
          }
          evt.stopPropagation();
        });
      };
      MultipleSelection.prototype.clear = function () {
        var $rendered = this.$selection.find('.select2-selection__rendered');
        $rendered.empty();
        $rendered.removeAttr('title');
      };
      MultipleSelection.prototype.display = function (data, container) {
        var template = this.options.get('templateSelection');
        var escapeMarkup = this.options.get('escapeMarkup');
        return escapeMarkup(template(data, container));
      };
      MultipleSelection.prototype.selectionContainer = function () {
        var $container = $('<li class="select2-selection__choice">' + '<button type="button" class="select2-selection__choice__remove" ' + 'tabindex="-1">' + '<span aria-hidden="true">&times;</span>' + '</button>' + '<span class="select2-selection__choice__display"></span>' + '</li>');
        return $container;
      };
      MultipleSelection.prototype.update = function (data) {
        this.clear();
        if (data.length === 0) {
          return;
        }
        var $selections = [];
        var selectionIdPrefix = this.$selection.find('.select2-selection__rendered').attr('id') + '-choice-';
        for (var d = 0; d < data.length; d++) {
          var selection = data[d];
          var $selection = this.selectionContainer();
          var formatted = this.display(selection, $selection);
          var selectionId = selectionIdPrefix + Utils.generateChars(4) + '-';
          if (selection.id) {
            selectionId += selection.id;
          } else {
            selectionId += Utils.generateChars(4);
          }
          $selection.find('.select2-selection__choice__display').append(formatted).attr('id', selectionId);
          var title = selection.title || selection.text;
          if (title) {
            $selection.attr('title', title);
          }
          var removeItem = this.options.get('translations').get('removeItem');
          var $remove = $selection.find('.select2-selection__choice__remove');
          $remove.attr('title', removeItem());
          $remove.attr('aria-label', removeItem());
          $remove.attr('aria-describedby', selectionId);
          Utils.StoreData($selection[0], 'data', selection);
          $selections.push($selection);
        }
        var $rendered = this.$selection.find('.select2-selection__rendered');
        $rendered.append($selections);
      };
      return MultipleSelection;
    });
    S2.define('select2/selection/placeholder', [], function () {
      function Placeholder(decorated, $element, options) {
        this.placeholder = this.normalizePlaceholder(options.get('placeholder'));
        decorated.call(this, $element, options);
      }
      Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
        if (typeof placeholder === 'string') {
          placeholder = {
            id: '',
            text: placeholder
          };
        }
        return placeholder;
      };
      Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
        var $placeholder = this.selectionContainer();
        $placeholder.html(this.display(placeholder));
        $placeholder[0].classList.add('select2-selection__placeholder');
        $placeholder[0].classList.remove('select2-selection__choice');
        var placeholderTitle = placeholder.title || placeholder.text || $placeholder.text();
        this.$selection.find('.select2-selection__rendered').attr('title', placeholderTitle);
        return $placeholder;
      };
      Placeholder.prototype.update = function (decorated, data) {
        var singlePlaceholder = data.length == 1 && data[0].id != this.placeholder.id;
        var multipleSelections = data.length > 1;
        if (multipleSelections || singlePlaceholder) {
          return decorated.call(this, data);
        }
        this.clear();
        var $placeholder = this.createPlaceholder(this.placeholder);
        this.$selection.find('.select2-selection__rendered').append($placeholder);
      };
      return Placeholder;
    });
    S2.define('select2/selection/allowClear', ['jquery', '../keys', '../utils'], function ($, KEYS, Utils) {
      function AllowClear() {}
      AllowClear.prototype.bind = function (decorated, container, $container) {
        var self = this;
        decorated.call(this, container, $container);
        if (this.placeholder == null) {
          if (this.options.get('debug') && window.console && console.error) {
            console.error('Select2: The `allowClear` option should be used in combination ' + 'with the `placeholder` option.');
          }
        }
        this.$selection.on('mousedown', '.select2-selection__clear', function (evt) {
          self._handleClear(evt);
        });
        container.on('keypress', function (evt) {
          self._handleKeyboardClear(evt, container);
        });
      };
      AllowClear.prototype._handleClear = function (_, evt) {
        // Ignore the event if it is disabled
        if (this.isDisabled()) {
          return;
        }
        var $clear = this.$selection.find('.select2-selection__clear');

        // Ignore the event if nothing has been selected
        if ($clear.length === 0) {
          return;
        }
        evt.stopPropagation();
        var data = Utils.GetData($clear[0], 'data');
        var previousVal = this.$element.val();
        this.$element.val(this.placeholder.id);
        var unselectData = {
          data: data
        };
        this.trigger('clear', unselectData);
        if (unselectData.prevented) {
          this.$element.val(previousVal);
          return;
        }
        for (var d = 0; d < data.length; d++) {
          unselectData = {
            data: data[d]
          };

          // Trigger the `unselect` event, so people can prevent it from being
          // cleared.
          this.trigger('unselect', unselectData);

          // If the event was prevented, don't clear it out.
          if (unselectData.prevented) {
            this.$element.val(previousVal);
            return;
          }
        }
        this.$element.trigger('input').trigger('change');
        this.trigger('toggle', {});
      };
      AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
        if (container.isOpen()) {
          return;
        }
        if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
          this._handleClear(evt);
        }
      };
      AllowClear.prototype.update = function (decorated, data) {
        decorated.call(this, data);
        this.$selection.find('.select2-selection__clear').remove();
        this.$selection[0].classList.remove('select2-selection--clearable');
        if (this.$selection.find('.select2-selection__placeholder').length > 0 || data.length === 0) {
          return;
        }
        var selectionId = this.$selection.find('.select2-selection__rendered').attr('id');
        var removeAll = this.options.get('translations').get('removeAllItems');
        var $remove = $('<button type="button" class="select2-selection__clear" tabindex="-1">' + '<span aria-hidden="true">&times;</span>' + '</button>');
        $remove.attr('title', removeAll());
        $remove.attr('aria-label', removeAll());
        $remove.attr('aria-describedby', selectionId);
        Utils.StoreData($remove[0], 'data', data);
        this.$selection.prepend($remove);
        this.$selection[0].classList.add('select2-selection--clearable');
      };
      return AllowClear;
    });
    S2.define('select2/selection/search', ['jquery', '../utils', '../keys'], function ($, Utils, KEYS) {
      function Search(decorated, $element, options) {
        decorated.call(this, $element, options);
      }
      Search.prototype.render = function (decorated) {
        var searchLabel = this.options.get('translations').get('search');
        var $search = $('<span class="select2-search select2-search--inline">' + '<textarea class="select2-search__field"' + ' type="search" tabindex="-1"' + ' autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="searchbox" aria-autocomplete="list" >' + '</textarea>' + '</span>');
        this.$searchContainer = $search;
        this.$search = $search.find('textarea');
        this.$search.prop('autocomplete', this.options.get('autocomplete'));
        this.$search.attr('aria-label', searchLabel());
        var $rendered = decorated.call(this);
        this._transferTabIndex();
        $rendered.append(this.$searchContainer);
        return $rendered;
      };
      Search.prototype.bind = function (decorated, container, $container) {
        var self = this;
        var resultsId = container.id + '-results';
        var selectionId = container.id + '-container';
        decorated.call(this, container, $container);
        self.$search.attr('aria-describedby', selectionId);
        container.on('open', function () {
          self.$search.attr('aria-controls', resultsId);
          self.$search.trigger('focus');
        });
        container.on('close', function () {
          self.$search.val('');
          self.resizeSearch();
          self.$search.removeAttr('aria-controls');
          self.$search.removeAttr('aria-activedescendant');
          self.$search.trigger('focus');
        });
        container.on('enable', function () {
          self.$search.prop('disabled', false);
          self._transferTabIndex();
        });
        container.on('disable', function () {
          self.$search.prop('disabled', true);
        });
        container.on('focus', function (evt) {
          self.$search.trigger('focus');
        });
        container.on('results:focus', function (params) {
          if (params.data._resultId) {
            self.$search.attr('aria-activedescendant', params.data._resultId);
          } else {
            self.$search.removeAttr('aria-activedescendant');
          }
        });
        this.$selection.on('focusin', '.select2-search--inline', function (evt) {
          self.trigger('focus', evt);
        });
        this.$selection.on('focusout', '.select2-search--inline', function (evt) {
          self._handleBlur(evt);
        });
        this.$selection.on('keydown', '.select2-search--inline', function (evt) {
          evt.stopPropagation();
          self.trigger('keypress', evt);
          self._keyUpPrevented = evt.isDefaultPrevented();
          var key = evt.which;
          if (key === KEYS.BACKSPACE && self.$search.val() === '') {
            var $previousChoice = self.$selection.find('.select2-selection__choice').last();
            if ($previousChoice.length > 0) {
              var item = Utils.GetData($previousChoice[0], 'data');
              self.searchRemoveChoice(item);
              evt.preventDefault();
            }
          }
        });
        this.$selection.on('click', '.select2-search--inline', function (evt) {
          if (self.$search.val()) {
            evt.stopPropagation();
          }
        });

        // Try to detect the IE version should the `documentMode` property that
        // is stored on the document. This is only implemented in IE and is
        // slightly cleaner than doing a user agent check.
        // This property is not available in Edge, but Edge also doesn't have
        // this bug.
        var msie = document.documentMode;
        var disableInputEvents = msie && msie <= 11;

        // Workaround for browsers which do not support the `input` event
        // This will prevent double-triggering of events for browsers which support
        // both the `keyup` and `input` events.
        this.$selection.on('input.searchcheck', '.select2-search--inline', function (evt) {
          // IE will trigger the `input` event when a placeholder is used on a
          // search box. To get around this issue, we are forced to ignore all
          // `input` events in IE and keep using `keyup`.
          if (disableInputEvents) {
            self.$selection.off('input.search input.searchcheck');
            return;
          }

          // Unbind the duplicated `keyup` event
          self.$selection.off('keyup.search');
        });
        this.$selection.on('keyup.search input.search', '.select2-search--inline', function (evt) {
          // IE will trigger the `input` event when a placeholder is used on a
          // search box. To get around this issue, we are forced to ignore all
          // `input` events in IE and keep using `keyup`.
          if (disableInputEvents && evt.type === 'input') {
            self.$selection.off('input.search input.searchcheck');
            return;
          }
          var key = evt.which;

          // We can freely ignore events from modifier keys
          if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
            return;
          }

          // Tabbing will be handled during the `keydown` phase
          if (key == KEYS.TAB) {
            return;
          }
          self.handleSearch(evt);
        });
      };

      /**
       * This method will transfer the tabindex attribute from the rendered
       * selection to the search box. This allows for the search box to be used as
       * the primary focus instead of the selection container.
       *
       * @private
       */
      Search.prototype._transferTabIndex = function (decorated) {
        this.$search.attr('tabindex', this.$selection.attr('tabindex'));
        this.$selection.attr('tabindex', '-1');
      };
      Search.prototype.createPlaceholder = function (decorated, placeholder) {
        this.$search.attr('placeholder', placeholder.text);
      };
      Search.prototype.update = function (decorated, data) {
        var searchHadFocus = this.$search[0] == document.activeElement;
        this.$search.attr('placeholder', '');
        decorated.call(this, data);
        this.resizeSearch();
        if (searchHadFocus) {
          this.$search.trigger('focus');
        }
      };
      Search.prototype.handleSearch = function () {
        this.resizeSearch();
        if (!this._keyUpPrevented) {
          var input = this.$search.val();
          this.trigger('query', {
            term: input
          });
        }
        this._keyUpPrevented = false;
      };
      Search.prototype.searchRemoveChoice = function (decorated, item) {
        this.trigger('unselect', {
          data: item
        });
        this.$search.val(item.text);
        this.handleSearch();
      };
      Search.prototype.resizeSearch = function () {
        this.$search.css('width', '25px');
        var width = '100%';
        if (this.$search.attr('placeholder') === '') {
          var minimumWidth = this.$search.val().length + 1;
          width = minimumWidth * 0.75 + 'em';
        }
        this.$search.css('width', width);
      };
      return Search;
    });
    S2.define('select2/selection/selectionCss', ['../utils'], function (Utils) {
      function SelectionCSS() {}
      SelectionCSS.prototype.render = function (decorated) {
        var $selection = decorated.call(this);
        var selectionCssClass = this.options.get('selectionCssClass') || '';
        if (selectionCssClass.indexOf(':all:') !== -1) {
          selectionCssClass = selectionCssClass.replace(':all:', '');
          Utils.copyNonInternalCssClasses($selection[0], this.$element[0]);
        }
        $selection.addClass(selectionCssClass);
        return $selection;
      };
      return SelectionCSS;
    });
    S2.define('select2/selection/eventRelay', ['jquery'], function ($) {
      function EventRelay() {}
      EventRelay.prototype.bind = function (decorated, container, $container) {
        var self = this;
        var relayEvents = ['open', 'opening', 'close', 'closing', 'select', 'selecting', 'unselect', 'unselecting', 'clear', 'clearing'];
        var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting', 'clearing'];
        decorated.call(this, container, $container);
        container.on('*', function (name, params) {
          // Ignore events that should not be relayed
          if (relayEvents.indexOf(name) === -1) {
            return;
          }

          // The parameters should always be an object
          params = params || {};

          // Generate the jQuery event for the Select2 event
          var evt = $.Event('select2:' + name, {
            params: params
          });
          self.$element.trigger(evt);

          // Only handle preventable events if it was one
          if (preventableEvents.indexOf(name) === -1) {
            return;
          }
          params.prevented = evt.isDefaultPrevented();
        });
      };
      return EventRelay;
    });
    S2.define('select2/translation', ['jquery', 'require'], function ($, require) {
      function Translation(dict) {
        this.dict = dict || {};
      }
      Translation.prototype.all = function () {
        return this.dict;
      };
      Translation.prototype.get = function (key) {
        return this.dict[key];
      };
      Translation.prototype.extend = function (translation) {
        this.dict = $.extend({}, translation.all(), this.dict);
      };

      // Static functions

      Translation._cache = {};
      Translation.loadPath = function (path) {
        if (!(path in Translation._cache)) {
          var translations = require(path);
          Translation._cache[path] = translations;
        }
        return new Translation(Translation._cache[path]);
      };
      return Translation;
    });
    S2.define('select2/diacritics', [], function () {
      var diacritics = {
        "\u24B6": 'A',
        "\uFF21": 'A',
        "\xC0": 'A',
        "\xC1": 'A',
        "\xC2": 'A',
        "\u1EA6": 'A',
        "\u1EA4": 'A',
        "\u1EAA": 'A',
        "\u1EA8": 'A',
        "\xC3": 'A',
        "\u0100": 'A',
        "\u0102": 'A',
        "\u1EB0": 'A',
        "\u1EAE": 'A',
        "\u1EB4": 'A',
        "\u1EB2": 'A',
        "\u0226": 'A',
        "\u01E0": 'A',
        "\xC4": 'A',
        "\u01DE": 'A',
        "\u1EA2": 'A',
        "\xC5": 'A',
        "\u01FA": 'A',
        "\u01CD": 'A',
        "\u0200": 'A',
        "\u0202": 'A',
        "\u1EA0": 'A',
        "\u1EAC": 'A',
        "\u1EB6": 'A',
        "\u1E00": 'A',
        "\u0104": 'A',
        "\u023A": 'A',
        "\u2C6F": 'A',
        "\uA732": 'AA',
        "\xC6": 'AE',
        "\u01FC": 'AE',
        "\u01E2": 'AE',
        "\uA734": 'AO',
        "\uA736": 'AU',
        "\uA738": 'AV',
        "\uA73A": 'AV',
        "\uA73C": 'AY',
        "\u24B7": 'B',
        "\uFF22": 'B',
        "\u1E02": 'B',
        "\u1E04": 'B',
        "\u1E06": 'B',
        "\u0243": 'B',
        "\u0182": 'B',
        "\u0181": 'B',
        "\u24B8": 'C',
        "\uFF23": 'C',
        "\u0106": 'C',
        "\u0108": 'C',
        "\u010A": 'C',
        "\u010C": 'C',
        "\xC7": 'C',
        "\u1E08": 'C',
        "\u0187": 'C',
        "\u023B": 'C',
        "\uA73E": 'C',
        "\u24B9": 'D',
        "\uFF24": 'D',
        "\u1E0A": 'D',
        "\u010E": 'D',
        "\u1E0C": 'D',
        "\u1E10": 'D',
        "\u1E12": 'D',
        "\u1E0E": 'D',
        "\u0110": 'D',
        "\u018B": 'D',
        "\u018A": 'D',
        "\u0189": 'D',
        "\uA779": 'D',
        "\u01F1": 'DZ',
        "\u01C4": 'DZ',
        "\u01F2": 'Dz',
        "\u01C5": 'Dz',
        "\u24BA": 'E',
        "\uFF25": 'E',
        "\xC8": 'E',
        "\xC9": 'E',
        "\xCA": 'E',
        "\u1EC0": 'E',
        "\u1EBE": 'E',
        "\u1EC4": 'E',
        "\u1EC2": 'E',
        "\u1EBC": 'E',
        "\u0112": 'E',
        "\u1E14": 'E',
        "\u1E16": 'E',
        "\u0114": 'E',
        "\u0116": 'E',
        "\xCB": 'E',
        "\u1EBA": 'E',
        "\u011A": 'E',
        "\u0204": 'E',
        "\u0206": 'E',
        "\u1EB8": 'E',
        "\u1EC6": 'E',
        "\u0228": 'E',
        "\u1E1C": 'E',
        "\u0118": 'E',
        "\u1E18": 'E',
        "\u1E1A": 'E',
        "\u0190": 'E',
        "\u018E": 'E',
        "\u24BB": 'F',
        "\uFF26": 'F',
        "\u1E1E": 'F',
        "\u0191": 'F',
        "\uA77B": 'F',
        "\u24BC": 'G',
        "\uFF27": 'G',
        "\u01F4": 'G',
        "\u011C": 'G',
        "\u1E20": 'G',
        "\u011E": 'G',
        "\u0120": 'G',
        "\u01E6": 'G',
        "\u0122": 'G',
        "\u01E4": 'G',
        "\u0193": 'G',
        "\uA7A0": 'G',
        "\uA77D": 'G',
        "\uA77E": 'G',
        "\u24BD": 'H',
        "\uFF28": 'H',
        "\u0124": 'H',
        "\u1E22": 'H',
        "\u1E26": 'H',
        "\u021E": 'H',
        "\u1E24": 'H',
        "\u1E28": 'H',
        "\u1E2A": 'H',
        "\u0126": 'H',
        "\u2C67": 'H',
        "\u2C75": 'H',
        "\uA78D": 'H',
        "\u24BE": 'I',
        "\uFF29": 'I',
        "\xCC": 'I',
        "\xCD": 'I',
        "\xCE": 'I',
        "\u0128": 'I',
        "\u012A": 'I',
        "\u012C": 'I',
        "\u0130": 'I',
        "\xCF": 'I',
        "\u1E2E": 'I',
        "\u1EC8": 'I',
        "\u01CF": 'I',
        "\u0208": 'I',
        "\u020A": 'I',
        "\u1ECA": 'I',
        "\u012E": 'I',
        "\u1E2C": 'I',
        "\u0197": 'I',
        "\u24BF": 'J',
        "\uFF2A": 'J',
        "\u0134": 'J',
        "\u0248": 'J',
        "\u24C0": 'K',
        "\uFF2B": 'K',
        "\u1E30": 'K',
        "\u01E8": 'K',
        "\u1E32": 'K',
        "\u0136": 'K',
        "\u1E34": 'K',
        "\u0198": 'K',
        "\u2C69": 'K',
        "\uA740": 'K',
        "\uA742": 'K',
        "\uA744": 'K',
        "\uA7A2": 'K',
        "\u24C1": 'L',
        "\uFF2C": 'L',
        "\u013F": 'L',
        "\u0139": 'L',
        "\u013D": 'L',
        "\u1E36": 'L',
        "\u1E38": 'L',
        "\u013B": 'L',
        "\u1E3C": 'L',
        "\u1E3A": 'L',
        "\u0141": 'L',
        "\u023D": 'L',
        "\u2C62": 'L',
        "\u2C60": 'L',
        "\uA748": 'L',
        "\uA746": 'L',
        "\uA780": 'L',
        "\u01C7": 'LJ',
        "\u01C8": 'Lj',
        "\u24C2": 'M',
        "\uFF2D": 'M',
        "\u1E3E": 'M',
        "\u1E40": 'M',
        "\u1E42": 'M',
        "\u2C6E": 'M',
        "\u019C": 'M',
        "\u24C3": 'N',
        "\uFF2E": 'N',
        "\u01F8": 'N',
        "\u0143": 'N',
        "\xD1": 'N',
        "\u1E44": 'N',
        "\u0147": 'N',
        "\u1E46": 'N',
        "\u0145": 'N',
        "\u1E4A": 'N',
        "\u1E48": 'N',
        "\u0220": 'N',
        "\u019D": 'N',
        "\uA790": 'N',
        "\uA7A4": 'N',
        "\u01CA": 'NJ',
        "\u01CB": 'Nj',
        "\u24C4": 'O',
        "\uFF2F": 'O',
        "\xD2": 'O',
        "\xD3": 'O',
        "\xD4": 'O',
        "\u1ED2": 'O',
        "\u1ED0": 'O',
        "\u1ED6": 'O',
        "\u1ED4": 'O',
        "\xD5": 'O',
        "\u1E4C": 'O',
        "\u022C": 'O',
        "\u1E4E": 'O',
        "\u014C": 'O',
        "\u1E50": 'O',
        "\u1E52": 'O',
        "\u014E": 'O',
        "\u022E": 'O',
        "\u0230": 'O',
        "\xD6": 'O',
        "\u022A": 'O',
        "\u1ECE": 'O',
        "\u0150": 'O',
        "\u01D1": 'O',
        "\u020C": 'O',
        "\u020E": 'O',
        "\u01A0": 'O',
        "\u1EDC": 'O',
        "\u1EDA": 'O',
        "\u1EE0": 'O',
        "\u1EDE": 'O',
        "\u1EE2": 'O',
        "\u1ECC": 'O',
        "\u1ED8": 'O',
        "\u01EA": 'O',
        "\u01EC": 'O',
        "\xD8": 'O',
        "\u01FE": 'O',
        "\u0186": 'O',
        "\u019F": 'O',
        "\uA74A": 'O',
        "\uA74C": 'O',
        "\u0152": 'OE',
        "\u01A2": 'OI',
        "\uA74E": 'OO',
        "\u0222": 'OU',
        "\u24C5": 'P',
        "\uFF30": 'P',
        "\u1E54": 'P',
        "\u1E56": 'P',
        "\u01A4": 'P',
        "\u2C63": 'P',
        "\uA750": 'P',
        "\uA752": 'P',
        "\uA754": 'P',
        "\u24C6": 'Q',
        "\uFF31": 'Q',
        "\uA756": 'Q',
        "\uA758": 'Q',
        "\u024A": 'Q',
        "\u24C7": 'R',
        "\uFF32": 'R',
        "\u0154": 'R',
        "\u1E58": 'R',
        "\u0158": 'R',
        "\u0210": 'R',
        "\u0212": 'R',
        "\u1E5A": 'R',
        "\u1E5C": 'R',
        "\u0156": 'R',
        "\u1E5E": 'R',
        "\u024C": 'R',
        "\u2C64": 'R',
        "\uA75A": 'R',
        "\uA7A6": 'R',
        "\uA782": 'R',
        "\u24C8": 'S',
        "\uFF33": 'S',
        "\u1E9E": 'S',
        "\u015A": 'S',
        "\u1E64": 'S',
        "\u015C": 'S',
        "\u1E60": 'S',
        "\u0160": 'S',
        "\u1E66": 'S',
        "\u1E62": 'S',
        "\u1E68": 'S',
        "\u0218": 'S',
        "\u015E": 'S',
        "\u2C7E": 'S',
        "\uA7A8": 'S',
        "\uA784": 'S',
        "\u24C9": 'T',
        "\uFF34": 'T',
        "\u1E6A": 'T',
        "\u0164": 'T',
        "\u1E6C": 'T',
        "\u021A": 'T',
        "\u0162": 'T',
        "\u1E70": 'T',
        "\u1E6E": 'T',
        "\u0166": 'T',
        "\u01AC": 'T',
        "\u01AE": 'T',
        "\u023E": 'T',
        "\uA786": 'T',
        "\uA728": 'TZ',
        "\u24CA": 'U',
        "\uFF35": 'U',
        "\xD9": 'U',
        "\xDA": 'U',
        "\xDB": 'U',
        "\u0168": 'U',
        "\u1E78": 'U',
        "\u016A": 'U',
        "\u1E7A": 'U',
        "\u016C": 'U',
        "\xDC": 'U',
        "\u01DB": 'U',
        "\u01D7": 'U',
        "\u01D5": 'U',
        "\u01D9": 'U',
        "\u1EE6": 'U',
        "\u016E": 'U',
        "\u0170": 'U',
        "\u01D3": 'U',
        "\u0214": 'U',
        "\u0216": 'U',
        "\u01AF": 'U',
        "\u1EEA": 'U',
        "\u1EE8": 'U',
        "\u1EEE": 'U',
        "\u1EEC": 'U',
        "\u1EF0": 'U',
        "\u1EE4": 'U',
        "\u1E72": 'U',
        "\u0172": 'U',
        "\u1E76": 'U',
        "\u1E74": 'U',
        "\u0244": 'U',
        "\u24CB": 'V',
        "\uFF36": 'V',
        "\u1E7C": 'V',
        "\u1E7E": 'V',
        "\u01B2": 'V',
        "\uA75E": 'V',
        "\u0245": 'V',
        "\uA760": 'VY',
        "\u24CC": 'W',
        "\uFF37": 'W',
        "\u1E80": 'W',
        "\u1E82": 'W',
        "\u0174": 'W',
        "\u1E86": 'W',
        "\u1E84": 'W',
        "\u1E88": 'W',
        "\u2C72": 'W',
        "\u24CD": 'X',
        "\uFF38": 'X',
        "\u1E8A": 'X',
        "\u1E8C": 'X',
        "\u24CE": 'Y',
        "\uFF39": 'Y',
        "\u1EF2": 'Y',
        "\xDD": 'Y',
        "\u0176": 'Y',
        "\u1EF8": 'Y',
        "\u0232": 'Y',
        "\u1E8E": 'Y',
        "\u0178": 'Y',
        "\u1EF6": 'Y',
        "\u1EF4": 'Y',
        "\u01B3": 'Y',
        "\u024E": 'Y',
        "\u1EFE": 'Y',
        "\u24CF": 'Z',
        "\uFF3A": 'Z',
        "\u0179": 'Z',
        "\u1E90": 'Z',
        "\u017B": 'Z',
        "\u017D": 'Z',
        "\u1E92": 'Z',
        "\u1E94": 'Z',
        "\u01B5": 'Z',
        "\u0224": 'Z',
        "\u2C7F": 'Z',
        "\u2C6B": 'Z',
        "\uA762": 'Z',
        "\u24D0": 'a',
        "\uFF41": 'a',
        "\u1E9A": 'a',
        "\xE0": 'a',
        "\xE1": 'a',
        "\xE2": 'a',
        "\u1EA7": 'a',
        "\u1EA5": 'a',
        "\u1EAB": 'a',
        "\u1EA9": 'a',
        "\xE3": 'a',
        "\u0101": 'a',
        "\u0103": 'a',
        "\u1EB1": 'a',
        "\u1EAF": 'a',
        "\u1EB5": 'a',
        "\u1EB3": 'a',
        "\u0227": 'a',
        "\u01E1": 'a',
        "\xE4": 'a',
        "\u01DF": 'a',
        "\u1EA3": 'a',
        "\xE5": 'a',
        "\u01FB": 'a',
        "\u01CE": 'a',
        "\u0201": 'a',
        "\u0203": 'a',
        "\u1EA1": 'a',
        "\u1EAD": 'a',
        "\u1EB7": 'a',
        "\u1E01": 'a',
        "\u0105": 'a',
        "\u2C65": 'a',
        "\u0250": 'a',
        "\uA733": 'aa',
        "\xE6": 'ae',
        "\u01FD": 'ae',
        "\u01E3": 'ae',
        "\uA735": 'ao',
        "\uA737": 'au',
        "\uA739": 'av',
        "\uA73B": 'av',
        "\uA73D": 'ay',
        "\u24D1": 'b',
        "\uFF42": 'b',
        "\u1E03": 'b',
        "\u1E05": 'b',
        "\u1E07": 'b',
        "\u0180": 'b',
        "\u0183": 'b',
        "\u0253": 'b',
        "\u24D2": 'c',
        "\uFF43": 'c',
        "\u0107": 'c',
        "\u0109": 'c',
        "\u010B": 'c',
        "\u010D": 'c',
        "\xE7": 'c',
        "\u1E09": 'c',
        "\u0188": 'c',
        "\u023C": 'c',
        "\uA73F": 'c',
        "\u2184": 'c',
        "\u24D3": 'd',
        "\uFF44": 'd',
        "\u1E0B": 'd',
        "\u010F": 'd',
        "\u1E0D": 'd',
        "\u1E11": 'd',
        "\u1E13": 'd',
        "\u1E0F": 'd',
        "\u0111": 'd',
        "\u018C": 'd',
        "\u0256": 'd',
        "\u0257": 'd',
        "\uA77A": 'd',
        "\u01F3": 'dz',
        "\u01C6": 'dz',
        "\u24D4": 'e',
        "\uFF45": 'e',
        "\xE8": 'e',
        "\xE9": 'e',
        "\xEA": 'e',
        "\u1EC1": 'e',
        "\u1EBF": 'e',
        "\u1EC5": 'e',
        "\u1EC3": 'e',
        "\u1EBD": 'e',
        "\u0113": 'e',
        "\u1E15": 'e',
        "\u1E17": 'e',
        "\u0115": 'e',
        "\u0117": 'e',
        "\xEB": 'e',
        "\u1EBB": 'e',
        "\u011B": 'e',
        "\u0205": 'e',
        "\u0207": 'e',
        "\u1EB9": 'e',
        "\u1EC7": 'e',
        "\u0229": 'e',
        "\u1E1D": 'e',
        "\u0119": 'e',
        "\u1E19": 'e',
        "\u1E1B": 'e',
        "\u0247": 'e',
        "\u025B": 'e',
        "\u01DD": 'e',
        "\u24D5": 'f',
        "\uFF46": 'f',
        "\u1E1F": 'f',
        "\u0192": 'f',
        "\uA77C": 'f',
        "\u24D6": 'g',
        "\uFF47": 'g',
        "\u01F5": 'g',
        "\u011D": 'g',
        "\u1E21": 'g',
        "\u011F": 'g',
        "\u0121": 'g',
        "\u01E7": 'g',
        "\u0123": 'g',
        "\u01E5": 'g',
        "\u0260": 'g',
        "\uA7A1": 'g',
        "\u1D79": 'g',
        "\uA77F": 'g',
        "\u24D7": 'h',
        "\uFF48": 'h',
        "\u0125": 'h',
        "\u1E23": 'h',
        "\u1E27": 'h',
        "\u021F": 'h',
        "\u1E25": 'h',
        "\u1E29": 'h',
        "\u1E2B": 'h',
        "\u1E96": 'h',
        "\u0127": 'h',
        "\u2C68": 'h',
        "\u2C76": 'h',
        "\u0265": 'h',
        "\u0195": 'hv',
        "\u24D8": 'i',
        "\uFF49": 'i',
        "\xEC": 'i',
        "\xED": 'i',
        "\xEE": 'i',
        "\u0129": 'i',
        "\u012B": 'i',
        "\u012D": 'i',
        "\xEF": 'i',
        "\u1E2F": 'i',
        "\u1EC9": 'i',
        "\u01D0": 'i',
        "\u0209": 'i',
        "\u020B": 'i',
        "\u1ECB": 'i',
        "\u012F": 'i',
        "\u1E2D": 'i',
        "\u0268": 'i',
        "\u0131": 'i',
        "\u24D9": 'j',
        "\uFF4A": 'j',
        "\u0135": 'j',
        "\u01F0": 'j',
        "\u0249": 'j',
        "\u24DA": 'k',
        "\uFF4B": 'k',
        "\u1E31": 'k',
        "\u01E9": 'k',
        "\u1E33": 'k',
        "\u0137": 'k',
        "\u1E35": 'k',
        "\u0199": 'k',
        "\u2C6A": 'k',
        "\uA741": 'k',
        "\uA743": 'k',
        "\uA745": 'k',
        "\uA7A3": 'k',
        "\u24DB": 'l',
        "\uFF4C": 'l',
        "\u0140": 'l',
        "\u013A": 'l',
        "\u013E": 'l',
        "\u1E37": 'l',
        "\u1E39": 'l',
        "\u013C": 'l',
        "\u1E3D": 'l',
        "\u1E3B": 'l',
        "\u017F": 'l',
        "\u0142": 'l',
        "\u019A": 'l',
        "\u026B": 'l',
        "\u2C61": 'l',
        "\uA749": 'l',
        "\uA781": 'l',
        "\uA747": 'l',
        "\u01C9": 'lj',
        "\u24DC": 'm',
        "\uFF4D": 'm',
        "\u1E3F": 'm',
        "\u1E41": 'm',
        "\u1E43": 'm',
        "\u0271": 'm',
        "\u026F": 'm',
        "\u24DD": 'n',
        "\uFF4E": 'n',
        "\u01F9": 'n',
        "\u0144": 'n',
        "\xF1": 'n',
        "\u1E45": 'n',
        "\u0148": 'n',
        "\u1E47": 'n',
        "\u0146": 'n',
        "\u1E4B": 'n',
        "\u1E49": 'n',
        "\u019E": 'n',
        "\u0272": 'n',
        "\u0149": 'n',
        "\uA791": 'n',
        "\uA7A5": 'n',
        "\u01CC": 'nj',
        "\u24DE": 'o',
        "\uFF4F": 'o',
        "\xF2": 'o',
        "\xF3": 'o',
        "\xF4": 'o',
        "\u1ED3": 'o',
        "\u1ED1": 'o',
        "\u1ED7": 'o',
        "\u1ED5": 'o',
        "\xF5": 'o',
        "\u1E4D": 'o',
        "\u022D": 'o',
        "\u1E4F": 'o',
        "\u014D": 'o',
        "\u1E51": 'o',
        "\u1E53": 'o',
        "\u014F": 'o',
        "\u022F": 'o',
        "\u0231": 'o',
        "\xF6": 'o',
        "\u022B": 'o',
        "\u1ECF": 'o',
        "\u0151": 'o',
        "\u01D2": 'o',
        "\u020D": 'o',
        "\u020F": 'o',
        "\u01A1": 'o',
        "\u1EDD": 'o',
        "\u1EDB": 'o',
        "\u1EE1": 'o',
        "\u1EDF": 'o',
        "\u1EE3": 'o',
        "\u1ECD": 'o',
        "\u1ED9": 'o',
        "\u01EB": 'o',
        "\u01ED": 'o',
        "\xF8": 'o',
        "\u01FF": 'o',
        "\u0254": 'o',
        "\uA74B": 'o',
        "\uA74D": 'o',
        "\u0275": 'o',
        "\u0153": 'oe',
        "\u01A3": 'oi',
        "\u0223": 'ou',
        "\uA74F": 'oo',
        "\u24DF": 'p',
        "\uFF50": 'p',
        "\u1E55": 'p',
        "\u1E57": 'p',
        "\u01A5": 'p',
        "\u1D7D": 'p',
        "\uA751": 'p',
        "\uA753": 'p',
        "\uA755": 'p',
        "\u24E0": 'q',
        "\uFF51": 'q',
        "\u024B": 'q',
        "\uA757": 'q',
        "\uA759": 'q',
        "\u24E1": 'r',
        "\uFF52": 'r',
        "\u0155": 'r',
        "\u1E59": 'r',
        "\u0159": 'r',
        "\u0211": 'r',
        "\u0213": 'r',
        "\u1E5B": 'r',
        "\u1E5D": 'r',
        "\u0157": 'r',
        "\u1E5F": 'r',
        "\u024D": 'r',
        "\u027D": 'r',
        "\uA75B": 'r',
        "\uA7A7": 'r',
        "\uA783": 'r',
        "\u24E2": 's',
        "\uFF53": 's',
        "\xDF": 's',
        "\u015B": 's',
        "\u1E65": 's',
        "\u015D": 's',
        "\u1E61": 's',
        "\u0161": 's',
        "\u1E67": 's',
        "\u1E63": 's',
        "\u1E69": 's',
        "\u0219": 's',
        "\u015F": 's',
        "\u023F": 's',
        "\uA7A9": 's',
        "\uA785": 's',
        "\u1E9B": 's',
        "\u24E3": 't',
        "\uFF54": 't',
        "\u1E6B": 't',
        "\u1E97": 't',
        "\u0165": 't',
        "\u1E6D": 't',
        "\u021B": 't',
        "\u0163": 't',
        "\u1E71": 't',
        "\u1E6F": 't',
        "\u0167": 't',
        "\u01AD": 't',
        "\u0288": 't',
        "\u2C66": 't',
        "\uA787": 't',
        "\uA729": 'tz',
        "\u24E4": 'u',
        "\uFF55": 'u',
        "\xF9": 'u',
        "\xFA": 'u',
        "\xFB": 'u',
        "\u0169": 'u',
        "\u1E79": 'u',
        "\u016B": 'u',
        "\u1E7B": 'u',
        "\u016D": 'u',
        "\xFC": 'u',
        "\u01DC": 'u',
        "\u01D8": 'u',
        "\u01D6": 'u',
        "\u01DA": 'u',
        "\u1EE7": 'u',
        "\u016F": 'u',
        "\u0171": 'u',
        "\u01D4": 'u',
        "\u0215": 'u',
        "\u0217": 'u',
        "\u01B0": 'u',
        "\u1EEB": 'u',
        "\u1EE9": 'u',
        "\u1EEF": 'u',
        "\u1EED": 'u',
        "\u1EF1": 'u',
        "\u1EE5": 'u',
        "\u1E73": 'u',
        "\u0173": 'u',
        "\u1E77": 'u',
        "\u1E75": 'u',
        "\u0289": 'u',
        "\u24E5": 'v',
        "\uFF56": 'v',
        "\u1E7D": 'v',
        "\u1E7F": 'v',
        "\u028B": 'v',
        "\uA75F": 'v',
        "\u028C": 'v',
        "\uA761": 'vy',
        "\u24E6": 'w',
        "\uFF57": 'w',
        "\u1E81": 'w',
        "\u1E83": 'w',
        "\u0175": 'w',
        "\u1E87": 'w',
        "\u1E85": 'w',
        "\u1E98": 'w',
        "\u1E89": 'w',
        "\u2C73": 'w',
        "\u24E7": 'x',
        "\uFF58": 'x',
        "\u1E8B": 'x',
        "\u1E8D": 'x',
        "\u24E8": 'y',
        "\uFF59": 'y',
        "\u1EF3": 'y',
        "\xFD": 'y',
        "\u0177": 'y',
        "\u1EF9": 'y',
        "\u0233": 'y',
        "\u1E8F": 'y',
        "\xFF": 'y',
        "\u1EF7": 'y',
        "\u1E99": 'y',
        "\u1EF5": 'y',
        "\u01B4": 'y',
        "\u024F": 'y',
        "\u1EFF": 'y',
        "\u24E9": 'z',
        "\uFF5A": 'z',
        "\u017A": 'z',
        "\u1E91": 'z',
        "\u017C": 'z',
        "\u017E": 'z',
        "\u1E93": 'z',
        "\u1E95": 'z',
        "\u01B6": 'z',
        "\u0225": 'z',
        "\u0240": 'z',
        "\u2C6C": 'z',
        "\uA763": 'z',
        "\u0386": "\u0391",
        "\u0388": "\u0395",
        "\u0389": "\u0397",
        "\u038A": "\u0399",
        "\u03AA": "\u0399",
        "\u038C": "\u039F",
        "\u038E": "\u03A5",
        "\u03AB": "\u03A5",
        "\u038F": "\u03A9",
        "\u03AC": "\u03B1",
        "\u03AD": "\u03B5",
        "\u03AE": "\u03B7",
        "\u03AF": "\u03B9",
        "\u03CA": "\u03B9",
        "\u0390": "\u03B9",
        "\u03CC": "\u03BF",
        "\u03CD": "\u03C5",
        "\u03CB": "\u03C5",
        "\u03B0": "\u03C5",
        "\u03CE": "\u03C9",
        "\u03C2": "\u03C3",
        "\u2019": '\''
      };
      return diacritics;
    });
    S2.define('select2/data/base', ['../utils'], function (Utils) {
      function BaseAdapter($element, options) {
        BaseAdapter.__super__.constructor.call(this);
      }
      Utils.Extend(BaseAdapter, Utils.Observable);
      BaseAdapter.prototype.current = function (callback) {
        throw new Error('The `current` method must be defined in child classes.');
      };
      BaseAdapter.prototype.query = function (params, callback) {
        throw new Error('The `query` method must be defined in child classes.');
      };
      BaseAdapter.prototype.bind = function (container, $container) {
        // Can be implemented in subclasses
      };
      BaseAdapter.prototype.destroy = function () {
        // Can be implemented in subclasses
      };
      BaseAdapter.prototype.generateResultId = function (container, data) {
        var id = container.id + '-result-';
        id += Utils.generateChars(4);
        if (data.id != null) {
          id += '-' + data.id.toString();
        } else {
          id += '-' + Utils.generateChars(4);
        }
        return id;
      };
      return BaseAdapter;
    });
    S2.define('select2/data/select', ['./base', '../utils', 'jquery'], function (BaseAdapter, Utils, $) {
      function SelectAdapter($element, options) {
        this.$element = $element;
        this.options = options;
        SelectAdapter.__super__.constructor.call(this);
      }
      Utils.Extend(SelectAdapter, BaseAdapter);
      SelectAdapter.prototype.current = function (callback) {
        var self = this;
        var data = Array.prototype.map.call(this.$element[0].querySelectorAll(':checked'), function (selectedElement) {
          return self.item($(selectedElement));
        });
        callback(data);
      };
      SelectAdapter.prototype.select = function (data) {
        var self = this;
        data.selected = true;

        // If data.element is a DOM node, use it instead
        if (data.element != null && data.element.tagName.toLowerCase() === 'option') {
          data.element.selected = true;
          this.$element.trigger('input').trigger('change');
          return;
        }
        if (this.$element.prop('multiple')) {
          this.current(function (currentData) {
            var val = [];
            data = [data];
            data.push.apply(data, currentData);
            for (var d = 0; d < data.length; d++) {
              var id = data[d].id;
              if (val.indexOf(id) === -1) {
                val.push(id);
              }
            }
            self.$element.val(val);
            self.$element.trigger('input').trigger('change');
          });
        } else {
          var val = data.id;
          this.$element.val(val);
          this.$element.trigger('input').trigger('change');
        }
      };
      SelectAdapter.prototype.unselect = function (data) {
        var self = this;
        if (!this.$element.prop('multiple')) {
          return;
        }
        data.selected = false;
        if (data.element != null && data.element.tagName.toLowerCase() === 'option') {
          data.element.selected = false;
          this.$element.trigger('input').trigger('change');
          return;
        }
        this.current(function (currentData) {
          var val = [];
          for (var d = 0; d < currentData.length; d++) {
            var id = currentData[d].id;
            if (id !== data.id && val.indexOf(id) === -1) {
              val.push(id);
            }
          }
          self.$element.val(val);
          self.$element.trigger('input').trigger('change');
        });
      };
      SelectAdapter.prototype.bind = function (container, $container) {
        var self = this;
        this.container = container;
        container.on('select', function (params) {
          self.select(params.data);
        });
        container.on('unselect', function (params) {
          self.unselect(params.data);
        });
      };
      SelectAdapter.prototype.destroy = function () {
        // Remove anything added to child elements
        this.$element.find('*').each(function () {
          // Remove any custom data set by Select2
          Utils.RemoveData(this);
        });
      };
      SelectAdapter.prototype.query = function (params, callback) {
        var data = [];
        var self = this;
        var $options = this.$element.children();
        $options.each(function () {
          if (this.tagName.toLowerCase() !== 'option' && this.tagName.toLowerCase() !== 'optgroup') {
            return;
          }
          var $option = $(this);
          var option = self.item($option);
          var matches = self.matches(params, option);
          if (matches !== null) {
            data.push(matches);
          }
        });
        callback({
          results: data
        });
      };
      SelectAdapter.prototype.addOptions = function ($options) {
        this.$element.append($options);
      };
      SelectAdapter.prototype.option = function (data) {
        var option;
        if (data.children) {
          option = document.createElement('optgroup');
          option.label = data.text;
        } else {
          option = document.createElement('option');
          if (option.textContent !== undefined) {
            option.textContent = data.text;
          } else {
            option.innerText = data.text;
          }
        }
        if (data.id !== undefined) {
          option.value = data.id;
        }
        if (data.disabled) {
          option.disabled = true;
        }
        if (data.selected) {
          option.selected = true;
        }
        if (data.title) {
          option.title = data.title;
        }
        var normalizedData = this._normalizeItem(data);
        normalizedData.element = option;

        // Override the option's data with the combined data
        Utils.StoreData(option, 'data', normalizedData);
        return $(option);
      };
      SelectAdapter.prototype.item = function ($option) {
        var data = {};
        data = Utils.GetData($option[0], 'data');
        if (data != null) {
          return data;
        }
        var option = $option[0];
        if (option.tagName.toLowerCase() === 'option') {
          data = {
            id: $option.val(),
            text: $option.text(),
            disabled: $option.prop('disabled'),
            selected: $option.prop('selected'),
            title: $option.prop('title')
          };
        } else if (option.tagName.toLowerCase() === 'optgroup') {
          data = {
            text: $option.prop('label'),
            children: [],
            title: $option.prop('title')
          };
          var $children = $option.children('option');
          var children = [];
          for (var c = 0; c < $children.length; c++) {
            var $child = $($children[c]);
            var child = this.item($child);
            children.push(child);
          }
          data.children = children;
        }
        data = this._normalizeItem(data);
        data.element = $option[0];
        Utils.StoreData($option[0], 'data', data);
        return data;
      };
      SelectAdapter.prototype._normalizeItem = function (item) {
        if (item !== Object(item)) {
          item = {
            id: item,
            text: item
          };
        }
        item = $.extend({}, {
          text: ''
        }, item);
        var defaults = {
          selected: false,
          disabled: false
        };
        if (item.id != null) {
          item.id = item.id.toString();
        }
        if (item.text != null) {
          item.text = item.text.toString();
        }
        if (item._resultId == null && item.id && this.container != null) {
          item._resultId = this.generateResultId(this.container, item);
        }
        return $.extend({}, defaults, item);
      };
      SelectAdapter.prototype.matches = function (params, data) {
        var matcher = this.options.get('matcher');
        return matcher(params, data);
      };
      return SelectAdapter;
    });
    S2.define('select2/data/array', ['./select', '../utils', 'jquery'], function (SelectAdapter, Utils, $) {
      function ArrayAdapter($element, options) {
        this._dataToConvert = options.get('data') || [];
        ArrayAdapter.__super__.constructor.call(this, $element, options);
      }
      Utils.Extend(ArrayAdapter, SelectAdapter);
      ArrayAdapter.prototype.bind = function (container, $container) {
        ArrayAdapter.__super__.bind.call(this, container, $container);
        this.addOptions(this.convertToOptions(this._dataToConvert));
      };
      ArrayAdapter.prototype.select = function (data) {
        var $option = this.$element.find('option').filter(function (i, elm) {
          return elm.value == data.id.toString();
        });
        if ($option.length === 0) {
          $option = this.option(data);
          this.addOptions($option);
        }
        ArrayAdapter.__super__.select.call(this, data);
      };
      ArrayAdapter.prototype.convertToOptions = function (data) {
        var self = this;
        var $existing = this.$element.find('option');
        var existingIds = $existing.map(function () {
          return self.item($(this)).id;
        }).get();
        var $options = [];

        // Filter out all items except for the one passed in the argument
        function onlyItem(item) {
          return function () {
            return $(this).val() == item.id;
          };
        }
        for (var d = 0; d < data.length; d++) {
          var item = this._normalizeItem(data[d]);

          // Skip items which were pre-loaded, only merge the data
          if (existingIds.indexOf(item.id) >= 0) {
            var $existingOption = $existing.filter(onlyItem(item));
            var existingData = this.item($existingOption);
            var newData = $.extend(true, {}, item, existingData);
            var $newOption = this.option(newData);
            $existingOption.replaceWith($newOption);
            continue;
          }
          var $option = this.option(item);
          if (item.children) {
            var $children = this.convertToOptions(item.children);
            $option.append($children);
          }
          $options.push($option);
        }
        return $options;
      };
      return ArrayAdapter;
    });
    S2.define('select2/data/ajax', ['./array', '../utils', 'jquery'], function (ArrayAdapter, Utils, $) {
      function AjaxAdapter($element, options) {
        this.ajaxOptions = this._applyDefaults(options.get('ajax'));
        if (this.ajaxOptions.processResults != null) {
          this.processResults = this.ajaxOptions.processResults;
        }
        AjaxAdapter.__super__.constructor.call(this, $element, options);
      }
      Utils.Extend(AjaxAdapter, ArrayAdapter);
      AjaxAdapter.prototype._applyDefaults = function (options) {
        var defaults = {
          data: function data(params) {
            return $.extend({}, params, {
              q: params.term
            });
          },
          transport: function transport(params, success, failure) {
            var $request = $.ajax(params);
            $request.then(success);
            $request.fail(failure);
            return $request;
          }
        };
        return $.extend({}, defaults, options, true);
      };
      AjaxAdapter.prototype.processResults = function (results) {
        return results;
      };
      AjaxAdapter.prototype.query = function (params, callback) {
        var matches = [];
        var self = this;
        if (this._request != null) {
          // JSONP requests cannot always be aborted
          if (typeof this._request.abort === 'function') {
            this._request.abort();
          }
          this._request = null;
        }
        var options = $.extend({
          type: 'GET'
        }, this.ajaxOptions);
        if (typeof options.url === 'function') {
          options.url = options.url.call(this.$element, params);
        }
        if (typeof options.data === 'function') {
          options.data = options.data.call(this.$element, params);
        }
        function request() {
          var $request = options.transport(options, function (data) {
            var results = self.processResults(data, params);
            if (self.options.get('debug') && window.console && console.error) {
              // Check to make sure that the response included a `results` key.
              if (!results || !results.results || !Array.isArray(results.results)) {
                console.error('Select2: The AJAX results did not return an array in the ' + '`results` key of the response.');
              }
            }
            callback(results);
          }, function () {
            // Attempt to detect if a request was aborted
            // Only works if the transport exposes a status property
            if ('status' in $request && ($request.status === 0 || $request.status === '0')) {
              return;
            }
            self.trigger('results:message', {
              message: 'errorLoading'
            });
          });
          self._request = $request;
        }
        if (this.ajaxOptions.delay && params.term != null) {
          if (this._queryTimeout) {
            window.clearTimeout(this._queryTimeout);
          }
          this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
        } else {
          request();
        }
      };
      return AjaxAdapter;
    });
    S2.define('select2/data/tags', ['jquery'], function ($) {
      function Tags(decorated, $element, options) {
        var tags = options.get('tags');
        var createTag = options.get('createTag');
        if (createTag !== undefined) {
          this.createTag = createTag;
        }
        var insertTag = options.get('insertTag');
        if (insertTag !== undefined) {
          this.insertTag = insertTag;
        }
        decorated.call(this, $element, options);
        if (Array.isArray(tags)) {
          for (var t = 0; t < tags.length; t++) {
            var tag = tags[t];
            var item = this._normalizeItem(tag);
            var $option = this.option(item);
            this.$element.append($option);
          }
        }
      }
      Tags.prototype.query = function (decorated, params, callback) {
        var self = this;
        this._removeOldTags();
        if (params.term == null || params.page != null) {
          decorated.call(this, params, callback);
          return;
        }
        function wrapper(obj, child) {
          var data = obj.results;
          for (var i = 0; i < data.length; i++) {
            var option = data[i];
            var checkChildren = option.children != null && !wrapper({
              results: option.children
            }, true);
            var optionText = (option.text || '').toUpperCase();
            var paramsTerm = (params.term || '').toUpperCase();
            var checkText = optionText === paramsTerm;
            if (checkText || checkChildren) {
              if (child) {
                return false;
              }
              obj.data = data;
              callback(obj);
              return;
            }
          }
          if (child) {
            return true;
          }
          var tag = self.createTag(params);
          if (tag != null) {
            var $option = self.option(tag);
            $option.attr('data-select2-tag', 'true');
            self.addOptions([$option]);
            self.insertTag(data, tag);
          }
          obj.results = data;
          callback(obj);
        }
        decorated.call(this, params, wrapper);
      };
      Tags.prototype.createTag = function (decorated, params) {
        if (params.term == null) {
          return null;
        }
        var term = params.term.trim();
        if (term === '') {
          return null;
        }
        return {
          id: term,
          text: term
        };
      };
      Tags.prototype.insertTag = function (_, data, tag) {
        data.unshift(tag);
      };
      Tags.prototype._removeOldTags = function (_) {
        var $options = this.$element.find('option[data-select2-tag]');
        $options.each(function () {
          if (this.selected) {
            return;
          }
          $(this).remove();
        });
      };
      return Tags;
    });
    S2.define('select2/data/tokenizer', ['jquery'], function ($) {
      function Tokenizer(decorated, $element, options) {
        var tokenizer = options.get('tokenizer');
        if (tokenizer !== undefined) {
          this.tokenizer = tokenizer;
        }
        decorated.call(this, $element, options);
      }
      Tokenizer.prototype.bind = function (decorated, container, $container) {
        decorated.call(this, container, $container);
        this.$search = container.dropdown.$search || container.selection.$search || $container.find('.select2-search__field');
      };
      Tokenizer.prototype.query = function (decorated, params, callback) {
        var self = this;
        function createAndSelect(data) {
          // Normalize the data object so we can use it for checks
          var item = self._normalizeItem(data);

          // Check if the data object already exists as a tag
          // Select it if it doesn't
          var $existingOptions = self.$element.find('option').filter(function () {
            return $(this).val() === item.id;
          });

          // If an existing option wasn't found for it, create the option
          if (!$existingOptions.length) {
            var $option = self.option(item);
            $option.attr('data-select2-tag', true);
            self._removeOldTags();
            self.addOptions([$option]);
          }

          // Select the item, now that we know there is an option for it
          select(item);
        }
        function select(data) {
          self.trigger('select', {
            data: data
          });
        }
        params.term = params.term || '';
        var tokenData = this.tokenizer(params, this.options, createAndSelect);
        if (tokenData.term !== params.term) {
          // Replace the search term if we have the search box
          if (this.$search.length) {
            this.$search.val(tokenData.term);
            this.$search.trigger('focus');
          }
          params.term = tokenData.term;
        }
        decorated.call(this, params, callback);
      };
      Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
        var separators = options.get('tokenSeparators') || [];
        var term = params.term;
        var i = 0;
        var createTag = this.createTag || function (params) {
          return {
            id: params.term,
            text: params.term
          };
        };
        while (i < term.length) {
          var termChar = term[i];
          if (separators.indexOf(termChar) === -1) {
            i++;
            continue;
          }
          var part = term.substr(0, i);
          var partParams = $.extend({}, params, {
            term: part
          });
          var data = createTag(partParams);
          if (data == null) {
            i++;
            continue;
          }
          callback(data);

          // Reset the term to not include the tokenized portion
          term = term.substr(i + 1) || '';
          i = 0;
        }
        return {
          term: term
        };
      };
      return Tokenizer;
    });
    S2.define('select2/data/minimumInputLength', [], function () {
      function MinimumInputLength(decorated, $e, options) {
        this.minimumInputLength = options.get('minimumInputLength');
        decorated.call(this, $e, options);
      }
      MinimumInputLength.prototype.query = function (decorated, params, callback) {
        params.term = params.term || '';
        if (params.term.length < this.minimumInputLength) {
          this.trigger('results:message', {
            message: 'inputTooShort',
            args: {
              minimum: this.minimumInputLength,
              input: params.term,
              params: params
            }
          });
          return;
        }
        decorated.call(this, params, callback);
      };
      return MinimumInputLength;
    });
    S2.define('select2/data/maximumInputLength', [], function () {
      function MaximumInputLength(decorated, $e, options) {
        this.maximumInputLength = options.get('maximumInputLength');
        decorated.call(this, $e, options);
      }
      MaximumInputLength.prototype.query = function (decorated, params, callback) {
        params.term = params.term || '';
        if (this.maximumInputLength > 0 && params.term.length > this.maximumInputLength) {
          this.trigger('results:message', {
            message: 'inputTooLong',
            args: {
              maximum: this.maximumInputLength,
              input: params.term,
              params: params
            }
          });
          return;
        }
        decorated.call(this, params, callback);
      };
      return MaximumInputLength;
    });
    S2.define('select2/data/maximumSelectionLength', [], function () {
      function MaximumSelectionLength(decorated, $e, options) {
        this.maximumSelectionLength = options.get('maximumSelectionLength');
        decorated.call(this, $e, options);
      }
      MaximumSelectionLength.prototype.bind = function (decorated, container, $container) {
        var self = this;
        decorated.call(this, container, $container);
        container.on('select', function () {
          self._checkIfMaximumSelected();
        });
      };
      MaximumSelectionLength.prototype.query = function (decorated, params, callback) {
        var self = this;
        this._checkIfMaximumSelected(function () {
          decorated.call(self, params, callback);
        });
      };
      MaximumSelectionLength.prototype._checkIfMaximumSelected = function (_, successCallback) {
        var self = this;
        this.current(function (currentData) {
          var count = currentData != null ? currentData.length : 0;
          if (self.maximumSelectionLength > 0 && count >= self.maximumSelectionLength) {
            self.trigger('results:message', {
              message: 'maximumSelected',
              args: {
                maximum: self.maximumSelectionLength
              }
            });
            return;
          }
          if (successCallback) {
            successCallback();
          }
        });
      };
      return MaximumSelectionLength;
    });
    S2.define('select2/dropdown', ['jquery', './utils'], function ($, Utils) {
      function Dropdown($element, options) {
        this.$element = $element;
        this.options = options;
        Dropdown.__super__.constructor.call(this);
      }
      Utils.Extend(Dropdown, Utils.Observable);
      Dropdown.prototype.render = function () {
        var $dropdown = $('<span class="select2-dropdown">' + '<span class="select2-results"></span>' + '</span>');
        $dropdown.attr('dir', this.options.get('dir'));
        this.$dropdown = $dropdown;
        return $dropdown;
      };
      Dropdown.prototype.bind = function () {
        // Should be implemented in subclasses
      };
      Dropdown.prototype.position = function ($dropdown, $container) {
        // Should be implemented in subclasses
      };
      Dropdown.prototype.destroy = function () {
        // Remove the dropdown from the DOM
        this.$dropdown.remove();
      };
      return Dropdown;
    });
    S2.define('select2/dropdown/search', ['jquery'], function ($) {
      function Search() {}
      Search.prototype.render = function (decorated) {
        var $rendered = decorated.call(this);
        var searchLabel = this.options.get('translations').get('search');
        var $search = $('<span class="select2-search select2-search--dropdown">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="searchbox" aria-autocomplete="list" />' + '</span>');
        this.$searchContainer = $search;
        this.$search = $search.find('input');
        this.$search.prop('autocomplete', this.options.get('autocomplete'));
        this.$search.attr('aria-label', searchLabel());
        $rendered.prepend($search);
        return $rendered;
      };
      Search.prototype.bind = function (decorated, container, $container) {
        var self = this;
        var resultsId = container.id + '-results';
        decorated.call(this, container, $container);
        this.$search.on('keydown', function (evt) {
          self.trigger('keypress', evt);
          self._keyUpPrevented = evt.isDefaultPrevented();
        });

        // Workaround for browsers which do not support the `input` event
        // This will prevent double-triggering of events for browsers which support
        // both the `keyup` and `input` events.
        this.$search.on('input', function (evt) {
          // Unbind the duplicated `keyup` event
          $(this).off('keyup');
        });
        this.$search.on('keyup input', function (evt) {
          self.handleSearch(evt);
        });
        container.on('open', function () {
          self.$search.attr('tabindex', 0);
          self.$search.attr('aria-controls', resultsId);
          self.$search.trigger('focus');
          window.setTimeout(function () {
            self.$search.trigger('focus');
          }, 0);
        });
        container.on('close', function () {
          self.$search.attr('tabindex', -1);
          self.$search.removeAttr('aria-controls');
          self.$search.removeAttr('aria-activedescendant');
          self.$search.val('');
          self.$search.trigger('blur');
        });
        container.on('focus', function () {
          if (!container.isOpen()) {
            self.$search.trigger('focus');
          }
        });
        container.on('results:all', function (params) {
          if (params.query.term == null || params.query.term === '') {
            var showSearch = self.showSearch(params);
            if (showSearch) {
              self.$searchContainer[0].classList.remove('select2-search--hide');
            } else {
              self.$searchContainer[0].classList.add('select2-search--hide');
            }
          }
        });
        container.on('results:focus', function (params) {
          if (params.data._resultId) {
            self.$search.attr('aria-activedescendant', params.data._resultId);
          } else {
            self.$search.removeAttr('aria-activedescendant');
          }
        });
      };
      Search.prototype.handleSearch = function (evt) {
        if (!this._keyUpPrevented) {
          var input = this.$search.val();
          this.trigger('query', {
            term: input
          });
        }
        this._keyUpPrevented = false;
      };
      Search.prototype.showSearch = function (_, params) {
        return true;
      };
      return Search;
    });
    S2.define('select2/dropdown/hidePlaceholder', [], function () {
      function HidePlaceholder(decorated, $element, options, dataAdapter) {
        this.placeholder = this.normalizePlaceholder(options.get('placeholder'));
        decorated.call(this, $element, options, dataAdapter);
      }
      HidePlaceholder.prototype.append = function (decorated, data) {
        data.results = this.removePlaceholder(data.results);
        decorated.call(this, data);
      };
      HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
        if (typeof placeholder === 'string') {
          placeholder = {
            id: '',
            text: placeholder
          };
        }
        return placeholder;
      };
      HidePlaceholder.prototype.removePlaceholder = function (_, data) {
        var modifiedData = data.slice(0);
        for (var d = data.length - 1; d >= 0; d--) {
          var item = data[d];
          if (this.placeholder.id === item.id) {
            modifiedData.splice(d, 1);
          }
        }
        return modifiedData;
      };
      return HidePlaceholder;
    });
    S2.define('select2/dropdown/infiniteScroll', ['jquery'], function ($) {
      function InfiniteScroll(decorated, $element, options, dataAdapter) {
        this.lastParams = {};
        decorated.call(this, $element, options, dataAdapter);
        this.$loadingMore = this.createLoadingMore();
        this.loading = false;
      }
      InfiniteScroll.prototype.append = function (decorated, data) {
        this.$loadingMore.remove();
        this.loading = false;
        decorated.call(this, data);
        if (this.showLoadingMore(data)) {
          this.$results.append(this.$loadingMore);
          this.loadMoreIfNeeded();
        }
      };
      InfiniteScroll.prototype.bind = function (decorated, container, $container) {
        var self = this;
        decorated.call(this, container, $container);
        container.on('query', function (params) {
          self.lastParams = params;
          self.loading = true;
        });
        container.on('query:append', function (params) {
          self.lastParams = params;
          self.loading = true;
        });
        this.$results.on('scroll', this.loadMoreIfNeeded.bind(this));
      };
      InfiniteScroll.prototype.loadMoreIfNeeded = function () {
        var isLoadMoreVisible = $.contains(document.documentElement, this.$loadingMore[0]);
        if (this.loading || !isLoadMoreVisible) {
          return;
        }
        var currentOffset = this.$results.offset().top + this.$results.outerHeight(false);
        var loadingMoreOffset = this.$loadingMore.offset().top + this.$loadingMore.outerHeight(false);
        if (currentOffset + 50 >= loadingMoreOffset) {
          this.loadMore();
        }
      };
      InfiniteScroll.prototype.loadMore = function () {
        this.loading = true;
        var params = $.extend({}, {
          page: 1
        }, this.lastParams);
        params.page++;
        this.trigger('query:append', params);
      };
      InfiniteScroll.prototype.showLoadingMore = function (_, data) {
        return data.pagination && data.pagination.more;
      };
      InfiniteScroll.prototype.createLoadingMore = function () {
        var $option = $('<li ' + 'class="select2-results__option select2-results__option--load-more"' + 'role="option" aria-disabled="true"></li>');
        var message = this.options.get('translations').get('loadingMore');
        $option.html(message(this.lastParams));
        return $option;
      };
      return InfiniteScroll;
    });
    S2.define('select2/dropdown/attachBody', ['jquery', '../utils'], function ($, Utils) {
      function AttachBody(decorated, $element, options) {
        this.$dropdownParent = $(options.get('dropdownParent') || document.body);
        decorated.call(this, $element, options);
      }
      AttachBody.prototype.bind = function (decorated, container, $container) {
        var self = this;
        decorated.call(this, container, $container);
        container.on('open', function () {
          self._showDropdown();
          self._attachPositioningHandler(container);

          // Must bind after the results handlers to ensure correct sizing
          self._bindContainerResultHandlers(container);
        });
        container.on('close', function () {
          self._hideDropdown();
          self._detachPositioningHandler(container);
        });
        this.$dropdownContainer.on('mousedown', function (evt) {
          evt.stopPropagation();
        });
      };
      AttachBody.prototype.destroy = function (decorated) {
        decorated.call(this);
        this.$dropdownContainer.remove();
      };
      AttachBody.prototype.position = function (decorated, $dropdown, $container) {
        // Clone all of the container classes
        $dropdown.attr('class', $container.attr('class'));
        $dropdown[0].classList.remove('select2');
        $dropdown[0].classList.add('select2-container--open');
        $dropdown.css({
          position: 'absolute',
          top: -999999
        });
        this.$container = $container;
      };
      AttachBody.prototype.render = function (decorated) {
        var $container = $('<span></span>');
        var $dropdown = decorated.call(this);
        $container.append($dropdown);
        this.$dropdownContainer = $container;
        return $container;
      };
      AttachBody.prototype._hideDropdown = function (decorated) {
        this.$dropdownContainer.detach();
      };
      AttachBody.prototype._bindContainerResultHandlers = function (decorated, container) {
        // These should only be bound once
        if (this._containerResultsHandlersBound) {
          return;
        }
        var self = this;
        container.on('results:all', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });
        container.on('results:append', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });
        container.on('results:message', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });
        container.on('select', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });
        container.on('unselect', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });
        this._containerResultsHandlersBound = true;
      };
      AttachBody.prototype._attachPositioningHandler = function (decorated, container) {
        var self = this;
        var scrollEvent = 'scroll.select2.' + container.id;
        var resizeEvent = 'resize.select2.' + container.id;
        var orientationEvent = 'orientationchange.select2.' + container.id;
        var $watchers = this.$container.parents().filter(Utils.hasScroll);
        $watchers.each(function () {
          Utils.StoreData(this, 'select2-scroll-position', {
            x: $(this).scrollLeft(),
            y: $(this).scrollTop()
          });
        });
        $watchers.on(scrollEvent, function (ev) {
          var position = Utils.GetData(this, 'select2-scroll-position');
          $(this).scrollTop(position.y);
        });
        $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent, function (e) {
          self._positionDropdown();
          self._resizeDropdown();
        });
      };
      AttachBody.prototype._detachPositioningHandler = function (decorated, container) {
        var scrollEvent = 'scroll.select2.' + container.id;
        var resizeEvent = 'resize.select2.' + container.id;
        var orientationEvent = 'orientationchange.select2.' + container.id;
        var $watchers = this.$container.parents().filter(Utils.hasScroll);
        $watchers.off(scrollEvent);
        $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
      };
      AttachBody.prototype._positionDropdown = function () {
        var $window = $(window);
        var isCurrentlyAbove = this.$dropdown[0].classList.contains('select2-dropdown--above');
        var isCurrentlyBelow = this.$dropdown[0].classList.contains('select2-dropdown--below');
        var newDirection = null;
        var offset = this.$container.offset();
        offset.bottom = offset.top + this.$container.outerHeight(false);
        var container = {
          height: this.$container.outerHeight(false)
        };
        container.top = offset.top;
        container.bottom = offset.top + container.height;
        var dropdown = {
          height: this.$dropdown.outerHeight(false)
        };
        var viewport = {
          top: $window.scrollTop(),
          bottom: $window.scrollTop() + $window.height()
        };
        var enoughRoomAbove = viewport.top < offset.top - dropdown.height;
        var enoughRoomBelow = viewport.bottom > offset.bottom + dropdown.height;
        var css = {
          left: offset.left,
          top: container.bottom
        };

        // Determine what the parent element is to use for calculating the offset
        var $offsetParent = this.$dropdownParent;

        // For statically positioned elements, we need to get the element
        // that is determining the offset
        if ($offsetParent.css('position') === 'static') {
          $offsetParent = $offsetParent.offsetParent();
        }
        var parentOffset = {
          top: 0,
          left: 0
        };
        if ($.contains(document.body, $offsetParent[0]) || $offsetParent[0].isConnected) {
          parentOffset = $offsetParent.offset();
        }
        css.top -= parentOffset.top;
        css.left -= parentOffset.left;
        if (!isCurrentlyAbove && !isCurrentlyBelow) {
          newDirection = 'below';
        }
        if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
          newDirection = 'above';
        } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
          newDirection = 'below';
        }
        if (newDirection == 'above' || isCurrentlyAbove && newDirection !== 'below') {
          css.top = container.top - parentOffset.top - dropdown.height;
        }
        if (newDirection != null) {
          this.$dropdown[0].classList.remove('select2-dropdown--below');
          this.$dropdown[0].classList.remove('select2-dropdown--above');
          this.$dropdown[0].classList.add('select2-dropdown--' + newDirection);
          this.$container[0].classList.remove('select2-container--below');
          this.$container[0].classList.remove('select2-container--above');
          this.$container[0].classList.add('select2-container--' + newDirection);
        }
        this.$dropdownContainer.css(css);
      };
      AttachBody.prototype._resizeDropdown = function () {
        var css = {
          width: this.$container.outerWidth(false) + 'px'
        };
        if (this.options.get('dropdownAutoWidth')) {
          css.minWidth = css.width;
          css.position = 'relative';
          css.width = 'auto';
        }
        this.$dropdown.css(css);
      };
      AttachBody.prototype._showDropdown = function (decorated) {
        this.$dropdownContainer.appendTo(this.$dropdownParent);
        this._positionDropdown();
        this._resizeDropdown();
      };
      return AttachBody;
    });
    S2.define('select2/dropdown/minimumResultsForSearch', [], function () {
      function countResults(data) {
        var count = 0;
        for (var d = 0; d < data.length; d++) {
          var item = data[d];
          if (item.children) {
            count += countResults(item.children);
          } else {
            count++;
          }
        }
        return count;
      }
      function MinimumResultsForSearch(decorated, $element, options, dataAdapter) {
        this.minimumResultsForSearch = options.get('minimumResultsForSearch');
        if (this.minimumResultsForSearch < 0) {
          this.minimumResultsForSearch = Infinity;
        }
        decorated.call(this, $element, options, dataAdapter);
      }
      MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
        if (countResults(params.data.results) < this.minimumResultsForSearch) {
          return false;
        }
        return decorated.call(this, params);
      };
      return MinimumResultsForSearch;
    });
    S2.define('select2/dropdown/selectOnClose', ['../utils'], function (Utils) {
      function SelectOnClose() {}
      SelectOnClose.prototype.bind = function (decorated, container, $container) {
        var self = this;
        decorated.call(this, container, $container);
        container.on('close', function (params) {
          self._handleSelectOnClose(params);
        });
      };
      SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
        if (params && params.originalSelect2Event != null) {
          var event = params.originalSelect2Event;

          // Don't select an item if the close event was triggered from a select or
          // unselect event
          if (event._type === 'select' || event._type === 'unselect') {
            return;
          }
        }
        var $highlightedResults = this.getHighlightedResults();

        // Only select highlighted results
        if ($highlightedResults.length < 1) {
          return;
        }
        var data = Utils.GetData($highlightedResults[0], 'data');

        // Don't re-select already selected resulte
        if (data.element != null && data.element.selected || data.element == null && data.selected) {
          return;
        }
        this.trigger('select', {
          data: data
        });
      };
      return SelectOnClose;
    });
    S2.define('select2/dropdown/closeOnSelect', [], function () {
      function CloseOnSelect() {}
      CloseOnSelect.prototype.bind = function (decorated, container, $container) {
        var self = this;
        decorated.call(this, container, $container);
        container.on('select', function (evt) {
          self._selectTriggered(evt);
        });
        container.on('unselect', function (evt) {
          self._selectTriggered(evt);
        });
      };
      CloseOnSelect.prototype._selectTriggered = function (_, evt) {
        var originalEvent = evt.originalEvent;

        // Don't close if the control key is being held
        if (originalEvent && (originalEvent.ctrlKey || originalEvent.metaKey)) {
          return;
        }
        this.trigger('close', {
          originalEvent: originalEvent,
          originalSelect2Event: evt
        });
      };
      return CloseOnSelect;
    });
    S2.define('select2/dropdown/dropdownCss', ['../utils'], function (Utils) {
      function DropdownCSS() {}
      DropdownCSS.prototype.render = function (decorated) {
        var $dropdown = decorated.call(this);
        var dropdownCssClass = this.options.get('dropdownCssClass') || '';
        if (dropdownCssClass.indexOf(':all:') !== -1) {
          dropdownCssClass = dropdownCssClass.replace(':all:', '');
          Utils.copyNonInternalCssClasses($dropdown[0], this.$element[0]);
        }
        $dropdown.addClass(dropdownCssClass);
        return $dropdown;
      };
      return DropdownCSS;
    });
    S2.define('select2/dropdown/tagsSearchHighlight', ['../utils'], function (Utils) {
      function TagsSearchHighlight() {}
      TagsSearchHighlight.prototype.highlightFirstItem = function (decorated) {
        var $options = this.$results.find('.select2-results__option--selectable' + ':not(.select2-results__option--selected)');
        if ($options.length > 0) {
          var $firstOption = $options.first();
          var data = Utils.GetData($firstOption[0], 'data');
          var firstElement = data.element;
          if (firstElement && firstElement.getAttribute) {
            if (firstElement.getAttribute('data-select2-tag') === 'true') {
              $firstOption.trigger('mouseenter');
              return;
            }
          }
        }
        decorated.call(this);
      };
      return TagsSearchHighlight;
    });
    S2.define('select2/i18n/en', [], function () {
      // English
      return {
        errorLoading: function errorLoading() {
          return 'The results could not be loaded.';
        },
        inputTooLong: function inputTooLong(args) {
          var overChars = args.input.length - args.maximum;
          var message = 'Please delete ' + overChars + ' character';
          if (overChars != 1) {
            message += 's';
          }
          return message;
        },
        inputTooShort: function inputTooShort(args) {
          var remainingChars = args.minimum - args.input.length;
          var message = 'Please enter ' + remainingChars + ' or more characters';
          return message;
        },
        loadingMore: function loadingMore() {
          return 'Loading more results…';
        },
        maximumSelected: function maximumSelected(args) {
          var message = 'You can only select ' + args.maximum + ' item';
          if (args.maximum != 1) {
            message += 's';
          }
          return message;
        },
        noResults: function noResults() {
          return 'No results found';
        },
        searching: function searching() {
          return 'Searching…';
        },
        removeAllItems: function removeAllItems() {
          return 'Remove all items';
        },
        removeItem: function removeItem() {
          return 'Remove item';
        },
        search: function search() {
          return 'Search';
        }
      };
    });
    S2.define('select2/defaults', ['jquery', './results', './selection/single', './selection/multiple', './selection/placeholder', './selection/allowClear', './selection/search', './selection/selectionCss', './selection/eventRelay', './utils', './translation', './diacritics', './data/select', './data/array', './data/ajax', './data/tags', './data/tokenizer', './data/minimumInputLength', './data/maximumInputLength', './data/maximumSelectionLength', './dropdown', './dropdown/search', './dropdown/hidePlaceholder', './dropdown/infiniteScroll', './dropdown/attachBody', './dropdown/minimumResultsForSearch', './dropdown/selectOnClose', './dropdown/closeOnSelect', './dropdown/dropdownCss', './dropdown/tagsSearchHighlight', './i18n/en'], function ($, ResultsList, SingleSelection, MultipleSelection, Placeholder, AllowClear, SelectionSearch, SelectionCSS, EventRelay, Utils, Translation, DIACRITICS, SelectData, ArrayData, AjaxData, Tags, Tokenizer, MinimumInputLength, MaximumInputLength, MaximumSelectionLength, Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll, AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect, DropdownCSS, TagsSearchHighlight, EnglishTranslation) {
      function Defaults() {
        this.reset();
      }
      Defaults.prototype.apply = function (options) {
        options = $.extend(true, {}, this.defaults, options);
        if (options.dataAdapter == null) {
          if (options.ajax != null) {
            options.dataAdapter = AjaxData;
          } else if (options.data != null) {
            options.dataAdapter = ArrayData;
          } else {
            options.dataAdapter = SelectData;
          }
          if (options.minimumInputLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MinimumInputLength);
          }
          if (options.maximumInputLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumInputLength);
          }
          if (options.maximumSelectionLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumSelectionLength);
          }
          if (options.tags) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
          }
          if (options.tokenSeparators != null || options.tokenizer != null) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, Tokenizer);
          }
        }
        if (options.resultsAdapter == null) {
          options.resultsAdapter = ResultsList;
          if (options.ajax != null) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, InfiniteScroll);
          }
          if (options.placeholder != null) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, HidePlaceholder);
          }
          if (options.selectOnClose) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, SelectOnClose);
          }
          if (options.tags) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, TagsSearchHighlight);
          }
        }
        if (options.dropdownAdapter == null) {
          if (options.multiple) {
            options.dropdownAdapter = Dropdown;
          } else {
            var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);
            options.dropdownAdapter = SearchableDropdown;
          }
          if (options.minimumResultsForSearch !== 0) {
            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, MinimumResultsForSearch);
          }
          if (options.closeOnSelect) {
            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, CloseOnSelect);
          }
          if (options.dropdownCssClass != null) {
            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, DropdownCSS);
          }
          options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, AttachBody);
        }
        if (options.selectionAdapter == null) {
          if (options.multiple) {
            options.selectionAdapter = MultipleSelection;
          } else {
            options.selectionAdapter = SingleSelection;
          }

          // Add the placeholder mixin if a placeholder was specified
          if (options.placeholder != null) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, Placeholder);
          }
          if (options.allowClear) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, AllowClear);
          }
          if (options.multiple) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, SelectionSearch);
          }
          if (options.selectionCssClass != null) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, SelectionCSS);
          }
          options.selectionAdapter = Utils.Decorate(options.selectionAdapter, EventRelay);
        }

        // If the defaults were not previously applied from an element, it is
        // possible for the language option to have not been resolved
        options.language = this._resolveLanguage(options.language);

        // Always fall back to English since it will always be complete
        options.language.push('en');
        var uniqueLanguages = [];
        for (var l = 0; l < options.language.length; l++) {
          var language = options.language[l];
          if (uniqueLanguages.indexOf(language) === -1) {
            uniqueLanguages.push(language);
          }
        }
        options.language = uniqueLanguages;
        options.translations = this._processTranslations(options.language, options.debug);
        return options;
      };
      Defaults.prototype.reset = function () {
        function stripDiacritics(text) {
          // Used 'uni range + named function' from http://jsperf.com/diacritics/18
          function match(a) {
            return DIACRITICS[a] || a;
          }
          return text.replace(/[^\u0000-\u007E]/g, match);
        }
        function matcher(params, data) {
          // Always return the object if there is nothing to compare
          if (params.term == null || params.term.trim() === '') {
            return data;
          }

          // Do a recursive check for options with children
          if (data.children && data.children.length > 0) {
            // Clone the data object if there are children
            // This is required as we modify the object to remove any non-matches
            var match = $.extend(true, {}, data);

            // Check each child of the option
            for (var c = data.children.length - 1; c >= 0; c--) {
              var child = data.children[c];
              var matches = matcher(params, child);

              // If there wasn't a match, remove the object in the array
              if (matches == null) {
                match.children.splice(c, 1);
              }
            }

            // If any children matched, return the new object
            if (match.children.length > 0) {
              return match;
            }

            // If there were no matching children, check just the plain object
            return matcher(params, match);
          }
          var original = stripDiacritics(data.text).toUpperCase();
          var term = stripDiacritics(params.term).toUpperCase();

          // Check if the text contains the term
          if (original.indexOf(term) > -1) {
            return data;
          }

          // If it doesn't contain the term, don't return anything
          return null;
        }
        this.defaults = {
          amdLanguageBase: './i18n/',
          autocomplete: 'off',
          closeOnSelect: true,
          debug: false,
          dropdownAutoWidth: false,
          escapeMarkup: Utils.escapeMarkup,
          language: {},
          matcher: matcher,
          minimumInputLength: 0,
          maximumInputLength: 0,
          maximumSelectionLength: 0,
          minimumResultsForSearch: 0,
          selectOnClose: false,
          scrollAfterSelect: false,
          sorter: function sorter(data) {
            return data;
          },
          templateResult: function templateResult(result) {
            return result.text;
          },
          templateSelection: function templateSelection(selection) {
            return selection.text;
          },
          theme: 'default',
          width: 'resolve'
        };
      };
      Defaults.prototype.applyFromElement = function (options, $element) {
        var optionLanguage = options.language;
        var defaultLanguage = this.defaults.language;
        var elementLanguage = $element.prop('lang');
        var parentLanguage = $element.closest('[lang]').prop('lang');
        var languages = Array.prototype.concat.call(this._resolveLanguage(elementLanguage), this._resolveLanguage(optionLanguage), this._resolveLanguage(defaultLanguage), this._resolveLanguage(parentLanguage));
        options.language = languages;
        return options;
      };
      Defaults.prototype._resolveLanguage = function (language) {
        if (!language) {
          return [];
        }
        if ($.isEmptyObject(language)) {
          return [];
        }
        if ($.isPlainObject(language)) {
          return [language];
        }
        var languages;
        if (!Array.isArray(language)) {
          languages = [language];
        } else {
          languages = language;
        }
        var resolvedLanguages = [];
        for (var l = 0; l < languages.length; l++) {
          resolvedLanguages.push(languages[l]);
          if (typeof languages[l] === 'string' && languages[l].indexOf('-') > 0) {
            // Extract the region information if it is included
            var languageParts = languages[l].split('-');
            var baseLanguage = languageParts[0];
            resolvedLanguages.push(baseLanguage);
          }
        }
        return resolvedLanguages;
      };
      Defaults.prototype._processTranslations = function (languages, debug) {
        var translations = new Translation();
        for (var l = 0; l < languages.length; l++) {
          var languageData = new Translation();
          var language = languages[l];
          if (typeof language === 'string') {
            try {
              // Try to load it with the original name
              languageData = Translation.loadPath(language);
            } catch (e) {
              try {
                // If we couldn't load it, check if it wasn't the full path
                language = this.defaults.amdLanguageBase + language;
                languageData = Translation.loadPath(language);
              } catch (ex) {
                // The translation could not be loaded at all. Sometimes this is
                // because of a configuration problem, other times this can be
                // because of how Select2 helps load all possible translation files
                if (debug && window.console && console.warn) {
                  console.warn('Select2: The language file for "' + language + '" could ' + 'not be automatically loaded. A fallback will be used instead.');
                }
              }
            }
          } else if ($.isPlainObject(language)) {
            languageData = new Translation(language);
          } else {
            languageData = language;
          }
          translations.extend(languageData);
        }
        return translations;
      };
      Defaults.prototype.set = function (key, value) {
        var camelKey = $.camelCase(key);
        var data = {};
        data[camelKey] = value;
        var convertedData = Utils._convertData(data);
        $.extend(true, this.defaults, convertedData);
      };
      var defaults = new Defaults();
      return defaults;
    });
    S2.define('select2/options', ['jquery', './defaults', './utils'], function ($, Defaults, Utils) {
      function Options(options, $element) {
        this.options = options;
        if ($element != null) {
          this.fromElement($element);
        }
        if ($element != null) {
          this.options = Defaults.applyFromElement(this.options, $element);
        }
        this.options = Defaults.apply(this.options);
      }
      Options.prototype.fromElement = function ($e) {
        var excludedData = ['select2'];
        if (this.options.multiple == null) {
          this.options.multiple = $e.prop('multiple');
        }
        if (this.options.disabled == null) {
          this.options.disabled = $e.prop('disabled');
        }
        if (this.options.autocomplete == null && $e.prop('autocomplete')) {
          this.options.autocomplete = $e.prop('autocomplete');
        }
        if (this.options.dir == null) {
          if ($e.prop('dir')) {
            this.options.dir = $e.prop('dir');
          } else if ($e.closest('[dir]').prop('dir')) {
            this.options.dir = $e.closest('[dir]').prop('dir');
          } else {
            this.options.dir = 'ltr';
          }
        }
        $e.prop('disabled', this.options.disabled);
        $e.prop('multiple', this.options.multiple);
        if (Utils.GetData($e[0], 'select2Tags')) {
          if (this.options.debug && window.console && console.warn) {
            console.warn('Select2: The `data-select2-tags` attribute has been changed to ' + 'use the `data-data` and `data-tags="true"` attributes and will be ' + 'removed in future versions of Select2.');
          }
          Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
          Utils.StoreData($e[0], 'tags', true);
        }
        if (Utils.GetData($e[0], 'ajaxUrl')) {
          if (this.options.debug && window.console && console.warn) {
            console.warn('Select2: The `data-ajax-url` attribute has been changed to ' + '`data-ajax--url` and support for the old attribute will be removed' + ' in future versions of Select2.');
          }
          $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
          Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));
        }
        var dataset = {};
        function upperCaseLetter(_, letter) {
          return letter.toUpperCase();
        }

        // Pre-load all of the attributes which are prefixed with `data-`
        for (var attr = 0; attr < $e[0].attributes.length; attr++) {
          var attributeName = $e[0].attributes[attr].name;
          var prefix = 'data-';
          if (attributeName.substr(0, prefix.length) == prefix) {
            // Get the contents of the attribute after `data-`
            var dataName = attributeName.substring(prefix.length);

            // Get the data contents from the consistent source
            // This is more than likely the jQuery data helper
            var dataValue = Utils.GetData($e[0], dataName);

            // camelCase the attribute name to match the spec
            var camelDataName = dataName.replace(/-([a-z])/g, upperCaseLetter);

            // Store the data attribute contents into the dataset since
            dataset[camelDataName] = dataValue;
          }
        }

        // Prefer the element's `dataset` attribute if it exists
        // jQuery 1.x does not correctly handle data attributes with multiple dashes
        if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
          dataset = $.extend(true, {}, $e[0].dataset, dataset);
        }

        // Prefer our internal data cache if it exists
        var data = $.extend(true, {}, Utils.GetData($e[0]), dataset);
        data = Utils._convertData(data);
        for (var key in data) {
          if (excludedData.indexOf(key) > -1) {
            continue;
          }
          if ($.isPlainObject(this.options[key])) {
            $.extend(this.options[key], data[key]);
          } else {
            this.options[key] = data[key];
          }
        }
        return this;
      };
      Options.prototype.get = function (key) {
        return this.options[key];
      };
      Options.prototype.set = function (key, val) {
        this.options[key] = val;
      };
      return Options;
    });
    S2.define('select2/core', ['jquery', './options', './utils', './keys'], function ($, Options, Utils, KEYS) {
      var Select2 = function Select2($element, options) {
        if (Utils.GetData($element[0], 'select2') != null) {
          Utils.GetData($element[0], 'select2').destroy();
        }
        this.$element = $element;
        this.id = this._generateId($element);
        options = options || {};
        this.options = new Options(options, $element);
        Select2.__super__.constructor.call(this);

        // Set up the tabindex

        var tabindex = $element.attr('tabindex') || 0;
        Utils.StoreData($element[0], 'old-tabindex', tabindex);
        $element.attr('tabindex', '-1');

        // Set up containers and adapters

        var DataAdapter = this.options.get('dataAdapter');
        this.dataAdapter = new DataAdapter($element, this.options);
        var $container = this.render();
        this._placeContainer($container);
        var SelectionAdapter = this.options.get('selectionAdapter');
        this.selection = new SelectionAdapter($element, this.options);
        this.$selection = this.selection.render();
        this.selection.position(this.$selection, $container);
        var DropdownAdapter = this.options.get('dropdownAdapter');
        this.dropdown = new DropdownAdapter($element, this.options);
        this.$dropdown = this.dropdown.render();
        this.dropdown.position(this.$dropdown, $container);
        var ResultsAdapter = this.options.get('resultsAdapter');
        this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
        this.$results = this.results.render();
        this.results.position(this.$results, this.$dropdown);

        // Bind events

        var self = this;

        // Bind the container to all of the adapters
        this._bindAdapters();

        // Register any DOM event handlers
        this._registerDomEvents();

        // Register any internal event handlers
        this._registerDataEvents();
        this._registerSelectionEvents();
        this._registerDropdownEvents();
        this._registerResultsEvents();
        this._registerEvents();

        // Set the initial state
        this.dataAdapter.current(function (initialData) {
          self.trigger('selection:update', {
            data: initialData
          });
        });

        // Hide the original select
        $element[0].classList.add('select2-hidden-accessible');
        $element.attr('aria-hidden', 'true');

        // Synchronize any monitored attributes
        this._syncAttributes();
        Utils.StoreData($element[0], 'select2', this);

        // Ensure backwards compatibility with $element.data('select2').
        $element.data('select2', this);
      };
      Utils.Extend(Select2, Utils.Observable);
      Select2.prototype._generateId = function ($element) {
        var id = '';
        if ($element.attr('id') != null) {
          id = $element.attr('id');
        } else if ($element.attr('name') != null) {
          id = $element.attr('name') + '-' + Utils.generateChars(2);
        } else {
          id = Utils.generateChars(4);
        }
        id = id.replace(/(:|\.|\[|\]|,)/g, '');
        id = 'select2-' + id;
        return id;
      };
      Select2.prototype._placeContainer = function ($container) {
        $container.insertAfter(this.$element);
        var width = this._resolveWidth(this.$element, this.options.get('width'));
        if (width != null) {
          $container.css('width', width);
        }
      };
      Select2.prototype._resolveWidth = function ($element, method) {
        var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
        if (method == 'resolve') {
          var styleWidth = this._resolveWidth($element, 'style');
          if (styleWidth != null) {
            return styleWidth;
          }
          return this._resolveWidth($element, 'element');
        }
        if (method == 'element') {
          var elementWidth = $element.outerWidth(false);
          if (elementWidth <= 0) {
            return 'auto';
          }
          return elementWidth + 'px';
        }
        if (method == 'style') {
          var style = $element.attr('style');
          if (typeof style !== 'string') {
            return null;
          }
          var attrs = style.split(';');
          for (var i = 0, l = attrs.length; i < l; i = i + 1) {
            var attr = attrs[i].replace(/\s/g, '');
            var matches = attr.match(WIDTH);
            if (matches !== null && matches.length >= 1) {
              return matches[1];
            }
          }
          return null;
        }
        if (method == 'computedstyle') {
          var computedStyle = window.getComputedStyle($element[0]);
          return computedStyle.width;
        }
        return method;
      };
      Select2.prototype._bindAdapters = function () {
        this.dataAdapter.bind(this, this.$container);
        this.selection.bind(this, this.$container);
        this.dropdown.bind(this, this.$container);
        this.results.bind(this, this.$container);
      };
      Select2.prototype._registerDomEvents = function () {
        var self = this;
        this.$element.on('change.select2', function () {
          self.dataAdapter.current(function (data) {
            self.trigger('selection:update', {
              data: data
            });
          });
        });
        this.$element.on('focus.select2', function (evt) {
          self.trigger('focus', evt);
        });
        this._syncA = Utils.bind(this._syncAttributes, this);
        this._syncS = Utils.bind(this._syncSubtree, this);
        this._observer = new window.MutationObserver(function (mutations) {
          self._syncA();
          self._syncS(mutations);
        });
        this._observer.observe(this.$element[0], {
          attributes: true,
          childList: true,
          subtree: false
        });
      };
      Select2.prototype._registerDataEvents = function () {
        var self = this;
        this.dataAdapter.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };
      Select2.prototype._registerSelectionEvents = function () {
        var self = this;
        var nonRelayEvents = ['toggle', 'focus'];
        this.selection.on('toggle', function () {
          self.toggleDropdown();
        });
        this.selection.on('focus', function (params) {
          self.focus(params);
        });
        this.selection.on('*', function (name, params) {
          if (nonRelayEvents.indexOf(name) !== -1) {
            return;
          }
          self.trigger(name, params);
        });
      };
      Select2.prototype._registerDropdownEvents = function () {
        var self = this;
        this.dropdown.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };
      Select2.prototype._registerResultsEvents = function () {
        var self = this;
        this.results.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };
      Select2.prototype._registerEvents = function () {
        var self = this;
        this.on('open', function () {
          self.$container[0].classList.add('select2-container--open');
        });
        this.on('close', function () {
          self.$container[0].classList.remove('select2-container--open');
        });
        this.on('enable', function () {
          self.$container[0].classList.remove('select2-container--disabled');
        });
        this.on('disable', function () {
          self.$container[0].classList.add('select2-container--disabled');
        });
        this.on('blur', function () {
          self.$container[0].classList.remove('select2-container--focus');
        });
        this.on('query', function (params) {
          if (!self.isOpen()) {
            self.trigger('open', {});
          }
          this.dataAdapter.query(params, function (data) {
            self.trigger('results:all', {
              data: data,
              query: params
            });
          });
        });
        this.on('query:append', function (params) {
          this.dataAdapter.query(params, function (data) {
            self.trigger('results:append', {
              data: data,
              query: params
            });
          });
        });
        this.on('keypress', function (evt) {
          var key = evt.which;
          if (self.isOpen()) {
            if (key === KEYS.ESC || key === KEYS.UP && evt.altKey) {
              self.close(evt);
              evt.preventDefault();
            } else if (key === KEYS.ENTER || key === KEYS.TAB) {
              self.trigger('results:select', {});
              evt.preventDefault();
            } else if (key === KEYS.SPACE && evt.ctrlKey) {
              self.trigger('results:toggle', {});
              evt.preventDefault();
            } else if (key === KEYS.UP) {
              self.trigger('results:previous', {});
              evt.preventDefault();
            } else if (key === KEYS.DOWN) {
              self.trigger('results:next', {});
              evt.preventDefault();
            }
          } else {
            if (key === KEYS.ENTER || key === KEYS.SPACE || key === KEYS.DOWN && evt.altKey) {
              self.open();
              evt.preventDefault();
            }
          }
        });
      };
      Select2.prototype._syncAttributes = function () {
        this.options.set('disabled', this.$element.prop('disabled'));
        if (this.isDisabled()) {
          if (this.isOpen()) {
            this.close();
          }
          this.trigger('disable', {});
        } else {
          this.trigger('enable', {});
        }
      };
      Select2.prototype._isChangeMutation = function (mutations) {
        var self = this;
        if (mutations.addedNodes && mutations.addedNodes.length > 0) {
          for (var n = 0; n < mutations.addedNodes.length; n++) {
            var node = mutations.addedNodes[n];
            if (node.selected) {
              return true;
            }
          }
        } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
          return true;
        } else if (Array.isArray(mutations)) {
          return mutations.some(function (mutation) {
            return self._isChangeMutation(mutation);
          });
        }
        return false;
      };
      Select2.prototype._syncSubtree = function (mutations) {
        var changed = this._isChangeMutation(mutations);
        var self = this;

        // Only re-pull the data if we think there is a change
        if (changed) {
          this.dataAdapter.current(function (currentData) {
            self.trigger('selection:update', {
              data: currentData
            });
          });
        }
      };

      /**
       * Override the trigger method to automatically trigger pre-events when
       * there are events that can be prevented.
       */
      Select2.prototype.trigger = function (name, args) {
        var actualTrigger = Select2.__super__.trigger;
        var preTriggerMap = {
          'open': 'opening',
          'close': 'closing',
          'select': 'selecting',
          'unselect': 'unselecting',
          'clear': 'clearing'
        };
        if (args === undefined) {
          args = {};
        }
        if (name in preTriggerMap) {
          var preTriggerName = preTriggerMap[name];
          var preTriggerArgs = {
            prevented: false,
            name: name,
            args: args
          };
          actualTrigger.call(this, preTriggerName, preTriggerArgs);
          if (preTriggerArgs.prevented) {
            args.prevented = true;
            return;
          }
        }
        actualTrigger.call(this, name, args);
      };
      Select2.prototype.toggleDropdown = function () {
        if (this.isDisabled()) {
          return;
        }
        if (this.isOpen()) {
          this.close();
        } else {
          this.open();
        }
      };
      Select2.prototype.open = function () {
        if (this.isOpen()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        this.trigger('query', {});
      };
      Select2.prototype.close = function (evt) {
        if (!this.isOpen()) {
          return;
        }
        this.trigger('close', {
          originalEvent: evt
        });
      };

      /**
       * Helper method to abstract the "enabled" (not "disabled") state of this
       * object.
       *
       * @return {true} if the instance is not disabled.
       * @return {false} if the instance is disabled.
       */
      Select2.prototype.isEnabled = function () {
        return !this.isDisabled();
      };

      /**
       * Helper method to abstract the "disabled" state of this object.
       *
       * @return {true} if the disabled option is true.
       * @return {false} if the disabled option is false.
       */
      Select2.prototype.isDisabled = function () {
        return this.options.get('disabled');
      };
      Select2.prototype.isOpen = function () {
        return this.$container[0].classList.contains('select2-container--open');
      };
      Select2.prototype.hasFocus = function () {
        return this.$container[0].classList.contains('select2-container--focus');
      };
      Select2.prototype.focus = function (data) {
        // No need to re-trigger focus events if we are already focused
        if (this.hasFocus()) {
          return;
        }
        this.$container[0].classList.add('select2-container--focus');
        this.trigger('focus', {});
      };
      Select2.prototype.enable = function (args) {
        if (this.options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `select2("enable")` method has been deprecated and will' + ' be removed in later Select2 versions. Use $element.prop("disabled")' + ' instead.');
        }
        if (args == null || args.length === 0) {
          args = [true];
        }
        var disabled = !args[0];
        this.$element.prop('disabled', disabled);
      };
      Select2.prototype.data = function () {
        if (this.options.get('debug') && arguments.length > 0 && window.console && console.warn) {
          console.warn('Select2: Data can no longer be set using `select2("data")`. You ' + 'should consider setting the value instead using `$element.val()`.');
        }
        var data = [];
        this.dataAdapter.current(function (currentData) {
          data = currentData;
        });
        return data;
      };
      Select2.prototype.val = function (args) {
        if (this.options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `select2("val")` method has been deprecated and will be' + ' removed in later Select2 versions. Use $element.val() instead.');
        }
        if (args == null || args.length === 0) {
          return this.$element.val();
        }
        var newVal = args[0];
        if (Array.isArray(newVal)) {
          newVal = newVal.map(function (obj) {
            return obj.toString();
          });
        }
        this.$element.val(newVal).trigger('input').trigger('change');
      };
      Select2.prototype.destroy = function () {
        Utils.RemoveData(this.$container[0]);
        this.$container.remove();
        this._observer.disconnect();
        this._observer = null;
        this._syncA = null;
        this._syncS = null;
        this.$element.off('.select2');
        this.$element.attr('tabindex', Utils.GetData(this.$element[0], 'old-tabindex'));
        this.$element[0].classList.remove('select2-hidden-accessible');
        this.$element.attr('aria-hidden', 'false');
        Utils.RemoveData(this.$element[0]);
        this.$element.removeData('select2');
        this.dataAdapter.destroy();
        this.selection.destroy();
        this.dropdown.destroy();
        this.results.destroy();
        this.dataAdapter = null;
        this.selection = null;
        this.dropdown = null;
        this.results = null;
      };
      Select2.prototype.render = function () {
        var $container = $('<span class="select2 select2-container">' + '<span class="selection"></span>' + '<span class="dropdown-wrapper" aria-hidden="true"></span>' + '</span>');
        $container.attr('dir', this.options.get('dir'));
        this.$container = $container;
        this.$container[0].classList.add('select2-container--' + this.options.get('theme'));
        Utils.StoreData($container[0], 'element', this.$element);
        return $container;
      };
      return Select2;
    });
    S2.define('select2/dropdown/attachContainer', [], function () {
      function AttachContainer(decorated, $element, options) {
        decorated.call(this, $element, options);
      }
      AttachContainer.prototype.position = function (decorated, $dropdown, $container) {
        var $dropdownContainer = $container.find('.dropdown-wrapper');
        $dropdownContainer.append($dropdown);
        $dropdown[0].classList.add('select2-dropdown--below');
        $container[0].classList.add('select2-container--below');
      };
      return AttachContainer;
    });
    S2.define('select2/dropdown/stopPropagation', [], function () {
      function StopPropagation() {}
      StopPropagation.prototype.bind = function (decorated, container, $container) {
        decorated.call(this, container, $container);
        var stoppedEvents = ['blur', 'change', 'click', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup', 'search', 'touchend', 'touchstart'];
        this.$dropdown.on(stoppedEvents.join(' '), function (evt) {
          evt.stopPropagation();
        });
      };
      return StopPropagation;
    });
    S2.define('select2/selection/stopPropagation', [], function () {
      function StopPropagation() {}
      StopPropagation.prototype.bind = function (decorated, container, $container) {
        decorated.call(this, container, $container);
        var stoppedEvents = ['blur', 'change', 'click', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup', 'search', 'touchend', 'touchstart'];
        this.$selection.on(stoppedEvents.join(' '), function (evt) {
          evt.stopPropagation();
        });
      };
      return StopPropagation;
    });

    /*!
     * jQuery Mousewheel 3.1.13
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     */

    (function (factory) {
      if (typeof S2.define === 'function' && S2.define.amd) {
        // AMD. Register as an anonymous module.
        S2.define('jquery-mousewheel', ['jquery'], factory);
      } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
      } else {
        // Browser globals
        factory(jQuery);
      }
    })(function ($) {
      var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice = Array.prototype.slice,
        nullLowestDeltaTimeout,
        lowestDelta;
      if ($.event.fixHooks) {
        for (var i = toFix.length; i;) {
          $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
      }
      var special = $.event.special.mousewheel = {
        version: '3.1.12',
        setup: function setup() {
          if (this.addEventListener) {
            for (var i = toBind.length; i;) {
              this.addEventListener(toBind[--i], handler, false);
            }
          } else {
            this.onmousewheel = handler;
          }
          // Store the line height and page height for this particular element
          $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
          $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },
        teardown: function teardown() {
          if (this.removeEventListener) {
            for (var i = toBind.length; i;) {
              this.removeEventListener(toBind[--i], handler, false);
            }
          } else {
            this.onmousewheel = null;
          }
          // Clean up the data we added to the element
          $.removeData(this, 'mousewheel-line-height');
          $.removeData(this, 'mousewheel-page-height');
        },
        getLineHeight: function getLineHeight(elem) {
          var $elem = $(elem),
            $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
          if (!$parent.length) {
            $parent = $('body');
          }
          return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },
        getPageHeight: function getPageHeight(elem) {
          return $(elem).height();
        },
        settings: {
          adjustOldDeltas: true,
          // see shouldAdjustOldDeltas() below
          normalizeOffset: true // calls getBoundingClientRect for each event
        }
      };

      $.fn.extend({
        mousewheel: function mousewheel(fn) {
          return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },
        unmousewheel: function unmousewheel(fn) {
          return this.unbind('mousewheel', fn);
        }
      });
      function handler(event) {
        var orgEvent = event || window.event,
          args = slice.call(arguments, 1),
          delta = 0,
          deltaX = 0,
          deltaY = 0,
          absDelta = 0,
          offsetX = 0,
          offsetY = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ('detail' in orgEvent) {
          deltaY = orgEvent.detail * -1;
        }
        if ('wheelDelta' in orgEvent) {
          deltaY = orgEvent.wheelDelta;
        }
        if ('wheelDeltaY' in orgEvent) {
          deltaY = orgEvent.wheelDeltaY;
        }
        if ('wheelDeltaX' in orgEvent) {
          deltaX = orgEvent.wheelDeltaX * -1;
        }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
          deltaX = deltaY * -1;
          deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ('deltaY' in orgEvent) {
          deltaY = orgEvent.deltaY * -1;
          delta = deltaY;
        }
        if ('deltaX' in orgEvent) {
          deltaX = orgEvent.deltaX;
          if (deltaY === 0) {
            delta = deltaX * -1;
          }
        }

        // No change actually happened, no reason to go any further
        if (deltaY === 0 && deltaX === 0) {
          return;
        }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if (orgEvent.deltaMode === 1) {
          var lineHeight = $.data(this, 'mousewheel-line-height');
          delta *= lineHeight;
          deltaY *= lineHeight;
          deltaX *= lineHeight;
        } else if (orgEvent.deltaMode === 2) {
          var pageHeight = $.data(this, 'mousewheel-page-height');
          delta *= pageHeight;
          deltaY *= pageHeight;
          deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if (!lowestDelta || absDelta < lowestDelta) {
          lowestDelta = absDelta;

          // Adjust older deltas if necessary
          if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
            lowestDelta /= 40;
          }
        }

        // Adjust older deltas if necessary
        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
          // Divide all the things by 40!
          delta /= 40;
          deltaX /= 40;
          deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if (special.settings.normalizeOffset && this.getBoundingClientRect) {
          var boundingRect = this.getBoundingClientRect();
          offsetX = event.clientX - boundingRect.left;
          offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) {
          clearTimeout(nullLowestDeltaTimeout);
        }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);
        return ($.event.dispatch || $.event.handle).apply(this, args);
      }
      function nullLowestDelta() {
        lowestDelta = null;
      }
      function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
      }
    });

    //HUI-SELECT2
    /**
     * Rebranding select2 to HUIselect2
     * It does avoid conflicts with other(s) that include select2 manually
     */
    S2.define('hui.select2', ['jquery', 'jquery-mousewheel', './select2/core', './select2/defaults', './select2/utils'], function ($, _, Select2, Defaults, Utils) {
      if ($.fn.HUIselect2 == null) {
        // All methods that should return the element
        var thisMethods = ['open', 'close', 'destroy'];
        $.fn.HUIselect2 = function (options) {
          options = options || {};
          if (_typeof(options) === 'object') {
            this.each(function () {
              var instanceOptions = $.extend(true, {}, options);
              var instance = new Select2($(this), instanceOptions);
            });
            return this;
          } else if (typeof options === 'string') {
            var ret;
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
              var instance = Utils.GetData(this, 'select2');
              if (instance == null && window.console && console.error) {
                console.error('The HUISelect2(\'' + options + '\') method was called on an ' + 'element that is not using Select2.');
              }
              ret = instance[options].apply(instance, args);
            });

            // Check if we should be returning `this`
            if (thisMethods.indexOf(options) > -1) {
              return this;
            }
            return ret;
          } else {
            throw new Error('Invalid arguments for HUISelect2: ' + options);
          }
        };
      }
      if ($.fn.HUIselect2.defaults == null) {
        $.fn.HUIselect2.defaults = Defaults;
      }
      return Select2;
    });

    // Return the AMD loader configuration so it can be used outside of this file
    return {
      define: S2.define,
      require: S2.require
    };
  }();

  // // Autoload the jQuery bindings
  // // We know that all of the modules exist above this, so we're safe
  // var select2 = S2.require('jquery.select2');

  // // Hold the AMD module references on the jQuery function that was just loaded
  // // This allows Select2 to use the internal loader outside of this file, such
  // // as in the language files.
  // jQuery.fn.select2.amd = S2;

  // // Return the Select2 instance for anyone who is importing it.
  // return select2;

  // HUI-SELECT2
  var select2 = S2.require('hui.select2');
  return select2;
});
(function ($) {
  // Enable strict mode
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.select2 = function () {
    $('.hustle-ui').each(function () {
      var container = $(this);
      var moduleId = container.data('id');
      var element = container.find('.hustle-select2');
      element.HUIselect2({
        dir: true === element.data('rtl-support') ? 'rtl' : 'ltr',
        language: '' !== element.data('language') ? element.data('language') : 'en',
        placeholder: '' !== element.data('placeholder') ? element.data('placeholder') : null,
        dropdownCssClass: 'hustle-module-' + moduleId + ' hustle-dropdown',
        minimumResultsForSearch: Infinity
      });
    });
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.sharingSimulation = function (el) {
    var module = $(el);
    if (!module.is('.hustle-ui')) {
      return;
    }
    function resetOnLoad() {
      module.hide();
    }
    function init() {
      resetOnLoad();
    }
    init();
    return this;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.slideinClose = function (el, autohideDelay) {
    var slidein = $(el),
      close = slidein.find('.hustle-button-close'),
      content = slidein.find('.hustle-slidein-content'),
      neverSee = slidein.find('.hustle-nsa-link');
    var preventAutohide = false;
    if (!close.length) {
      return;
    }
    if (!slidein.hasClass('hustle-slidein')) {
      return;
    }
    function escapeKeyClose(e) {
      if (27 === e.keyCode) {
        preventAutohide = true;
        slidein.trigger('hustle:module:esc_key_pressed', this);
        animationOut();
      }
    }
    function animationOut() {
      content.addClass('hustle-animate-out');
      content.removeClass('hustle-animate-in');
      slidein.find('iframe').each(function (i, el) {
        return $(el).attr('src', $(el).attr('src'));
      });
      setTimeout(function () {
        slidein.removeClass('hustle-show');
        content.removeClass('hustle-animate-out');
        HUI.trapFocus();
      }, 1000);
    }
    function init() {
      $(document).off('keydown.hustle.escKey', escapeKeyClose);
      $(document).on('keydown.hustle.escKey', escapeKeyClose);
      slidein.on('click', function () {
        preventAutohide = true;
      });
      if ('undefined' !== typeof autohideDelay && false !== autohideDelay) {
        setTimeout(function () {
          if (!preventAutohide) {
            slidein.trigger('hustle:module:hidden', this);
            animationOut();
          }
        }, autohideDelay);
      }
      close.on('click', function (e) {
        slidein.trigger('hustle:module:closed', this);
        animationOut();
      });
      neverSee.on('click', function (e) {
        e.preventDefault();
        slidein.trigger('hustle:module:clicked_never_see', this);
        animationOut();
      });
    }
    init();
    return this;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.slideinLayouts = function (el) {
    var slidein = $(el);
    var wrapper = slidein.find('.hustle-slidein-content');
    var content = slidein.find('.hustle-slidein-content > div');
    var maincontent = slidein.find('.hustle-main-wrapper');
    var header = slidein.find('.hustle-layout-header');
    var footer = slidein.find('.hustle-layout-footer');
    var close = slidein.find('.hustle-button-close');

    // Check if element exists.
    if (!slidein.length) {
      return;
    }

    // Check if element is an slide-in.
    if (!slidein.hasClass('hustle-slidein')) {
      return;
    }

    // Check if element module is informational.
    if (content.hasClass('hustle-info')) {
      footer = slidein.find('.hustle-nsa-link');
    }

    // Check if footer exists.
    //if ( ! footer.length ) {
    //	return;
    //}

    function headerHeight() {
      return header.outerHeight(true);
    }
    function footerHeight() {
      // Check if footer exists.
      if (footer.length) {
        return footer.outerHeight(true);
      }
      return 0;
    }
    function closeHeight() {
      return close.outerHeight(false);
    }
    function init() {
      if (content.hasClass('hustle-info--stacked')) {
        slidein.css({
          'padding-top': headerHeight() + 'px'
        });
        maincontent.css({
          'max-height': 'calc(100vh - ' + (footerHeight() + headerHeight()) + 'px)'
        });
        header.css({
          'top': '-' + headerHeight() + 'px'
        });
      } else {
        maincontent.css({
          'max-height': 'calc(100vh - ' + (footerHeight() + closeHeight()) + 'px)'
        });
      }
      slidein.css({
        'padding-bottom': footerHeight() + 'px'
      });
      footer.css({
        'bottom': '-' + footerHeight() + 'px'
      });

      // Check for all slide-ins placed on south.
      var atSouth = 's' === slidein.attr('data-position');
      var atSouthWest = 'sw' === slidein.attr('data-position');
      var atSouthEast = 'se' === slidein.attr('data-position');
      if (atSouth || atSouthWest || atSouthEast) {
        wrapper.css({
          'bottom': footerHeight() + 'px'
        });
      }
    }
    init();
    return this;
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.slideinLoad = function (el, autohideDelay) {
    var slidein = $(el);
    var content = slidein.find('.hustle-slidein-content');
    var slideinId = $('#' + slidein.attr('id'));
    var slideinWrapper = slideinId.find('.hustle-layout');
    if (!slidein.is('.hustle-slidein')) {
      return;
    }
    slidein.css('opacity', 1);
    function reset() {
      slidein.removeClass('hustle-show');
    }
    function show() {
      slidein.addClass('hustle-show');
    }
    function position() {
      var checkPosition = slidein.data('position');
      var positionX = '';
      var positionY = '';
      if (-1 !== checkPosition.charAt(0).indexOf('n')) {
        positionX = 'north';
      }
      if (-1 !== checkPosition.charAt(0).indexOf('s')) {
        positionX = 'south';
      }
      if (-1 !== checkPosition.charAt(0).indexOf('e')) {
        positionX = 'east';
      }
      if (-1 !== checkPosition.charAt(0).indexOf('w')) {
        positionX = 'west';
      }
      if (-1 !== checkPosition.charAt(1).indexOf('n')) {
        positionY = 'north';
      }
      if (-1 !== checkPosition.charAt(1).indexOf('s')) {
        positionY = 'south';
      }
      if (-1 !== checkPosition.charAt(1).indexOf('e')) {
        positionY = 'east';
      }
      if (-1 !== checkPosition.charAt(1).indexOf('w')) {
        positionY = 'west';
      }
      if (1 === checkPosition.length) {
        slidein.addClass('hustle-slidein-position--' + positionX);
      } else {
        slidein.addClass('hustle-slidein-position--' + positionX + '-' + positionY);
      }
    }
    function animation() {
      content.addClass('hustle-animate-in');
    }
    function init() {
      reset();
      position();

      // Module time.
      setTimeout(function () {
        jQuery(window).trigger('resize');
        show();
      }, 800);

      // Layout time.
      setTimeout(function () {
        animation();
        $(document).trigger('hustle:module:displayed', slidein);
        HUI.trapFocus();
      }, 1000);
      HUI.slideinClose(el, autohideDelay);
    }
    init();
    return this;
  };
})(jQuery);

/**
 * jQuery Timepicker - v1.3.5 - 2016-07-10
 * http://timepicker.co
 *
 * Enhances standard form input fields helping users to select (or type) times.
 *
 * Copyright (c) 2016 Willington Vega; Licensed MIT, GPL
 */

// @edited replaced default timepicker name with HUI_timepicker.

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    factory(require('jquery'), window, document);
  } else if (typeof jQuery !== 'undefined') {
    factory(jQuery, window, document);
  }
})(function ($, window, document, undefined) {
  (function () {
    function pad(str, ch, length) {
      return new Array(length + 1 - str.length).join(ch) + str;
    }
    function normalize() {
      if (arguments.length === 1) {
        var date = arguments[0];
        if (typeof date === 'string') {
          date = $.fn.HUI_timepicker.parseTime(date);
        }
        return new Date(0, 0, 0, date.getHours(), date.getMinutes(), date.getSeconds());
      } else if (arguments.length === 3) {
        return new Date(0, 0, 0, arguments[0], arguments[1], arguments[2]);
      } else if (arguments.length === 2) {
        return new Date(0, 0, 0, arguments[0], arguments[1], 0);
      } else {
        return new Date(0, 0, 0);
      }
    }
    $.HUI_TimePicker = function () {
      var widget = this;
      widget.container = $('.hustle-timepicker');
      widget.ui = widget.container.find('.ui-timepicker');
      widget.viewport = widget.ui.find('.ui-timepicker-viewport');
      if (widget.container.length === 0) {
        widget.container = $('<div></div>').addClass('hustle-timepicker').addClass('ui-timepicker-hidden ui-helper-hidden').appendTo('body').removeClass('hustle-show');
        widget.ui = $('<div></div>').addClass('ui-timepicker').addClass('ui-widget ui-widget-content ui-menu').appendTo(widget.container);
        widget.viewport = $('<ul></ul>').addClass('ui-timepicker-viewport').appendTo(widget.ui);
        if ($.fn.jquery >= '1.4.2') {
          widget.ui.delegate('a', 'mouseenter.timepicker', function () {
            // passing false instead of an instance object tells the function
            // to use the current instance
            widget.activate(false, $(this).parent());
          }).delegate('a', 'mouseleave.timepicker', function () {
            widget.deactivate(false);
          }).delegate('a', 'click.timepicker', function (event) {
            event.preventDefault();
            widget.select(false, $(this).parent());
          });
        }
      }
    };
    $.HUI_TimePicker.count = 0;
    $.HUI_TimePicker.instance = function () {
      if (!$.HUI_TimePicker._instance) {
        $.HUI_TimePicker._instance = new $.HUI_TimePicker();
      }
      return $.HUI_TimePicker._instance;
    };
    $.HUI_TimePicker.prototype = {
      // extracted from from jQuery UI Core
      // http://github,com/jquery/jquery-ui/blob/master/ui/jquery.ui.core.js
      keyCode: {
        ALT: 18,
        BLOQ_MAYUS: 20,
        CTRL: 17,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ENTER: 108,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        RIGHT: 39,
        SHIFT: 16,
        TAB: 9,
        UP: 38
      },
      _items: function _items(i, startTime) {
        var widget = this,
          ul = $('<ul></ul>'),
          item = null,
          time,
          end;

        // interval should be a multiple of 60 if timeFormat is not
        // showing minutes
        if (i.options.timeFormat.indexOf('m') === -1 && i.options.interval % 60 !== 0) {
          i.options.interval = Math.max(Math.round(i.options.interval / 60), 1) * 60;
        }
        if (startTime) {
          time = normalize(startTime);
        } else if (i.options.startTime) {
          time = normalize(i.options.startTime);
        } else {
          time = normalize(i.options.startHour, i.options.startMinutes);
        }
        end = new Date(time.getTime() + 24 * 60 * 60 * 1000);
        while (time < end) {
          if (widget._isValidTime(i, time)) {
            item = $('<li>').addClass('ui-menu-item').appendTo(ul);
            $('<a>').text($.fn.HUI_timepicker.formatTime(i.options.timeFormat, time)).appendTo(item);
            item.data('time-value', time);
          }
          time = new Date(time.getTime() + i.options.interval * 60 * 1000);
        }
        return ul.children();
      },
      _isValidTime: function _isValidTime(i, time) {
        var min = null,
          max = null;
        time = normalize(time);
        if (i.options.minTime !== null) {
          min = normalize(i.options.minTime);
        } else if (i.options.minHour !== null || i.options.minMinutes !== null) {
          min = normalize(i.options.minHour, i.options.minMinutes);
        }
        if (i.options.maxTime !== null) {
          max = normalize(i.options.maxTime);
        } else if (i.options.maxHour !== null || i.options.maxMinutes !== null) {
          max = normalize(i.options.maxHour, i.options.maxMinutes);
        }
        if (min !== null && max !== null) {
          return time >= min && time <= max;
        } else if (min !== null) {
          return time >= min;
        } else if (max !== null) {
          return time <= max;
        }
        return true;
      },
      _hasScroll: function _hasScroll() {
        // fix for jQuery 1.6 new prop method
        var m = typeof this.ui.prop !== 'undefined' ? 'prop' : 'attr';
        return this.ui.height() < this.ui[m]('scrollHeight');
      },
      /**
       * TODO: Write me!
       *
       * @param i
       * @param direction
       * @param edge
       * */
      _move: function _move(i, direction, edge) {
        var widget = this;
        if (widget.closed()) {
          widget.open(i);
        }
        if (!widget.active) {
          widget.activate(i, widget.viewport.children(edge));
          return;
        }
        var next = widget.active[direction + 'All']('.ui-menu-item').eq(0);
        if (next.length) {
          widget.activate(i, next);
        } else {
          widget.activate(i, widget.viewport.children(edge));
        }
      },
      //
      // protected methods
      //

      register: function register(node, options) {
        var widget = this,
          i = {}; // timepicker instance object

        i.element = $(node);
        if (i.element.data('TimePicker')) {
          return;
        }
        i.options = $.metadata ? $.extend({}, options, i.element.metadata()) : $.extend({}, options);
        i.widget = widget;

        // proxy functions for the exposed api methods
        $.extend(i, {
          next: function next() {
            return widget.next(i);
          },
          previous: function previous() {
            return widget.previous(i);
          },
          first: function first() {
            return widget.first(i);
          },
          last: function last() {
            return widget.last(i);
          },
          selected: function selected() {
            return widget.selected(i);
          },
          open: function open() {
            return widget.open(i);
          },
          close: function close() {
            return widget.close(i);
          },
          closed: function closed() {
            return widget.closed(i);
          },
          destroy: function destroy() {
            return widget.destroy(i);
          },
          parse: function parse(str) {
            return widget.parse(i, str);
          },
          format: function format(time, _format) {
            return widget.format(i, time, _format);
          },
          getTime: function getTime() {
            return widget.getTime(i);
          },
          setTime: function setTime(time, silent) {
            return widget.setTime(i, time, silent);
          },
          option: function option(name, value) {
            return widget.option(i, name, value);
          }
        });
        widget._setDefaultTime(i);
        widget._addInputEventsHandlers(i);
        i.element.data('TimePicker', i);
      },
      _setDefaultTime: function _setDefaultTime(i) {
        if (i.options.defaultTime === 'now') {
          i.setTime(normalize(new Date()));
        } else if (i.options.defaultTime && i.options.defaultTime.getFullYear) {
          i.setTime(normalize(i.options.defaultTime));
        } else if (i.options.defaultTime) {
          i.setTime($.fn.HUI_timepicker.parseTime(i.options.defaultTime));
        }
      },
      _addInputEventsHandlers: function _addInputEventsHandlers(i) {
        var widget = this;
        i.element.bind('keydown.timepicker', function (event) {
          switch (event.which || event.keyCode) {
            case widget.keyCode.ENTER:
            case widget.keyCode.NUMPAD_ENTER:
              event.preventDefault();
              if (widget.closed()) {
                i.element.trigger('change.timepicker');
              } else {
                widget.select(i, widget.active);
              }
              break;
            case widget.keyCode.UP:
              i.previous();
              break;
            case widget.keyCode.DOWN:
              i.next();
              break;
            default:
              if (!widget.closed()) {
                i.close(true);
              }
              break;
          }
        }).bind('focus.timepicker', function () {
          i.open();
        }).bind('blur.timepicker', function () {
          setTimeout(function () {
            if (i.element.data('timepicker-user-clicked-outside')) {
              i.close();
            }
          });
        }).bind('change.timepicker', function () {
          if (i.closed()) {
            i.setTime($.fn.HUI_timepicker.parseTime(i.element.val()));
          }
        });
      },
      select: function select(i, item) {
        var widget = this,
          instance = i === false ? widget.instance : i;
        widget.setTime(instance, $.fn.HUI_timepicker.parseTime(item.children('a').text()));
        widget.close(instance, true);
      },
      activate: function activate(i, item) {
        var widget = this,
          instance = i === false ? widget.instance : i;
        if (instance !== widget.instance) {
          return;
        } else {
          widget.deactivate();
        }
        if (widget._hasScroll()) {
          var offset = item.offset().top - widget.ui.offset().top,
            scroll = widget.ui.scrollTop(),
            height = widget.ui.height();
          if (offset < 0) {
            widget.ui.scrollTop(scroll + offset);
          } else if (offset >= height) {
            widget.ui.scrollTop(scroll + offset - height + item.height());
          }
        }
        widget.active = item.eq(0).children('a').addClass('ui-state-hover').attr('id', 'ui-active-item').end();
      },
      deactivate: function deactivate() {
        var widget = this;
        if (!widget.active) {
          return;
        }
        widget.active.children('a').removeClass('ui-state-hover').removeAttr('id');
        widget.active = null;
      },
      /**
       * _activate, _deactivate, first, last, next, previous, _move and
       * _hasScroll were extracted from jQuery UI Menu
       * http://github,com/jquery/jquery-ui/blob/menu/ui/jquery.ui.menu.js
       */

      //
      // public methods
      //

      next: function next(i) {
        if (this.closed() || this.instance === i) {
          this._move(i, 'next', '.ui-menu-item:first');
        }
        return i.element;
      },
      previous: function previous(i) {
        if (this.closed() || this.instance === i) {
          this._move(i, 'prev', '.ui-menu-item:last');
        }
        return i.element;
      },
      first: function first(i) {
        if (this.instance === i) {
          return this.active && this.active.prevAll('.ui-menu-item').length === 0;
        }
        return false;
      },
      last: function last(i) {
        if (this.instance === i) {
          return this.active && this.active.nextAll('.ui-menu-item').length === 0;
        }
        return false;
      },
      selected: function selected(i) {
        if (this.instance === i) {
          return this.active ? this.active : null;
        }
        return null;
      },
      open: function open(i) {
        var widget = this,
          selectedTime = i.getTime(),
          arrange = i.options.dynamic && selectedTime;

        // return if dropdown is disabled
        if (!i.options.dropdown || i.options.hideDropdown) {
          return i.element;
        }

        // fix for issue https://github.com/wvega/timepicker/issues/56
        // idea from https://prototype.lighthouseapp.com/projects/8887/tickets/248-results-popup-from-ajaxautocompleter-disappear-when-user-clicks-on-scrollbars-in-ie6ie7
        i.element.data('timepicker-event-namespace', Math.random());
        widget.container.insertAfter(i.element.closest('.hustle-layout'));
        if (i.element.closest('.sui-form-field').length) {
          i.element.closest('.sui-form-field').append(widget.container);
        } else {
          widget.container.insertAfter(i.element.closest('.hustle-layout'));
        }
        $(document).bind('click.timepicker-' + i.element.data('timepicker-event-namespace'), function (event) {
          if (i.element.get(0) === event.target) {
            i.element.data('timepicker-user-clicked-outside', false);
          } else {
            widget.container.insertAfter(i.element.closest('.hustle-layout'));
          }
        });

        // if a date is already selected and options.dynamic is true,
        // arrange the items in the list so the first item is
        // cronologically right after the selected date.
        // TODO: set selectedTime
        if (i.rebuild || !i.items || arrange) {
          i.items = widget._items(i, arrange ? selectedTime : null);
        }

        // remove old li elements keeping associated events, then append
        // the new li elements to the ul
        if (i.rebuild || widget.instance !== i || arrange) {
          // handle menu events when using jQuery versions previous to
          // 1.4.2 (thanks to Brian Link)
          // http://github.com/wvega/timepicker/issues#issue/4
          if ($.fn.jquery < '1.4.2') {
            widget.viewport.children().remove();
            widget.viewport.append(i.items);
            widget.viewport.find('a').bind('mouseover.timepicker', function () {
              widget.activate(i, $(this).parent());
            }).bind('mouseout.timepicker', function () {
              widget.deactivate(i);
            }).bind('click.timepicker', function (event) {
              event.preventDefault();
              widget.select(i, $(this).parent());
            });
          } else {
            widget.viewport.children().detach();
            widget.viewport.append(i.items);
          }
        }
        i.rebuild = false;

        /**
        * Theme Support
        *
        * @since Hustle UI 4.0
        */

        // Remove standard theme classes
        widget.container.removeClass('ui-timepicker-standard ui-timepicker-corners');

        // Show time picker dropdown
        widget.container.addClass('hustle-show');
        $(document).trigger('hustle:module:displayed', widget);
        switch (i.options.theme) {
          case 'standard':
            widget.container.addClass('ui-timepicker-standard');
            break;
          case 'standard-rounded-corners':
            widget.container.addClass('ui-timepicker-standard ui-timepicker-corners');
            break;
          default:
            break;
        }

        /* resize ui */

        // we are hiding the scrollbar in the dropdown menu adding a 40px
        // padding to the wrapper element making the scrollbar appear in the
        // part of the wrapper that's hidden by the container (a DIV).
        if (!widget.container.hasClass('ui-timepicker-no-scrollbar') && !i.options.scrollbar) {
          widget.container.addClass('ui-timepicker-no-scrollbar');
          widget.viewport.css({
            paddingRight: 40
          });
        }
        var containerDecorationHeight = widget.container.outerHeight() - widget.container.height(),
          zindex = i.options.zindex ? i.options.zindex : i.element.offsetParent().css('z-index'),
          $field = i.element.closest('.hustle-field'),
          elementOffset = $field.position(),
          //i.element.offset();
          viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        // position the container right below the element, or as close to as possible.
        widget.container.css({
          top: elementOffset.top + i.element.outerHeight(),
          left: elementOffset.left
        });

        // then show the container so that the browser can consider the timepicker's
        // height to calculate the page's total height and decide if adding scrollbars
        // is necessary.
        widget.container.addClass('hustle-show');

        // now we need to calculate the element offset and position the container again.
        // If the browser added scrollbars, the container's original position is not aligned
        // with the element's final position. This step fixes that problem.
        elementOffset = $field.position();
        widget.container.css({
          width: i.element.outerWidth(),
          position: 'absolute',
          zIndex: 999999,
          left: elementOffset.left
          //cursor: 'default',
          //height: widget.ui.outerHeight() + containerDecorationHeight,
        });

        var listPosition = $field.offset().top - $(document).scrollTop();

        // position the container right above the element, or as close to as possible.
        if (viewHeight - listPosition < 200) {
          widget.container.css({
            top: elementOffset.top - widget.container.outerHeight()
          });
        }

        // XXX: what's this line doing here?
        widget.instance = i;

        // try to match input field's current value with an item in the
        // dropdown
        if (selectedTime) {
          i.items.each(function () {
            var item = $(this),
              time;
            if ($.fn.jquery < '1.4.2') {
              time = $.fn.HUI_timepicker.parseTime(item.find('a').text());
            } else {
              time = item.data('time-value');
            }
            if (time.getTime() === selectedTime.getTime()) {
              widget.activate(i, item);
              return false;
            }
            return true;
          });
        } else {
          widget.deactivate(i);
        }

        // don't break the chain
        return i.element;
      },
      close: function close(i) {
        var widget = this;
        if (widget.instance === i) {
          widget.container.removeClass('hustle-show');
          widget.ui.scrollTop(0);
          // widget.ui.children().removeClass('ui-state-hover');
        }

        $(document).unbind('click.timepicker-' + i.element.data('timepicker-event-namespace'));
        return i.element;
      },
      closed: function closed() {
        return this.ui.is(':hidden');
      },
      destroy: function destroy(i) {
        var widget = this;
        widget.close(i, true);
        return i.element.unbind('.timepicker').data('TimePicker', null);
      },
      //

      parse: function parse(i, str) {
        return $.fn.HUI_timepicker.parseTime(str);
      },
      format: function format(i, time, _format2) {
        _format2 = _format2 || i.options.timeFormat;
        return $.fn.HUI_timepicker.formatTime(_format2, time);
      },
      getTime: function getTime(i) {
        var widget = this,
          current = $.fn.HUI_timepicker.parseTime(i.element.val());

        // if current value is not valid, we return null.
        // stored Date object is ignored, because the current value
        // (valid or invalid) always takes priority
        if (current instanceof Date && !widget._isValidTime(i, current)) {
          return null;
        } else if (current instanceof Date && i.selectedTime) {
          // if the textfield's value and the stored Date object
          // have the same representation using current format
          // we prefer the stored Date object to avoid unnecesary
          // lost of precision.
          if (i.format(current) === i.format(i.selectedTime)) {
            return i.selectedTime;
          } else {
            return current;
          }
        } else if (current instanceof Date) {
          return current;
        } else {
          return null;
        }
      },
      setTime: function setTime(i, time, silent) {
        var widget = this,
          previous = i.selectedTime;
        if (typeof time === 'string') {
          time = i.parse(time);
        }
        if (time && time.getMinutes && widget._isValidTime(i, time)) {
          time = normalize(time);
          i.selectedTime = time;
          i.element.val(i.format(time, i.options.timeFormat));

          // TODO: add documentaion about setTime being chainable
          if (silent) {
            return i;
          }
        } else {
          i.selectedTime = null;
        }

        // custom change event and change callback
        // TODO: add documentation about this event
        if (previous !== null || i.selectedTime !== null) {
          i.element.trigger('time-change', [time]);
          if ($.isFunction(i.options.change)) {
            i.options.change.apply(i.element, [time]);
          }
        }
        return i.element;
      },
      option: function option(i, name, value) {
        if (typeof value === 'undefined') {
          return i.options[name];
        }
        var time = i.getTime(),
          options,
          destructive;
        if (typeof name === 'string') {
          options = {};
          options[name] = value;
        } else {
          options = name;
        }

        // some options require rebuilding the dropdown items
        destructive = ['minHour', 'minMinutes', 'minTime', 'maxHour', 'maxMinutes', 'maxTime', 'startHour', 'startMinutes', 'startTime', 'timeFormat', 'interval', 'dropdown'];
        $.each(options, function (name) {
          i.options[name] = options[name];
          i.rebuild = i.rebuild || $.inArray(name, destructive) > -1;
        });
        if (i.rebuild) {
          i.setTime(time);
        }
      }
    };
    $.HUI_TimePicker.defaults = {
      timeFormat: 'hh:mm p',
      minHour: null,
      minMinutes: null,
      minTime: null,
      maxHour: null,
      maxMinutes: null,
      maxTime: null,
      startHour: null,
      startMinutes: null,
      startTime: null,
      interval: 30,
      dynamic: true,
      theme: 'standard',
      zindex: null,
      dropdown: true,
      scrollbar: false,
      // callbacks
      change: function change( /*time*/) {}
    };
    $.HUI_TimePicker.methods = {
      chainable: ['next', 'previous', 'open', 'close', 'destroy', 'setTime']
    };
    $.fn.HUI_timepicker = function (options) {
      // support calling API methods using the following syntax:
      //   $(...).timepicker('parse', '11p');
      if (typeof options === 'string') {
        var args = Array.prototype.slice.call(arguments, 1),
          method,
          result;

        // chainable API methods
        if (options === 'option' && arguments.length > 2) {
          method = 'each';
        } else if ($.inArray(options, $.HUI_TimePicker.methods.chainable) !== -1) {
          method = 'each';
          // API methods that return a value
        } else {
          method = 'map';
        }
        result = this[method](function () {
          var element = $(this),
            i = element.data('TimePicker');
          if (_typeof(i) === 'object') {
            return i[options].apply(i, args);
          }
        });
        if (method === 'map' && this.length === 1) {
          return $.makeArray(result).shift();
        } else if (method === 'map') {
          return $.makeArray(result);
        } else {
          return result;
        }
      }

      // calling the constructor again on a jQuery object with a single
      // element returns a reference to a TimePicker object.
      if (this.length === 1 && this.data('TimePicker')) {
        return this.data('TimePicker');
      }
      var globals = $.extend({}, $.HUI_TimePicker.defaults, options);
      return this.each(function () {
        $.HUI_TimePicker.instance().register(this, globals);
      });
    };

    /**
     * TODO: documentation
     */
    $.fn.HUI_timepicker.formatTime = function (format, time) {
      var hours = time.getHours(),
        hours12 = hours % 12,
        minutes = time.getMinutes(),
        seconds = time.getSeconds(),
        replacements = {
          hh: pad((hours12 === 0 ? 12 : hours12).toString(), '0', 2),
          HH: pad(hours.toString(), '0', 2),
          mm: pad(minutes.toString(), '0', 2),
          ss: pad(seconds.toString(), '0', 2),
          h: hours12 === 0 ? 12 : hours12,
          H: hours,
          m: minutes,
          s: seconds,
          p: hours > 11 ? 'PM' : 'AM'
        },
        str = format,
        k = '';
      for (k in replacements) {
        if (replacements.hasOwnProperty(k)) {
          str = str.replace(new RegExp(k, 'g'), replacements[k]);
        }
      }
      // replacements is not guaranteed to be order and the 'p' can cause problems
      str = str.replace(new RegExp('a', 'g'), hours > 11 ? 'pm' : 'am');
      return str;
    };

    /**
     * Convert a string representing a given time into a Date object.
     *
     * The Date object will have attributes others than hours, minutes and
     * seconds set to current local time values. The function will return
     * false if given string can't be converted.
     *
     * If there is an 'a' in the string we set am to true, if there is a 'p'
     * we set pm to true, if both are present only am is setted to true.
     *
     * All non-digit characters are removed from the string before trying to
     * parse the time.
     *
     * ''       can't be converted and the function returns false.
     * '1'      is converted to     01:00:00 am
     * '11'     is converted to     11:00:00 am
     * '111'    is converted to     01:11:00 am
     * '1111'   is converted to     11:11:00 am
     * '11111'  is converted to     01:11:11 am
     * '111111' is converted to     11:11:11 am
     *
     * Only the first six (or less) characters are considered.
     *
     * Special case:
     *
     * When hours is greater than 24 and the last digit is less or equal than 6, and minutes
     * and seconds are less or equal than 60, we append a trailing zero and
     * start parsing process again. Examples:
     *
     * '95' is treated as '950' and converted to 09:50:00 am
     * '46' is treated as '460' and converted to 05:00:00 am
     * '57' can't be converted and the function returns false.
     *
     * For a detailed list of supported formats check the unit tests at
     * http://github.com/wvega/timepicker/tree/master/tests/
     */
    $.fn.HUI_timepicker.parseTime = function () {
      var patterns = [
        // 1, 12, 123, 1234, 12345, 123456
        [/^(\d+)$/, '$1'],
        // :1, :2, :3, :4 ... :9
        [/^:(\d)$/, '$10'],
        // :1, :12, :123, :1234 ...
        [/^:(\d+)/, '$1'],
        // 6:06, 5:59, 5:8
        [/^(\d):([7-9])$/, '0$10$2'], [/^(\d):(\d\d)$/, '$1$2'], [/^(\d):(\d{1,})$/, '0$1$20'],
        // 10:8, 10:10, 10:34
        [/^(\d\d):([7-9])$/, '$10$2'], [/^(\d\d):(\d)$/, '$1$20'], [/^(\d\d):(\d*)$/, '$1$2'],
        // 123:4, 1234:456
        [/^(\d{3,}):(\d)$/, '$10$2'], [/^(\d{3,}):(\d{2,})/, '$1$2'],
        //
        [/^(\d):(\d):(\d)$/, '0$10$20$3'], [/^(\d{1,2}):(\d):(\d\d)/, '$10$2$3']],
        length = patterns.length;
      return function (str) {
        var time = normalize(new Date()),
          am = false,
          pm = false,
          h = false,
          m = false,
          s = false;
        if (typeof str === 'undefined' || !str.toLowerCase) {
          return null;
        }
        str = str.toLowerCase();
        am = /a/.test(str);
        pm = am ? false : /p/.test(str);
        str = str.replace(/[^0-9:]/g, '').replace(/:+/g, ':');
        for (var k = 0; k < length; k = k + 1) {
          if (patterns[k][0].test(str)) {
            str = str.replace(patterns[k][0], patterns[k][1]);
            break;
          }
        }
        str = str.replace(/:/g, '');
        if (str.length === 1) {
          h = str;
        } else if (str.length === 2) {
          h = str;
        } else if (str.length === 3 || str.length === 5) {
          h = str.substr(0, 1);
          m = str.substr(1, 2);
          s = str.substr(3, 2);
        } else if (str.length === 4 || str.length > 5) {
          h = str.substr(0, 2);
          m = str.substr(2, 2);
          s = str.substr(4, 2);
        }
        if (str.length > 0 && str.length < 5) {
          if (str.length < 3) {
            m = 0;
          }
          s = 0;
        }
        if (h === false || m === false || s === false) {
          return false;
        }
        h = parseInt(h, 10);
        m = parseInt(m, 10);
        s = parseInt(s, 10);
        if (am && h === 12) {
          h = 0;
        } else if (pm && h < 12) {
          h = h + 12;
        }
        if (h > 24) {
          if (str.length >= 6) {
            return $.fn.HUI_timepicker.parseTime(str.substr(0, 5));
          } else {
            return $.fn.HUI_timepicker.parseTime(str + '0' + (am ? 'a' : '') + (pm ? 'p' : ''));
          }
        } else {
          time.setHours(h, m, s);
          return time;
        }
      };
    }();
  })();
});
(function ($) {
  // Enable strict mode
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.timepicker = function (el) {
    var select = $(el);
    $('.hustle-ui').each(function () {
      var container = $(this);
      var moduleId = container.data('id');
      var element = container.find(select);
      element.HUI_timepicker({
        timeFormat: '' !== element.data('time-format') ? element.data('time-format') : 'h:mm p',
        interval: '' !== element.data('time-interval') ? element.data('time-interval') : 60,
        minTime: '0',
        maxTime: '11:59pm',
        defaultTime: '' !== element.data('time-default') ? element.data('time-default') : null,
        startTime: '00:00',
        dynamic: false,
        dropdown: true === element.data('time-dropdown') ? true : false,
        hideDropdown: true === element.data('hide-dropdown') ? true : false,
        scrollbar: true === element.data('time-dropdown') ? true : false,
        change: function change() {
          if ('' === element.val()) {
            element.parent().removeClass('hustle-field-filled');
          } else {
            element.parent().addClass('hustle-field-filled');
          }
        }
      });
    });
  };
})(jQuery);
(function ($) {
  'use strict';

  // Define global HUI object if it doesn't exist.
  if ('object' !== _typeof(window.HUI)) {
    window.HUI = {};
  }
  HUI.trapFocus = function () {
    // detect all the modals.
    var modals = [];
    var modalId = '';
    $('.hustle-show[role="dialog"]').each(function () {
      modals.push('#' + this.id);
    });
    if (!modals.length) {
      return;
    }
    modalId = modals[modals.length - 1];
    $(modalId).find('a[href], button, textarea, input, select').filter(':visible')[0].focus();

    // Trap focus within the modal when it is open
    $(modalId).on('keydown', function (e) {
      var focusableElements = $(modalId).find('a[href], button, textarea, input, select').filter(':visible');
      var firstFocusableElement = focusableElements[0];
      var lastFocusableElement = focusableElements[focusableElements.length - 1];
      var isTabPressed = 'Tab' === e.key || 9 === e.keyCode;
      if (!isTabPressed) {
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });
  };
})(jQuery);