import React from 'react';

export const ListResume = () => {
    const styles = {
        listRowFirst: {
            fontWeight: "bold"
        },
        listRow: {
           
        },
        listCol: {
            width: "calc(100% /3)",
            boxSizing: "border-box",
            padding: "5px"
        }
    }
    return (
        <div className="page-cont">
            <hr/>
            <div style={styles.listRowFirst}>
                <div className="fl" style={styles.listCol}>Resume Name</div>
                <div className="fl" style={styles.listCol}>Role</div>
                <div className="fl" style={styles.listCol}>Actions</div>
                <div className="clear"></div>
            </div>
            <hr/>
        </div>
    )
}