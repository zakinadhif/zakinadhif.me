import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>Zaki Nadhif's dot Me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-2xl text-bluemoon mb-4 font-medium">Writing</h2>
      <ul className="space-y-1 font-medium">
        {allPostsData.map(({ slugStr, date, title }) => (
          <li className="" key={slugStr}>
            <span className="text-smoke mr-8">{date}</span>
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
