const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");

module.exports = function (eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy("./src/img/");
  eleventyConfig.addPassthroughCopy("./src/js/");

  eleventyConfig.addPlugin(eleventySass);

  eleventyConfig.addFilter('upcomingEvents', function(events) {
    const currentDate = new Date();
    const currentDateString = Number(currentDate.toISOString().slice(0,10).replace(/-/g, ''));
    return events.filter(event => {
      const filename = event.filePathStem.split('/').pop();
      const eventDate = Number(filename.slice(0,8));
      return eventDate >= currentDateString;
    });
  });

  eleventyConfig.addFilter('pastEvents', function(events) {
    const currentDate = new Date();
    const currentDateString = Number(currentDate.toISOString().slice(0,10).replace(/-/g, ''));
    // return events.filter(event => {
    //   const filename = event.filePathStem.split('/').pop();
    //   const eventDate = Number(filename.slice(0,8));
    //   return eventDate < currentDateString;
    // });
    // Filter past events
    const pastEvents = events.filter(event => {
      const filename = event.filePathStem.split('/').pop();
      const eventDate = Number(filename.slice(0,8)); // Extract event date from the filename
      return eventDate < currentDateString;
    });

    // Sort the past events in reverse order (most recent first)
    return pastEvents.sort((a, b) => {
      const aDate = Number(a.filePathStem.split('/').pop().slice(0,8));
      const bDate = Number(b.filePathStem.split('/').pop().slice(0,8));
      return bDate - aDate; // Reverse order sorting (descending)
    });
  });

  return {
    pathPrefix: "/pose/", // The base path in github
    dir: {
      input: "src",
      output: "public",
    },
  };
};
