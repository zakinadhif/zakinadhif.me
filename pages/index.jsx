import Head from 'next/head'
import Link from 'next/link'
import Content from '../components/content'
import { getSortedPostsData } from '../lib/posts'

import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home({ allPostsData }) {
  const formatDate = (d) => {
    const date = new Date(d);

    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May',
      'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
      'Nov', 'Dec'
    ]

    return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()}`;
  }

  return (
    <Content>
      <Head>
        <title>Zaki Nadhif's Notes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <section id="about">
          <p className="my-3">
            I'm Zaki Nadhif, a junior software developer from Indonesia. Currently a
            twelfth grader at SMK Telkom Malang.
          </p>
        </section>
        <section id="writing">
          <h2 className="h2 flex items-center gap-4"><i className="ri-newspaper-fill font-medium" />Writing</h2>
          <ul className="space-y-3 md:space-y-1 font-medium my-4">
            {allPostsData.map(({ slugStr, date, title }) => (
              <li className="flex md:flex-row flex-col" key={slugStr}>
                <time className="text-smoke mr-8 shrink-0" dateTime={date}>{formatDate(date)}</time>
                <span className="underline underline-offset-1"><Link href={`/posts/${slugStr}`}><a>{title}</a></Link></span>
              </li>
            ))}
          </ul>
        </section>
        <section id="projects">
          <h2 className="h2 flex items-center gap-4"><i class="ri-code-s-slash-line font-medium" />Projects</h2>
          <ul className="space-y-1 font-medium">
            <li><a className="underline underline-offset-1" href="https://github.com/cowdingus/SpaceShooter/tree/engine">Egienx</a>: A WIP toy C++ game engine</li>
          </ul>
        </section>
      </main>
      <Footer />
    </Content>
  )
}

export function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData
    }
  };
}
