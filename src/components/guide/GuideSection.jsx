import { useState } from 'react'

const icons = {
  book: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  mountain: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-9 9" />
    </svg>
  ),
  lightning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  alert: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
}

function ContentBlock({ title, content }) {
  const [isOpen, setIsOpen] = useState(false)

  // Parse markdown-style bold text
  const parseContent = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  // Convert bullet points to list
  const renderContent = (text) => {
    const paragraphs = text.split('\n\n')

    return paragraphs.map((para, i) => {
      const lines = para.split('\n')

      // Check if it's a bullet list
      if (lines.every(line => line.trim().startsWith('•') || line.trim() === '')) {
        const items = lines.filter(line => line.trim().startsWith('•'))
        return (
          <ul key={i} className="list-disc list-inside space-y-1 my-2 text-gray-600 dark:text-gray-300">
            {items.map((item, j) => (
              <li key={j}>{parseContent(item.replace('•', '').trim())}</li>
            ))}
          </ul>
        )
      }

      // Check if it's a numbered list
      if (lines[0] && /^\d\./.test(lines[0].trim())) {
        return (
          <ol key={i} className="list-decimal list-inside space-y-1 my-2 text-gray-600 dark:text-gray-300">
            {lines.filter(line => /^\d\./.test(line.trim())).map((item, j) => (
              <li key={j}>{parseContent(item.replace(/^\d\.\s*/, ''))}</li>
            ))}
          </ol>
        )
      }

      return (
        <p key={i} className="text-gray-600 dark:text-gray-300 my-2">
          {parseContent(para)}
        </p>
      )
    })
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 px-2 rounded-lg transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="pb-4 px-2">
          {renderContent(content)}
        </div>
      )}
    </div>
  )
}

export default function GuideSection({ title, icon, sections }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-500">
            {icons[icon] || icons.book}
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        <svg
          className={`w-6 h-6 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
          {sections.map((section, index) => (
            <ContentBlock
              key={index}
              title={section.title}
              content={section.content}
            />
          ))}
        </div>
      )}
    </div>
  )
}
