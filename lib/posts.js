import fs from 'fs';
import path from 'path';
import readingTime from "reading-time";
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';


const postsDirectory = path.join(process.cwd(), 'posts');

function getPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Remove ".md" and prepend date to file name to get the slug
    const slug = [...matterResult.data.date.split('-'), fileName.replace(/\.md$/, '')];

    // Combine the data with the id
    return {
      slug,
      slugStr: slug.join('/'),
      ...matterResult.data,
    };
  });
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug.at(-1)}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .data('settings', {fragment: true})
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(matterResult.content)
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    slug,
    slugStr: slug.join('/'),
    contentHtml,
    readingTime: readingTime(matterResult.content).text,
    ...matterResult.data,
  }
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
      postSlug: post.slug
    }
  }));
}

export function getPostTags() {
  const tags = getPostTagsRaw();

  return tags.map((tag) => ({
    params: {
      tag
    }
  }));
}

export function getPostTagsRaw() {
  const allPostsData = getPostsData();

  const tags = new Set();
  allPostsData.forEach((postData) => {
    postData.tags?.forEach(tag => tags.add(tag));
  })

  return Array.from(tags);
}

export function getPostGroups() {
  const groups = getPostGroupsRaw();

  return groups.map(group => ({
    params: {
      group
    }
  }))
}

export function getPostGroupsRaw() {
  const allPostsData = getPostsData();

  const groups = new Set();
  allPostsData.forEach((postData) => {
    if (postData.group) {
      groups.add(postData.group);
    }
  })

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
    return xs.reduce(function(rv, x) {
        var v = key instanceof Function ? key(x) : x[key];
        (rv[v] = rv[v] || []).push(x); return rv; 
    }, {}); 
  }

  const getYearOfPost = (post) => post.date.slice(0, 4);

  const postsGroupedByYear = groupBy(posts, getYearOfPost);

  return Object.entries(postsGroupedByYear).sort(([yearA], [yearB]) => yearB - yearA);
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
