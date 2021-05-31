import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout/Layout'
import styles from '../styles/Home.module.css'
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from '../components/CountriesTable/CountriesTable';

export default function Home({countries}) {
  console.log({countries});                   // await function get the data first, then run this line
  // we already created a props name {children} in Layout, so everything now we add to Layout is {children}
  return (
    <Layout>                             
      <div className={styles.counts}> Found {countries.length} countries. </div>
      <SearchInput placeholder="Filter by Name, Region or Sub Region" />
      <CountriesTable countries={countries} />
  
    </Layout>
  );
    
};

export const getStaticProps= async()=>{  //nextJs will pre-render this page at build time using the props returned by this function
  const res= await fetch("https://restcountries.eu/rest/v2/all");
  const countries=  await res.json();
  return {
    props: {
      countries,
    },
  };

};
