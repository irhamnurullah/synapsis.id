import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function getData() {
    const response = await axios.get(`https://gorest.co.in/public/v2/posts`);
    const result = response.data;
    setPosts(result);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container mx-auto mt-4">
          <ul className="space-y-3">
            {posts.map((post, index) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <div className="p-4 border rounded-xl">
                  <li>
                    {index + 1}. {post.title}
                  </li>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
