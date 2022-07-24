import {
  getPostTags,
  getPostsWithTag,
  groupPostsByYear,
} from "../../lib/posts";
import Layout from "../../components/layout";
import Link from "next/link";
import Head from "next/head";

export default function Tag({ tag, postsGroupedByYear }) {
  return (
    <Layout>
      <Head>
        <title>{`Zaki Nadhif | ${tag} Posts`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-xl font-medium mb-4 text-bluemoon">
        Posts with tag: <span className="underline">{tag}</span>
      </h1>
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

export function getStaticPaths() {
  const tags = getPostTags();

  return {
    paths: tags,
    fallback: true,
  };
}

export function getStaticProps({ params }) {
  const posts = getPostsWithTag(params.tag);
  const postsGroupedByYear = groupPostsByYear(posts);

  return {
    props: {
      tag: params.tag,
      postsGroupedByYear,
    },
  };
}
