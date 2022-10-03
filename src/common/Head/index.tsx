import { Helmet } from 'react-helmet-async';

const Head = ({ title }: { title: string }): JSX.Element => {
  return (
    <Helmet>
      <title>{`${title} | Trello`}</title>
    </Helmet>
  );
};

export default Head;
