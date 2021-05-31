import styles from "./CountriesTable.module.css";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded} from "@material-ui/icons";
import {useState} from "react";

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
                <button className={styles.heading_population} onClick={()=>{setValueAndDirection("population")}}>
                    Name
                    <SortArrow direction={direction} />
                </button>
                <button className={styles.heading_population} onClick={()=>{setValueAndDirection("population")}}>
                    Population
                    <SortArrow direction={direction}/>
                </button>
            </div>
            {orderedByCountry.map((country)=>(
                <div className={styles.row}>
                    <div className={styles.name}>
                        {country.name}
                    </div>
                    <div className={styles.population}>
                        {country.population}
                    </div>
                </div>
            ))}
            
        </div>
    );
};
export default CountriesTable;