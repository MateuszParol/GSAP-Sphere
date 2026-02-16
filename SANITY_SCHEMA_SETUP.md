# Sanity Schema Setup Instructions

Since we are connecting to an existing or new Sanity project, you need to define the `project` schema in your Sanity Studio.

1.  **Open your Sanity Studio code** (wherever you hosted/initialized it).
2.  **Create a file** `schemas/project.js`:

```javascript
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
        name: 'liveUrl',
        title: 'Live URL',
        type: 'url'
    },
    {
        name: 'repoUrl',
        title: 'Repo URL',
        type: 'url'
    }
  ],
}
```

3.  **Import and add** this schema to your `sanity.config.js` or `schemas/index.js` schema types array.

6.  **CORS Configuration (CRITICAL)**:
    -   Go to [sanity.io/manage](https://www.sanity.io/manage).
    -   Select your project (`90u1xxaj`).
    -   Go to **API** tab > **CORS Origins**.
    -   Add `http://localhost:5173` (Allow credentials).
    -   *Without this, the frontend cannot fetch data.*
