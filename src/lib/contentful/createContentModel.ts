import { createClient } from 'contentful-management';

// Initialize the Contentful client
const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN || ''
});

async function createContentModel() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID || '');
    const environment = await space.getEnvironment('master');

    // Create Category Content Type
    const categoryContentType = await environment.createContentTypeWithId('category', {
      name: 'Category',
      description: 'Categories for organizing blog content',
      displayField: 'name',
      fields: [
        {
          id: 'name',
          name: 'Name',
          type: 'Text',
          required: true,
          validations: [
            {
              unique: true
            }
          ]
        },
        {
          id: 'slug',
          name: 'Slug',
          type: 'Symbol',
          required: true,
          validations: [
            {
              unique: true
            },
            {
              regexp: {
                pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
                flags: null
              },
              message: 'Slug must be URL friendly. Use only lowercase letters, numbers, and hyphens.'
            }
          ]
        }
      ]
    });

    // Create Author Content Type
    const authorContentType = await environment.createContentTypeWithId('author', {
      name: 'Author-name',
      description: 'Authors who contribute to the blog',
      displayField: 'name',
      fields: [
        {
          id: 'name',
          name: 'Name',
          type: 'Text',
          required: true
        },
        {
          id: 'bio',
          name: 'Biography',
          type: 'Text',
          required: false
        },
        {
          id: 'profilePicture',
          name: 'Profile Picture',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          validations: [
            {
              linkMimetypeGroup: ['image']
            }
          ]
        },
        {
          id: 'email',
          name: 'Email',
          type: 'Symbol',
          required: false,
          validations: [
            {
              regexp: {
                pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
                flags: null
              },
              message: 'Please enter a valid email address'
            }
          ]
        }
      ]
    });

    // Create Blog Post Content Type
    const blogPostContentType = await environment.createContentTypeWithId('blogPost', {
      name: 'Blog Post',
      description: 'Blog articles for The Terminal Times',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Text',
          required: true,
          validations: [
            {
              size: {
                min: 10,
                max: 100
              },
              message: 'Title must be between 10 and 100 characters'
            }
          ]
        },
        {
          id: 'slug',
          name: 'Slug',
          type: 'Symbol',
          required: true,
          validations: [
            {
              unique: true
            },
            {
              regexp: {
                pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
                flags: null
              },
              message: 'Slug must be URL friendly. Use only lowercase letters, numbers, and hyphens.'
            }
          ]
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: false,
          validations: [
            {
              size: {
                max: 160
              },
              message: 'Description should not exceed 160 characters for SEO purposes'
            }
          ]
        },
        {
          id: 'content',
          name: 'Content',
          type: 'RichText',
          required: true,
          validations: [
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
                'hyperlink',
                'entry-hyperlink',
                'asset-hyperlink',
                'paragraph'
              ]
            }
          ]
        },
        {
          id: 'publishDate',
          name: 'Publish Date',
          type: 'Date',
          required: true
        },
        {
          id: 'author',
          name: 'Author',
          type: 'Link',
          linkType: 'Entry',
          required: true,
          validations: [
            {
              linkContentType: ['author']
            }
          ]
        },
        {
          id: 'categories',
          name: 'Categories',
          type: 'Array',
          items: {
            type: 'Link',
            linkType: 'Entry',
            validations: [
              {
                linkContentType: ['category']
              }
            ]
          }
        },
        {
          id: 'featuredImage',
          name: 'Featured Image',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          validations: [
            {
              linkMimetypeGroup: ['image']
            }
          ]
        },
        {
          id: 'seoMetadata',
          name: 'SEO Metadata',
          type: 'Object',
          required: false
        }
      ]
    });

    // Publish all content types
    await Promise.all([
      categoryContentType.publish(),
      authorContentType.publish(),
      blogPostContentType.publish()
    ]);

    console.log('All content types created and published successfully!');
    return true;

  } catch (error) {
    console.error('Error creating content model:', error);
    throw error;
  }
}

export default createContentModel; 