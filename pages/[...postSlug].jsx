import { getPostSlugs, getPostData } from "../lib/posts"
import Layout from "../components/postLayout"

export default function Post({ postData }) {
  console.log(postData);
  return (
    <Layout>
      <h1 className="text-2xl font-medium text-bluemoon">{postData.title}</h1>
      <span className="text-whitesmoke">{postData.date}</span>
    </Layout>
  );
}

export function getStaticPaths() {
  const paths = getPostSlugs();
  return {
    paths,
    fallback: false
  }
}

export function getStaticProps({ params }) {
  const postData = getPostData(params.postSlug);
  return {
    props: {
      postData
    }
  }
}
