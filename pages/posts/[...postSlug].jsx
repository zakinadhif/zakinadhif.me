import { getPostSlugs, getPostData } from "../../lib/posts";
import Head from "next/head";
import Link from "next/link";

import Content from "../../components/content";
import Footer from "../../components/footer";

export default function Post({ postData }) {
  const getTags = () => {
    return postData.tags.map((tag, i, arr) => (
      <span key={i}>
        {" "}
        <Link href={`/tags/${tag}`}>
          <a className="underline underline-offset-1">{`#${tag}`}</a>
        </Link>
        {i != arr.length - 1 ? "," : ""}
      </span>
    ));
  };

  const renderPostGroup = () => {
    return (
      <>
        {postData.group ? (
          <Link href={`/groups/${postData.group}`}>
            <a className="font-bold uppercase hover:underline">
              {postData.group}
            </a>
          </Link>
        ) : (
          <span className="font-bold uppercase">zaki_nadhif.txt</span>
        )}
      </>
    )
  }

  const renderPostMetadata = () => {
    return (
      <>
        {renderPostGroup()}
        {` ${postData.date} | ${postData.readingTime}`}
        {postData.tags ? (
          <>
            {" | "}
            <i className="ri-price-tag-3-fill"></i>
            {getTags()}
          </>
        ) : null}
      </>
    );
  }

  return (
    <Content>
      <Head>
        <title>{`${postData.title} | Zaki Nadhif`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="../">
        <a className="flex items-center gap-2 hover:text-bluemoon self-start"><i className="ri-arrow-left-line text-2xl hover:no-underline" /> Go Back</a>
      </Link>
      <main className="mt-8">
        <header>
          <h1 className="text-2xl font-extrabold text-bluemoon tracking-tight">
            {postData.title}
          </h1>
          <span className="text-whitesmoke text-sm font-medium">
            {renderPostMetadata()}
          </span>
        </header>
        <div
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          id="article-container"
        />
      </main>
      <Footer />
    </Content>
  );
}

export function getStaticPaths() {
  const paths = getPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.postSlug);
  return {
    props: {
      postData,
    },
  };
}
