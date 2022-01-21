import { readable } from 'svelte/store';
import { v4 as uuid } from 'uuid';

/**
 * Gets all posts from markdown files.
 */
export const getPosts = () => {
  let posts = Object.entries(import.meta.globEager('/src/routes/blog/_content/**/*.md'))
    .map(([path, post]) => ({
      id: uuid(),
      metadata: post.metadata,
      route: `/blog/${new Date(post.metadata.date).getFullYear()}/${String(
        new Date(post.metadata.date).getMonth() + 1
      ).padStart(2, '0')}/${post.metadata.slug}`,
      year: new Date(post.metadata.date).getFullYear(),
    }))
    .sort((a, b) => {
      return new Date(a.metadata.date).getTime() < new Date(b.metadata.date).getTime() ? 1 : -1;
    });

  return posts;
};

/**
 * Groups an array of objects by object parameter.
 */
export const groupArrayByObjectParameter = (array, parameter) => {
  const groupedArray = array.reduce(function (r, a) {
    r[a[parameter]] = r[a[parameter]] || [];
    r[a[parameter]].push(a);
    return r;
  }, Object.create(null));

  return groupedArray;
};

// Getting an array of all posts from markdown files.
let posts = getPosts();

// Grouping the posts by year.
posts = groupArrayByObjectParameter(posts, 'year');

// Creating the blog posts store.
export const blogPostsStore = readable(posts);
