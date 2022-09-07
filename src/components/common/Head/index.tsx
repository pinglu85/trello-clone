import NextHead from 'next/head';

const Head: React.FC<{ title: string }> = ({ title }) => {
  return (
    <NextHead>
      <title>{title} | Trello</title>
    </NextHead>
  );
};

export default Head;
