import { getPostTagsRaw, getPostGroupsRaw, getSortedPostsData, groupPostsByYear } from "../lib/posts";
import Layout from "../components/layout";
import Head from "next/head";
import Link from "next/link";

export default function Archives({ postsGroupedByYear, postTags, postGroups }) {
  return (
    <Layout>
      <Head>
        <title>Zaki Nadhif's Archives</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 bg-[#0e1018] border border-[#424964] rounded-md -mt-2 mb-4">
        <h2 className="font-medium">Tags:</h2>
        <div className="flex flex-wrap text-bluemoon space-x-3 mb-2">
          {postTags.map(tag => (<Link key={tag} href={`/tags/${tag}`}><a>#{tag}</a></Link>))}
        </div>
        <h2 className="font-medium">Notebooks:</h2>
        <div className="flex flex-wrap text-bluemoon space-x-3">
          {postGroups.map(group => (<Link key={group} href={`/groups/${group}`}><a>@{group}</a></Link>))}
        </div>
      </div>
      <ul>
        {postsGroupedByYear?.map(([year, posts]) => (
          <li key={year}>
            <h2 className="text-lg font-medium my-2">{year}</h2>
            <ul>
              {posts.map((post) => (
                <li className="md:ml-4 flex flex-col md:flex-row mb-1" key={post.slugStr}>
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
  const postTags = getPostTagsRaw();
  const postGroups = getPostGroupsRaw();

  return {
    props: {
      postsGroupedByYear,
      postTags,
      postGroups
    },
  };
}
