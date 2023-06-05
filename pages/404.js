import Head from "next/head";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      
          <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <div className="" style={{margin: '40vh 0'}}>Halaman Tidak ditemukan</div>
          </div>
    </>
  );
};

export default Custom404;
