<script context="module">
  export const load = async ({ params }) => {
    /**
     * This is a redirect route from the old blog.
     * It's redirecting the route /2021/11/30/slug to /blog/2021/11/slug.
     */
    // let year = params.year;
    // let month = params.month;
    // let slug = params.slug;
    // return {
    //   status: 301,
    //   redirect: `/blog/${year}/${month}/${slug}`,
    // };

    // Redirects to the archived page.
    return {
      status: 301,
      redirect: `/blog/archived`,
    };
  };
</script>
