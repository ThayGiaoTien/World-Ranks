import { StylesProvider } from "@material-ui/styles";
import styles from "./Country.module.css";
import Layout from "../../components/Layout/Layout";
const Country=({country})=>{
    return (
        <Layout title={country.name}>
            <div>
                <div className={styles.overviewPanel}>
                    <img src={country.flag} alt={country.name}/>
                    <h1 className={styles.overview_name}>{country.name}</h1>
                    <div className={styles.overview_region}>{country.region}</div>

                    <div className= {styles.overview_numbers}>
                        <div className= {styles.overview_population}>
                            <div className={styles.overview_label}> Population</div>
                            <div className={styles.overview_value}>{country.population}</div>
                        </div>
                        <div className={styles.overview_area}>
                            <div className={styles.overview_label}>Area</div>
                            <div className={styles.overview_value}>{country.area}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>   
    );
};
export default Country;

export const getServerSideProps = async({params}) =>{
    const res= await fetch(`https://restcountries.eu/rest/v2/alpha/${params.id}`);
    const country= await res.json();
    console.log(country);
    return {        
        props: {
            country,
        },
    }
}; 