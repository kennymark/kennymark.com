import React from "react"
import Helmet from "react-helmet"


function SEO({ lang = 'en', title, description = "" }) {


  const meta = {
    author: 'Kenneth Coffie',
    description: `Kenny Mark's Personal Website. I am software engineer based in the Northwest. I am a front-end dev with fullstack experience who loves to code and build cool stuff. Currently employed at Sabs Travel Technologies`,
    title: 'Kenny Coffie',
    'og:description': '',
  }


  return (
    <Helmet htmlAttributes={{ lang, }}
      title={title}
      titleTemplate={`%s - ${meta.title}`}
      meta={[
        {
          name: `description`,
          content: description || meta.description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: meta,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: meta.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: meta.description,
        },
      ].concat()}
    />
  )
}



export default SEO
