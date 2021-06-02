import styles from "./CountriesTable.module.css";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded} from "@material-ui/icons";
import {useState} from "react";
import Link from "next/link";

const orderBy= (countries, value , direction) => {        
    if (direction=="asc") {
        return [...countries].sort((a,b) => a[value]>b[value]? 1: -1);
    }
    if (direction==="desc") {
        return [...countries].sort((a,b) => a[value]>b[value]? -1: 1);
    }
    return countries;
};
const SortArrow= ({direction}) => {             // this function will take prop {direction} from {switchDirection};
    if(!direction) {
        return <> </>
    }
    if(direction==="desc") {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRounded color= "inherit"/>
            </div>
        )
    } else if(direction==="asc") {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRounded color= "inherit"/>
            </div>
        )
    }

};
const CountriesTable = ({countries})=>{
    const [direction, setDirection]= useState();
    const [value, setValue]= useState();                            // Value in here is which we want to sort by! 

    const orderedByCountry = orderBy(countries, value, direction); //We need to declare value and direction before call this function;
    
    const switchDirection = () => {
        if(!direction) {
            setDirection("desc");
        } else if (direction==="desc") {
            setDirection("asc");
        } else {
            setDirection(null);
        }
    };
    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    }
    return (
        <div>
            <div className={styles.heading}>
                <div className={styles.heading_flag} >
                    
                </div>
                <button className={styles.heading_name} onClick={()=>{setValueAndDirection("name")}}>
                    Name
                    { value==="name" && <SortArrow direction={direction} />  }
                </button>
                <button className={styles.heading_population} onClick={()=>{setValueAndDirection("population")}}>
                    Population
                    {value==="population" && <SortArrow direction={direction}/>}
                </button>
                <button className={styles.heading_area} onClick={()=>{setValueAndDirection("area")}}>
                    <div>
                        Area (km <sup style={{ fontSize: "0.5rem"}}>2</sup>) 
                    </div>
                    {value==="area" && <SortArrow direction={direction}/>}
                </button>
                <button className={styles.heading_gini} onClick={()=>{setValueAndDirection("gini")}}>
                    Gini
                    {value==="gini" && <SortArrow direction={direction}/>}
                </button>
            </div>
            {orderedByCountry.map((country)=>(
                <Link href={`/country/${country.alpha3Code}`}>
                    <div className={styles.row}>
                        <div className={styles.flag}>
                            <img src={ country.flag} alt={country.name} />
                        </div>
                        <div className={styles.name}>
                            {country.name}
                        </div>
                        <div className={styles.population}>
                            {country.population}
                        </div>
                        <div className={styles.area}>
                            {country.area || 0}
                        </div>
                        <div className={styles.gini}>
                            {country.gini || 0 } %
                        </div>

                    </div>
                </Link>
                
                ))}
            
        </div>
    );
};
export default CountriesTable;