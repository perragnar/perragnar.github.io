/**
 * Getting an array containing the years from the blog post index.
 */
export const getYearsFromIndex = (blogPosts) => {
  let years = [];

  if (blogPosts) {
    Object.entries(blogPosts).forEach(([year]) => {
      if (!isNaN(year)) {
        // Filter the posts.
        const filteredPosts = blogPosts[year].filter((post) => {
          return (post.metadata.status || 'published') === 'published';
        });

        // Returns the year if it contains filtered posts.
        if (filteredPosts.length) {
          years.push(year);
        }
      }
    });

    years.sort(function (a, b) {
      return b - a;
    });
  }

  return years;
};

/**
 * Getting a list of blog posts for a given year.
 */
export const getYearPosts = (blogPosts, year) => {
  blogPosts = blogPosts[year] || [];

  // Filter the posts.
  const filteredPosts = blogPosts.filter((post) => {
    return (post.metadata.status || 'published') === 'published';
  });

  return filteredPosts;
};

/**
 * Getting a list of blog posts for all years.
 */
export const getAllPosts = (blogPosts) => {
  let posts = [];

  Object.entries(blogPosts).forEach(([year]) => {
    // Filter the posts.
    const filteredPosts = blogPosts[year].filter((post) => {
      return (post.metadata.status || 'published') === 'published';
    });

    filteredPosts.forEach((post) => {
      posts.push(post);
    });
  });

  posts.sort((a, b) => {
    return new Date(a.metadata.date).getTime() < new Date(b.metadata.date).getTime() ? 1 : -1;
  });

  return posts;
};

/**
 * Getting a list of latest blog posts.
 */
export const getLatestPosts = (blogPosts, limit = 3) => {
  let posts = [];

  Object.entries(blogPosts).forEach(([year]) => {
    // Filter the posts.
    const filteredPosts = blogPosts[year].filter((post) => {
      return (post.metadata.status || 'published') === 'published';
    });

    filteredPosts.forEach((post) => {
      posts.push(post);
    });
  });

  posts.sort((a, b) => {
    return new Date(a.metadata.date).getTime() < new Date(b.metadata.date).getTime() ? 1 : -1;
  });

  return posts.slice(0, limit);
};
