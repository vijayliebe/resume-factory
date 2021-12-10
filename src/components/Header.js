import React from 'react';

export const Header = () => {
    const styles = {
        main: {
            borderBottom: "2px solid #eee"
        },
        title: {
            fontSize: "25px",
            marginLeft: "10px"
        }
    }
    return (
        <header style={styles.main}>
            <h1 style={styles.title}>Resume Factory</h1>  
            
        </header>
    )
}