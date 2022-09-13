import NextHead from 'next/head';

const Head = ({ title }: { title: string }): JSX.Element => {
  return (
    <NextHead>
      <title>{`${title} | Trello`}</title>
    </NextHead>
  );
};

export default Head;
