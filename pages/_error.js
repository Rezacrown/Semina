import ErrorPage from "next/error";


export default function Custom404({ statusCode }) {
  return <ErrorPage statusCode={statusCode} />;
}

Custom404.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode};
};

// Custom400.getInitialProps = ({ res, err }) => {
//     const statusCode = res?.statusCode || err?.statusCode || 400;
//     return { statusCode };
// }