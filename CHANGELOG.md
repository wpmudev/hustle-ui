# Changelog

## [v2.0.13](https://github.com/wpmudev/shared-ui/releases/tag/v2.0.13)

#### Bug Fixes
- [HUS-1166](https://incsub.atlassian.net/browse/HUS-1166) 🐛 fix(social-share): Social sharing icons always vertical

## [v2.0.12](https://github.com/wpmudev/shared-ui/releases/tag/v2.0.12)

#### Bug Fixes
- [HUS-931](https://incsub.atlassian.net/browse/HUS-931) 🐛 fix: Remove redundant fonts.
- [HUS-1014](https://incsub.atlassian.net/browse/HUS-1014) 🐛 fix: jQuery compatibility issues.
- [HUS-1135](https://incsub.atlassian.net/browse/HUS-1135) 🐛 fix(social-share): Modules do not follow the defined mobile breakpoint.

## [v2.0.11](https://github.com/wpmudev/shared-ui/releases/tag/v2.0.11)

#### Bug Fixes
- [HUS-628](https://incsub.atlassian.net/browse/HUS-628) 🐛 fix(opt-ins): Main content with sub-list not aligning correctly.
- [HUS-628](https://incsub.atlassian.net/browse/HUS-628) 🐛 fix(informational): Main content with sub-list not aligning correctly.

#### Committers: 1
- Leighton Sapir ([@iamleigh](https://github.com/iamleigh))

## [v2.0.10](https://github.com/wpmudev/shared-ui/releases/tag/v2.0.10)

#### Bug Fixes
- [HUS-690](https://incsub.atlassian.net/browse/HUS-690) 🐛 fix(opt-ins): Improve error handling when the recaptcha keys are invalid.
- [HUS-628](https://incsub.atlassian.net/browse/HUS-628) 🐛 fix(opt-ins): Main content with sub-list not aligning correctly.
- [HUS-628](https://incsub.atlassian.net/browse/HUS-628) 🐛 fix(informational): Main content with sub-list not aligning correctly.

#### Committers: 2
- Ivan Svyrskyi ([@ioannup](https://github.com/ioannup))
- Leighton Sapir ([@iamleigh](https://github.com/iamleigh))

## [v2.0.9](https://github.com/wpmudev/shared-ui/releases/tag/v2.0.9)

#### Bug Fixes
- [HUS-1034](https://incsub.atlassian.net/browse/HUS-1034) 🐛 fix(pop-ups): Overlay on iPhone Devices with OS>=14.3.

#### Committers: 1
- Leighton Sapir ([@iamleigh](https://github.com/iamleigh))

## [v2.0.8](https://github.com/wpmudev/shared-ui/releases/tag/v2.0.8)

#### Bug Fixes
- [HUS-667](https://incsub.atlassian.net/browse/HUS-667) 🐛 fix(pop-ups): jQuery font family selectors under accordions not working.
- [HUS-686](https://incsub.atlassian.net/browse/HUS-686) 🐛 fix(opt-ins): Incorrect alignment for icon.

#### Committers: 1
- Danae Millan ([@a-danae](https://github.com/a-danae))

## v2.0.6
- [Fix] jQuery console error warnings.


## v2.0.5
- [Fix] Global: Form fields gap in mobile not working.


## v2.0.4
- [Fix] [Module] Embeds: GDPR checkbox make jump to top of the page.
- [Fix] [Module] Pop-ups: Page scroll functionality not working when more than 2 pop-ups are displayed.
- [Fix] [Element] Timepicker: OnChange event for correct hiding labels.
- [Fix] [Element] reCAPTCHA: Design issue appears in error message after entering incorrect keys.
- [Enhance] [Module] Added js events after module displayed.


## v2.0.2
- [Fix] [Module] Slide-ins: Bottom position undefined for south aligned modules when no footer was added.


## v2.0.1
- [Fix]     [Module] Slide-ins: Modules are not showing up properly on IE.
- [Enhance] [Module] Slide-ins: Animation timing has decreased in 0.5 seconds making modules show/hide faster.


## v2.0.0
- [Enhance] Global: Stop supporting color and font settings.
			Dev Notes: Color and settings from now on will be handled directly on
			Hustle v4.3.0.
- [Enhance] Global: Stop supporting advanced settings (margin, padding, border, shadow).
			Dev Notes: Advanced settings from now on will be handled directly on
			Hustle v4.3.0.


v1.2.7
- [Fix] [Element] Input: Hidden icon with filled field.


v1.2.6
- [Fix] [Element] Select2: Override extra margins added by TwentyTwenty WordPress Theme.


v1.2.5
- [Fix] [Module] Social Share: Centering on mobile messed the desktop offest.
- [Fix] [Element] Select2: Dropdown list showing behind module.


v1.2.4
- [Fix] [Element] Global: Static icons shouldn't be animated.


v1.2.3
- [Fix] [Module] Pop-up: iframes, videos and objects in module not showing as expected.


v1.2.2
- [Fix] [Module] Embed: Module not displaying in preview in certain display sizes.


v1.2.1
- [Fix] [Element] Select2: Element has conflicts with My Listings theme.


v1.2.0
- [Fix] [Element] Global: Font Awesome is being overwritten.


v1.1.1
- [Fix] [Module] Social Share: Alignment problems with Twenty Twenty WP Theme.
- [Fix] [Module] Slidein: "Stacked" layout breaks if no NSA element is present.


v1.1.0
- [New]     [Element] reCAPTCHA: Hidden badgge.
- [Fix]     [Module]  Pop-up: Using ESC key to close module is not working as expected.
- [Fix]     [Module]  Slide-in: Overflow not working correctly on Chrome.
- [Fix]     [Module]  Slide-in: Using ESC key to close module is not working as expected.
- [Fix]     [Module]  Pop-up: Scroll bar appears during some pop-up animations.
- [Fix]     [Element] Select2: Dropdown with search input has z-index problems.
- [Enhance] [Module]  Pop-up: Pause iframe videos when closing the module.
- [Enhance] [Module]  Pop-up: Allow changing the default error messages.
- [Enhance] [Module]  Slide-in: Pause iframe videos when closing the module.
- [Enhance] [Module]  Slide-in: Allow changing the default error messages.
- [Enhance] [Module]  Embed: Pause iframe videos when closing the module.
- [Enhance] [Module]  Embed: Allow changing the default error messages.
- [Enhance] [Element] Global: Make flex elements to resize accordingly.
- [Enhance] [Element] Calendar: Make strings translatable.
- [Enhance] [Element] reCAPTCHA: Render this element when previewing on Gutenberg editor.


v1.0.2
- [New] [Module]  Social Share: Email icon colors.
- [Fix] [Icons]   Ensure text remains visible during webfont load.
- [Fix] [Module]  Slide-in: Timepicker dropdown causes scrollbar.
- [Fix] [Module]  Slide-in: Links can be clicked even when module should be hidden.
- [Fix] [Module]  Slide-in: Overflow is not working on Chrome.
- [Fix] [Module]  Slide-in: Custom size is not working.
- [Fix] [Module]  Social Share: Stacked icons overfloat its container on IE.
- [Fix] [Element] Global Content: Conflict with Forminator styles.
- [Fix] [Element] GDPR Checkbox: Unnecessary extra spacing at bottom.
- [Fix] [Element] Time Picker: Open dropdown list on top of field when applies.
- [Fix] [Element] Select2: Stop requesting base styles from external sources.


v1.0.1
- [Fix]     [Module]  Pop-up: Some types of animations are causing additional scrollbar.
- [Fix]     [Module]  Slide-in: Prevent module from covering admin bar elements when placed at top.
- [Fix]     [Module]  Slide-in: Drop shadow spread out when enable custom size to all devices.
- [Fix]     [Module]  Slide-in: Can't scroll on modules.
- [Fix]     [Module]  Embed: Module custom width.
- [Fix]     [Module]  Embed: Call to action button on default layout should not be hidden.
- [Fix]     [Element] Time Picker: Maximum call stack size exceeded when entering value manually.
- [Fix]     [Element] Time Picker: Not able to select an option from dropdown list.
- [Fix]     [Element] Time Picker: Momentary hide dropdown list until element position can be fixed.
- [Enhance] [Element] Input: Check if input is filled on load.


v1.0.0
- [New] Hustle icons font.
- [New] Module Type: Pop-up styles.
- [New] Module Type: Slide-in styles.
- [New] Module Type: Embed styles.
- [New] Module Mode: Opt-in styles.
- [New] Module Mode: Informational styles.
- [New] Module Mode: Social share styles.
- [New] JS function to add filled class to inputs when are not empty.
- [New] JS function to add error class on required inputs.
- [New] JS function to show pop-up modules.
- [New] JS function to show slide-in modules.
- [New] JS function to show inline modules.
- [New] JS function to close pop-up modules on button click.
- [New] JS function to close pop-up modules on overlay mask click.
- [New] JS function to close slide-in modules on button click.
