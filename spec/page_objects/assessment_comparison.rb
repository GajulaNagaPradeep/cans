# frozen_string_literal: true

class AssessmentComparison < SitePrism::Page
  element :comparison_table, 'div.comparison-grid'
  element :comparison_graph, 'div.comparison-graph-barchart'
  elements :comparison_outer_row, 'div.rt-tr-group'
  elements :comparison_rating_box, 'div.item-rating'
  elements :graph_legend, 'span.recharts-legend-item-text'
  element :age_switch_0to5, 'button#age-0-5-button'
  element :age_switch_6to21, 'button#age-6-21-button'
  element :graph_horizontal_axis, 'g.recharts-xAxis'
  elements :graph_horizontal_axis_ticks, 'text.recharts-cartesian-axis-tick-value'
  elements :graph_bars, 'g.recharts-bar-rectangle'
  element :graph_bar_tool_tip, 'ul.recharts-tooltip-item-list'
  elements :graph_bar_tool_tip_values, 'span.recharts-tooltip-item-value'
  element :comparison_table_header, 'span', text: 'Assessment Comparison'
  element :age_6_to_21_button_selected, 'button#age-6-21-button.age-button-selected'
  elements :graph_horizontal_axis_ticks, 'text.recharts-cartesian-axis-tick-value'
  elements :comparison_table_columns, 'div.rt-th.rt-resizable-header'
  element :comparison_table_column, 'div.rt-resizable-header-content', text: 'Domain Name'
  element :domain, 'div.rt-expandable'
  elements :domain_chevron, 'div.rt-td.rt-expandable'
  element :domain_chevron_expand, 'svg.fa-chevron-down'
  element :domain_item, 'div.rt-td.inner-item-name-content', text: 'Impulsivity/Hyperactivity'
  element :item_indicator, 'span.item-trending-indicator', match: :first
  element :item_indicator_icon, 'svg.fa-arrow-up', match: :first
  element :comparison_inner_table, 'div.inner-table'
  elements :inner_table_rows, 'div.rt-tr'
  elements :outer_table_expander, 'div.outer-expander'
  elements :table_body, 'div.domain-title'

  def click_age_switch_0to5
    age_switch_0to5.click
  end

  def click_age_switch_6to21
    age_switch_6to21.click
  end

  def has_age_0_5_button
    has_css? 'button#age-0-5-button'
  end

  def has_age_6_21_button
    has_css? 'button#age-6-21-button'
  end

  def completed_count
    all('.outer-header-text').size
  end
end
