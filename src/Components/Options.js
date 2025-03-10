import React from 'react'

export default function Options({question}) {
  return (
    <div className="options">
        {question.options.map((option) => (
          <button key={question.id} className="btn btn-option"> {option} </button>
        ))}
      </div>
  )
}
