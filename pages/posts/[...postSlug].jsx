import { getPostSlugs, getPostData } from "../../lib/posts";
import Footer from "../../components/footer";
import Head from "next/head";
import Link from "next/link";

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
    <div className="font-roboto-mono bg-[#161A26] text-whitesmoke overflow-auto px-5">
      <Head>
        <title>{`${postData.title} | Zaki Nadhif`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col max-w-2xl w-full mx-auto min-h-screen">
        <Link href="../">
          <a className="flex items-center gap-2 mt-8 hover:text-bluemoon self-start"><i className="ri-arrow-left-line text-2xl hover:no-underline" /> Go Back</a>
        </Link>
        <article className="grow mt-8">
          <header>
            <h1 className="text-4xl mb-1 font-bold text-bluemoon tracking-tight">
              {postData.title}
            </h1>
            <span className="text-whitesmoke text-sm font-medium">
              {renderPostMetadata()}
            </span>
          </header>
          <div
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            className="mt-4"
            id="article-container"
          />
        </article>
        <Footer />
      </div>
    </div>
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
