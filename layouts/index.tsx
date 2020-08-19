import React, { ReactNode } from 'react'

type FrontMatter = {
  title: string
  snippet: string
}

export default ({ title, snippet }: FrontMatter) => ({ children }: { children }) => (
  <div>
    <h1>{title}</h1>
    <p>{snippet}</p>
    <section>{children}</section>
  </div>
)