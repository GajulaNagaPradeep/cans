# frozen_string_literal: true

class AssessmentComparison < SitePrism::Page
  element :comparison_table, 'div.comparison-grid'
  element :comparison_graph, 'div.comparison-graph-barchart'
  elements :comparison_outter_row, 'div.rt-tr-group'
  elements :comparison_outter_rating_box, 'div.item-rating'
  elements :graph_legend, 'span.recharts-legend-item-text'
  element :age_switch_0to5, 'button#age-0-5-button'
  element :age_switch_6to21, 'button#age-6-21-button'
  element :graph_horizontal_axis, 'g.recharts-xAxis'
  elements :graph_horizontal_axis_ticks, 'text.recharts-cartesian-axis-tick-value'
  elements :graph_bars, 'g.recharts-bar-rectangle'
  element :graph_bar_tool_tip, 'ul.recharts-tooltip-item-list'
  elements :graph_bar_tool_tip_values, 'span.recharts-tooltip-item-value'

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
