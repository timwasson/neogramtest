import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // HTML Base plugin for managing subpaths (like GitHub Pages /neogramtest/)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Passthrough copy for static assets & compiled CSS
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  // Custom filters
  eleventyConfig.addFilter("formatDate", (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return String(dateStr);
    }
  });

  eleventyConfig.addFilter("uppercase", (str) => {
    return str ? String(str).toUpperCase() : "";
  });

  eleventyConfig.addFilter("currentYear", () => {
    return new Date().getFullYear();
  });

  return {
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
