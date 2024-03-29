import {
  groupPostsByYear,
  getPostGroups,
  getPostsInGroup,
} from "../../lib/posts";
import Link from "next/link";
import Head from "next/head";

import Content from "../../components/content";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function Tag({ group, postsGroupedByYear }) {
  return (
    <Content>
      <Head>
        <title>{`Zaki Nadhif | ${group}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1 className="text-xl font-medium mb-4 text-bluemoon">
          Posts in group: <span className="underline">{group}</span>
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
      </main>
      <Footer />
    </Content>
  );
}

export function getStaticPaths() {
  const groups = getPostGroups();

  return {
    paths: groups,
    fallback: true,
  };
}

export function getStaticProps({ params }) {
  const postsGroupedByYear = groupPostsByYear(getPostsInGroup(params.group));

  return {
    props: {
      group: params.group,
      postsGroupedByYear,
    },
  };
}
