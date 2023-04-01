import Head from "next/head";
import Link from "next/link";
import Content from "../components/content";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home({ allPostsData }) {
  return (
    <Content>
      <Head>
        <title>Zaki Nadhif's About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1 className="text-xl font-bold text-bluemoon mb-2 mt-3">About Me</h1>
        <p>
          I'm Zaki Nadhif, a junior software developer from Indonesia. Currently a
          twelfth grader at SMK Telkom Malang.
        </p>
      </main>
      <Footer />
    </Content>
  );
}
