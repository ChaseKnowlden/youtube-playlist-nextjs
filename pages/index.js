import { useCallback, useEffect, useState } from 'react'
import styles from '../styles/home.module.css'

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

export async function getServerSideProps() {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLexbWs0Wp_H6AnPZ1NQ3UvKUSWUzMsNnR&key=${process.env.YOUTUBE_API_KEY}`)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        My Talks
      </h1>
      <ul className={styles.grid}>
        {data.items.map(({ id, snippet = {} }) => {
          const { title, thumbnails = {}, resourceId = {} } = snippet;
          const { medium } = thumbnails;
          return (
            <li key={id} className={styles.card}>
              <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
                <p>
                  <img width={medium.width} height={medium.height} src={medium.url} alt="" />
                </p>
                <h3>{ title }</h3>
              </a>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
