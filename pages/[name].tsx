import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

interface PageProps {
  name: string
  message: string
}

export default function Name(props: PageProps) {
  const router = useRouter()

  /* Fallback loading indicator. */
  if (router.isFallback) return 'loading'

  return (
    <>
      {/* Name */}
      <p>Hi {props.name}</p>
      {/* Message */}
      <p>{props.message}</p>
    </>
  )
}

/**
 * Find all possible name paths.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const names = ['matic', 'jure']

  return {
    paths: names.map((name) => ({
      params: {
        name,
      },
    })),
    fallback: true,
  }
}

/**
 * Generates props for this page.
 */
export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const date = new Date()

  return {
    props: {
      name: context.params.name! as string,
      message: `It's ${date.toLocaleString()} o'clock.`,
    },
    revalidate: 30, // every 30 seconds
  }
}
