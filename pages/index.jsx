import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { getSortedPostsData } from '../lib/posts'

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
    <Layout>
      <Head>
        <title>Zaki Nadhif's Notes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="mb-8">
        I'm Zaki Nadhif, a junior software developer from Indonesia. Currently a
        twelfth grader at SMK Telkom Malang.
      </p>
      <h2 className="text-2xl text-bluemoon mb-4 font-medium">Writing</h2>
      <ul className="space-y-3 md:space-y-1 font-medium">
        {allPostsData.map(({ slugStr, date, title }) => (
          <li className="flex md:flex-row flex-col" key={slugStr}>
            <time className="text-smoke mr-8 shrink-0" dateTime={date}>{formatDate(date)}</time>
            <span className="underline underline-offset-1"><Link href={`/posts/${slugStr}`}><a>{title}</a></Link></span>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl text-bluemoon mb-4 font-medium mt-7">Projects</h2>
      <ul className="space-y-1 font-medium">
        <li><a className="underline underline-offset-1" href="https://github.com/cowdingus/SpaceShooter/tree/engine">Egienx</a>: A toy C++ game engine with Lua Scripting.</li>
        <li><a className="underline underline-offset-1" href="https://example.com">Smart Garden</a>: Backyard garden automation with Arduino Uno.</li>
      </ul>
    </Layout>
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
