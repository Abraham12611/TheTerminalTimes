module.exports = function (migration) {
  // Create Category Content Type
  const category = migration.createContentType('category')
    .name('Category')
    .description('Categories for organizing blog content')
    .displayField('name');

  category.createField('name')
    .name('Name')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  category.createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([
      { unique: true },
      {
        regexp: {
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
        },
        message: 'Slug must be URL friendly. Use only lowercase letters, numbers, and hyphens.'
      }
    ]);

  // Create Author Content Type
  const author = migration.createContentType('author')
    .name('Author')
    .description('Authors who contribute to the blog')
    .displayField('name');

  author.createField('name')
    .name('Name')
    .type('Symbol')
    .required(true);

  author.createField('bio')
    .name('Biography')
    .type('Text')
    .required(false);

  author.createField('profilePicture')
    .name('Profile Picture')
    .type('Link')
    .linkType('Asset')
    .required(false)
    .validations([
      { linkMimetypeGroup: ['image'] }
    ]);

  author.createField('email')
    .name('Email')
    .type('Symbol')
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
        },
        message: 'Please enter a valid email address'
      }
    ]);

  // Create Blog Post Content Type
  const blogPost = migration.createContentType('blogPost')
    .name('Blog Post')
    .description('Blog articles for The Terminal Times')
    .displayField('title');

  blogPost.createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { min: 10, max: 100 },
        message: 'Title must be between 10 and 100 characters'
      }
    ]);

  blogPost.createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([
      { unique: true },
      {
        regexp: {
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
        },
        message: 'Slug must be URL friendly. Use only lowercase letters, numbers, and hyphens.'
      }
    ]);

  blogPost.createField('description')
    .name('Description')
    .type('Text')
    .required(false)
    .validations([
      {
        size: { max: 160 },
        message: 'Description should not exceed 160 characters for SEO purposes'
      }
    ]);

  blogPost.createField('content')
    .name('Content')
    .type('RichText')
    .required(true)
    .validations([
      {
        enabledMarks: ['bold', 'italic', 'underline', 'code'],
        message: 'Only bold, italic, underline, and code marks are allowed'
      },
      {
        enabledNodeTypes: [
          'heading-1',
          'heading-2', 
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'embedded-entry-block',
          'embedded-asset-block',
          'embedded-entry-inline',
          'hyperlink',
          'entry-hyperlink',
          'asset-hyperlink'
        ]
      }
    ]);

  blogPost.createField('publishDate')
    .name('Publish Date')
    .type('Date')
    .required(true);

  blogPost.createField('author')
    .name('Author')
    .type('Link')
    .linkType('Entry')
    .required(true)
    .validations([
      { linkContentType: ['author'] }
    ]);

  blogPost.createField('categories')
    .name('Categories')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['category'] }]
    });

  blogPost.createField('featuredImage')
    .name('Featured Image')
    .type('Link')
    .linkType('Asset')
    .required(false)
    .validations([
      { linkMimetypeGroup: ['image'] }
    ]);

  blogPost.createField('seoMetadata')
    .name('SEO Metadata')
    .type('Object')
    .required(false);
}; 