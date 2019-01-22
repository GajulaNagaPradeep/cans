# frozen_string_literal: true

require 'page_objects/breadcrumbs'

class AssessmentGlobal < SitePrism::Section
  element :save_button, 'div.header-buttons-block i.fa-save'
  element :global_save_success_message_box, 'div.global-alert', text: 'Success! '\
                                            'CANS assessment has been saved'
  element :global_complete_message_box, 'div.global-alert', text: 'This assessment was completed '\
                                        'and is available for view only.'
  element :delete_warning_modal, 'div.modal', text: 'Deleting CANS Warning'
  element :complete_warning_modal, 'div.modal', text: 'Reminder'
  element :cancel_button_of_warning, 'button.warning-modal-logout'
  element :agree_button_of_warning, 'button.warning-modal-stay-logged-in'
end

class AssessmentFormHeader < SitePrism::Section
  element :date_field, 'input#assessment-date_input'
  element :calendar_icon, 'span.rw-i-calendar'
  element :calendar_cell_11, 'td.rw-cell', text: '11'
  element :conducted_by, 'input#conducted-by'
  element :case_or_referral, 'div#case-or-referral-number'
  element :authorization_label_yes, 'div#can-release-control label', text: 'Yes'
  element :authorization_label_no, 'div#can-release-control label', text: 'No'
  element :authorization_radio_yes, 'input#input-can-release-yes', visible: false
  element :authorization_radio_no, 'input#input-can-release-no', visible: false
  element :redaction_message, 'div.warning-text'
  element :age_0_to_5_button, 'button#age-0-5-button'
  element :age_6_to_21_button, 'button#age-6-21-button'
end

class AssessmentSummary < SitePrism::Section
  elements :summary_card_tips, 'i.assessment-summary-help-icon'
  element :summary_header_strengths, 'span', text: 'Strengths'
  elements :summary_columns, 'div.assessment-summary-card div.rt-tbody'
end

class AssessmentFormFooter < SitePrism::Section
  element :complete_button, 'button#submit-assessment'
end

class AssessmentForm < SitePrism::Page
  section :global, AssessmentGlobal, 'body'
  section :breadcrumbs, Breadcrumbs, 'div.breadcrumb-container'
  section :header, AssessmentFormHeader, 'div.assessment-header-date'
  section :summary, AssessmentSummary, 'div.assessment-summary-card'
  section :footer, AssessmentFormFooter, 'div.form-footer'
  element :assessment_card_title_0_5, 'div.assessment-card-title', text: 'Age Range 0-5'
  element :caregiver_resource_domain_title, 'h2', text: 'Caregiver Resources And Needs Domain'
  element :assessment_card_title_6_21, 'div.assessment-card-title', text: 'Age Range 6-21'
  element :ec41_title, 'h2', text: 'EC41'
  element :sub7_title, 'h2', text: '7. SUBSTANCE USE'
  element :sub48a_title, 'h2', text: '48a. SUBSTANCE USE'
  elements :collapsed_domain_headers, 'div[aria-expanded="false"] h2'
  element :has_caregiver_no_label, '#has-caregiver-no'
  element :has_caregiver_yes_label, '#has-caregiver-yes'
  elements :inner_items, 'i.item-expand-icon'
  elements :process_counts, 'span.progress-value'
  elements :fully_filled_progress_bars, 'div[aria-valuenow="100"][role="progressbar"]'
  elements :domain_score_badges, 'span.domain-score-badge'
  element :challenges_domain, 'svg#domain5-expand'
  element :caregiver_domain, 'svg#domain11-expand'
  element :impulse_hyper_activity, 'i#IMPULSIVITY_HYPERACTIVITY-item-expand'
  element :impulse_hyper_activity_input, '#input-IMPULSIVITY_HYPERACTIVITY-0-select'
  element :expand_all_button, 'button', text: 'EXPAND ALL'
  element :collapse_all_button, 'button', text: 'COLLAPSE ALL'
  element :collapsed_chevron, 'div[aria-expanded="false"]'
  element :expanded_chevron, 'div[aria-expanded="true"]'
  elements :domain_level_reg_rating, 'div.item-reg-rating label'
  elements :domain_reg_radios, 'div.item-reg-rating input', visible: false
  elements :inner_item_rating, 'div.item-form-control label'
  elements :inner_item_radios, 'div.item-form-control input', visible: false
  elements :all_regular_ratings_1, 'div.item-reg-rating label', text: '1'
  elements :all_boolean_ratings_yes, 'div.item-bool-rating label', text: 'Yes'
  elements :discretion_checkbox, 'div.item-confidential-block label'
  elements :discretion_checkbox_inputs, 'div.item-confidential-block input', visible: false
  element :not_applicable_checkbox, 'label', text: 'N/A'
  element :not_applicable_text, 'h2', text: 'N/A'
  element :item_level_comment, 'div.item-comment-block textarea'
  element :domain_level_comment, 'div.domain-comment-block textarea'
  elements :domain_toolbar_comment_icon_block, 'div.domain-toolbar-comment-icon-block'
  # Caregiver domain specific elements
  elements :caregiver_domain_headers, 'h2', text: 'Caregiver Resources And Needs Domain'
  element :add_caregiver_button, 'div[aria-label="add caregiver button"]'
  elements :caregiver_name_fields, 'input.caregiver-name'
  elements :caregiver_domains_first_item_labels, '#SUPERVISION-regular-rating label'
  elements :caregiver_domains_first_item_radios, '#SUPERVISION-regular-rating input', visible: false
  element :remove_first_caregiver_domain_button,
          'div[aria-label="remove caregiver button"]',
          match: :first
  element :caregiver_domain_warning_popup, 'div.warning-modal-body'
  element :caregiver_domain_warning_message, 'div.warning-modal-body div div'
  elements :caregiver_domain_warning_popup_buttons, 'button.btn-secondary'
end

def fill_conducted_by_field(text)
  @form.header.conducted_by.set text
  expect(@form.header.conducted_by.value).to eq(text)
end

def check_case_or_referral_number
  expect(@form.header.case_or_referral.text).not_to be_empty
end

def click_0_to_5_button
  @form.header.age_0_to_5_button.click
end

def expand_all_domains
  click_button('Expand All')
  expect(@form).to have_collapse_all_button
  expect(@form).to have_no_collapsed_chevron
end

def collapse_all_domains
  click_button('Collapse All')
  expect(@form).to have_expand_all_button
  expect(@form).to have_no_expanded_chevron
end

def fill_out_assessment_form_with_rating_1
  @form.all_regular_ratings_1.each(&:click)
  @form.all_boolean_ratings_yes.each(&:click)
end

def save_and_check_the_success_message
  @form.global.save_button.click
  expect(@form.global).to have_global_save_success_message_box
end

def caregiver_domain_warning_remove_button
  @form.caregiver_domain_warning_popup_buttons[1]
end

def caregiver_domain_warning_cancel_button
  @form.caregiver_domain_warning_popup_buttons[0]
end