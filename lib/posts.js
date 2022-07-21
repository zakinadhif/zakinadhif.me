import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

export function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug.at(-1)}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    slug,
    slugStr: slug.join('/'),
    ...matterResult.data,
  }
}

export function getSortedPostsData() {
  const allPostsData = getPostsData();

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getPostSlugs() {
  const allPostsData = getPostsData();

  return allPostsData.map((post) => ({
    params: {
      postSlug: post.slug
    }
  }));
}
