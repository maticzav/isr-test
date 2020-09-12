import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import React from 'react'

interface PageProps {
  message: string
}

export default function Home(props: PageProps) {
  const router = useRouter()

  /* Fallback loading indicator. */
  if (router.isFallback) return 'loading'

  return (
    <>
      {/* Message */}
      <p>{props.message}</p>
    </>
  )
}

/**
 * Generates props for this page.
 */
export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const date = new Date()

  return {
    props: {
      message: `It's ${date.toLocaleString()} o'clock.`,
    },
    revalidate: 30, // every 30 seconds
  }
}
