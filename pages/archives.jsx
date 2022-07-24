import { getSortedPostsData, groupPostsByYear } from "../lib/posts";
import Layout from "../components/layout";
import Head from "next/head";
import Link from "next/link";

export default function Archives({ postsGroupedByYear }) {
  return (
    <Layout>
      <Head>
        <title>Zaki Nadhif's Archives</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {postsGroupedByYear?.map(([year, posts]) => (
          <li key={year}>
            <h2 className="text-lg font-medium my-2">{year}</h2>
            <ul>
              {posts.map((post) => (
                <li className="ml-4 flex" key={post.slugStr}>
                  <time className="text-smoke mr-6 shrink-0" dateTime={post.date}>
                    {post.date}
                  </time>
                  <Link href={`/posts/${post.slugStr}`}>
                    <a className="hover:underline underline-offset-1">
                      {post.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getSortedPostsData();
  const postsGroupedByYear = groupPostsByYear(posts);

  return {
    props: {
      postsGroupedByYear,
    },
  };
}
