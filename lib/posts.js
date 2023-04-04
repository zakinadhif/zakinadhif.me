import fs from "fs";
import path from "path";
import readingTime from "reading-time";
import matter from "gray-matter";
import { unified } from "unified";
import remarkToc from "remark-toc";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkDirective from "remark-directive";
import find from "unist-util-find";
import { toString } from "mdast-util-to-string";
import { SKIP, visit } from "unist-util-visit";
import { toc } from "mdast-util-toc";
import { h } from "hastscript";

const postsDirectory = path.join(process.cwd(), "posts");

// Extract title and remove the node from the tree.
function remarkExtractAndRemoveTitle(options) {
  return (tree) => {
    if (!options || !options.destination)
      throw Error("No destination object specified");

    visit(tree, { type: "heading", depth: 1 }, (node, index, parent) => {
      parent.children.splice(index, 1);

      const articleTitle = toString(node);
      options.destination.title = articleTitle;

      return [SKIP, index];
    });
  };
}

// Prepend a markdown directive containing table of contents of the article
function remarkPrependTocDirective() {
  return (tree) => {
    const tableOfContentsNode = [
      {
        type: "containerDirective",
        name: "toc",
        attributes: {},
        children: [
          {
            type: "heading",
            depth: 2,
            children: [
              {
                type: "text",
                value: "Table of Contents",
              },
            ],
          },
          toc(tree, { ordered: true }).map,
        ],
      },
    ];

    tree.children = tableOfContentsNode.concat(tree.children);
  };
}

// Convert the toc markdown directive to appropriate html element
function remarkTocDirective() {
  return (tree) => {
    visit(tree, { type: "containerDirective", name: "toc" }, (node) => {
      const data = node.data || (node.data = {});
      const hast = h("div#toc-container");

      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    });
  };
}

// Give codeblock filename header
function enhanceCodeblock() {
  return (tree) => {
    visit(tree, { type: "element", tagName: "pre" }, (node, index, parent) => {
      const codeNode = node.children[0];
      const meta = codeNode.data?.meta;

      if (!meta) {
        return;
      }

      // Parse meta entries
      const metaEntries = Object.fromEntries(
        meta
          .split(" ")
          .map((entry) => entry.split("="))
          .filter((entry) => entry.length <= 2)
          .map((entry) => (entry.length === 1 ? [entry[0], true] : entry))
      );

      const filename = metaEntries?.filename;

      if (filename) {
        // Wrap pre in <figure> block
        const result = h("figure.code-figure", [
          h("figcaption", [h("span", filename)]),
          node,
        ]);
  
        // Replace with the new figure-wrapped codeblock
        parent.children[index] = result;
      }

      return;
    });
  };
}

function getPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Get title from first h1 element of the post
    const markdownTree = unified().use(remarkParse).parse(matterResult.content);

    // Find first heading in the markdown file
    const firstHeadingNode = find(markdownTree, { type: "heading", depth: 1 });
    const articleTitle = toString(firstHeadingNode);

    // Remove ".md" and prepend date to file name to get the slug
    const slug = [
      ...matterResult.data.date.split("-"),
      fileName.replace(/\.md$/, ""),
    ];

    // Combine the data with the id
    return {
      slug,
      slugStr: slug.join("/"),
      ...matterResult.data,
      title: articleTitle,
    };
  });
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug.at(-1)}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Title are taken from the markdown directly now instead of from gray matter.
  const markdownDetails = {};

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .data("settings", { fragment: true })
    .use(remarkParse)
    .use(remarkExtractAndRemoveTitle, { destination: markdownDetails })
    .use(remarkPrependTocDirective)
    .use(remarkTocDirective)
    .use(remarkDirective)
    .use(remarkRehype)
    .use(enhanceCodeblock)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeHighlight)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    slug,
    slugStr: slug.join("/"),
    contentHtml,
    readingTime: readingTime(matterResult.content).text,
    ...matterResult.data,
    ...markdownDetails,
  };
}

export function getSortedPostsData() {
  const allPostsData = getPostsData();

  // Sort posts by date
  return allPostsData.sort(comparePostByDate);
}

export function getPostSlugs() {
  const allPostsData = getPostsData();

  return allPostsData.map((post) => ({
    params: {
      postSlug: post.slug,
    },
  }));
}

export function getPostTags() {
  const tags = getPostTagsRaw();

  return tags.map((tag) => ({
    params: {
      tag,
    },
  }));
}

export function getPostTagsRaw() {
  const allPostsData = getPostsData();

  const tags = new Set();
  allPostsData.forEach((postData) => {
    postData.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags);
}

export function getPostGroups() {
  const groups = getPostGroupsRaw();

  return groups.map((group) => ({
    params: {
      group,
    },
  }));
}

export function getPostGroupsRaw() {
  const allPostsData = getPostsData();

  const groups = new Set();
  allPostsData.forEach((postData) => {
    if (postData.group) {
      groups.add(postData.group);
    }
  });

  return Array.from(groups);
}

export function getPostsWithTag(tag) {
  return getPostsData()
    .filter((postData) => postData.tags?.includes(tag))
    .sort(comparePostByDate);
}

export function getPostsInGroup(group) {
  return getPostsData()
    .filter((postData) => postData.group === group)
    .sort(comparePostByDate);
}

export function groupPostsByYear(posts) {
  const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
      var v = key instanceof Function ? key(x) : x[key];
      (rv[v] = rv[v] || []).push(x);
      return rv;
    }, {});
  };

  const getYearOfPost = (post) => post.date.slice(0, 4);

  const postsGroupedByYear = groupBy(posts, getYearOfPost);

  return Object.entries(postsGroupedByYear).sort(
    ([yearA], [yearB]) => yearB - yearA
  );
}

function comparePostByDate({ date: a }, { date: b }) {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
}
