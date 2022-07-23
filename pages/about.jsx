import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>Zaki Nadhif's dot Me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-2xl font-medium text-bluemoon mb-2">About Me</h1>
      <p>
        I'm Zaki Nadhif, a junior software developer from Indonesia. Currently a
        twelfth grader at SMK Telkom Malang.
      </p>
    </Layout>
  );
}
