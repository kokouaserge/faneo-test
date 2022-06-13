import Head from "next/head";

interface TitleProps {
  title?: string;
}

const Title = ({ title }: TitleProps) => {
  const pageTitle = title || "test page";

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta charSet="utf-8" />
      <meta name="description" content="test screen" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <link rel="shortcut icon" href="/favicon.png" />
    </Head>
  );
};

export default Title;
