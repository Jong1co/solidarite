import React from "react";
import Layout from "../layout/Layout";

const Home = () => {
  return (
    <Layout>
      <input type='text' />
      <nav>
        <button>A Posts</button>
        <button>B Posts</button>
      </nav>
      <main>
        <section>1.</section>
        <section>2.</section>
      </main>
    </Layout>
  );
};

export default Home;
