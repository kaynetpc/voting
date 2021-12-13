import React from 'react';

function View({children}) {
    
    return(
        <div className="views-holder-child">
            {children}
        </div>
    )
}

export default View;