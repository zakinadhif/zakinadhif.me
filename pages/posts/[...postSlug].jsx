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

  return (
    <div className="font-roboto-mono bg-[#161A26] text-whitesmoke">
      <Head>
        <title>{postData.title} | Zaki Nadhif</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col max-w-2xl w-full mx-auto min-h-screen">
        <div className="grow mt-8">
          <h1 className="text-2xl font-medium text-bluemoon tracking-tight">
            {postData.title}
          </h1>
          <span className="text-whitesmoke text-sm font-medium">
            {postData.group ? (
              <Link href={`/groups/${postData.group}`}>
                <a className="font-bold uppercase hover:underline">
                  {postData.group}
                </a>
              </Link>
            ) : (
              <span className="font-bold uppercase">zaki_nadhif.txt</span>
            )}
            {` ${postData.date} | ${postData.readingTime}`}
            {postData.tags ? (
              <>
                {" | "}
                <i className="ri-price-tag-3-fill"></i>
                {getTags()}
              </>
            ) : null}
          </span>
          <div
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            className="mt-4"
          ></div>
        </div>
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
