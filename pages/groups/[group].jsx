import {
    groupPostsByYear,
    getPostGroups,
    getPostsInGroup,
  } from "../../lib/posts";
  import Layout from "../../components/layout";
  import Link from "next/link";
  import Head from "next/head";
  
  export default function Tag({ group, postsGroupedByYear }) {
    return (
      <Layout>
        <Head>
          <title>{`Zaki Nadhif | ${group}`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className="text-xl font-medium mb-4 text-bluemoon">
          Posts in group: <span className="underline">{group}</span>
        </h1>
        <ul>
          {postsGroupedByYear?.map(([year, posts]) => (
            <>
              <h2 className="text-lg font-medium my-2">{year}</h2>
              {posts.map((post) => (
                <li className="ml-4">
                  <time className="text-smoke mr-6" dateTime={post.date}>
                    {post.date}
                  </time>
                  <Link href={`/posts/${post.slugStr}`}>
                    <a className="hover:underline underline-offset-1">
                      {post.title}
                    </a>
                  </Link>
                </li>
              ))}
            </>
          ))}
        </ul>
      </Layout>
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
  