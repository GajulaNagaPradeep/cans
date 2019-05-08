import React from 'react'
import PropTypes from 'prop-types'
import { summaryInnerContainer, summaryTitle, summaryContent, summaryItem } from './PrintAssessmentStyle'

export const PrintSummaryRecord = ({ title, items }) => {
  return (
    <td style={summaryInnerContainer}>
      <div id="summary-header" style={summaryTitle}>
        {title}
      </div>
      <ul style={summaryContent} id="val">
        {items &&
          items.map(val => {
            return val ? (
              <li style={summaryItem} id="item" key={val}>
                {val}
              </li>
            ) : null
          })}
      </ul>
    </td>
  )
}

PrintSummaryRecord.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default PrintSummaryRecord
