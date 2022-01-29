import React from "react";

const Header = ({quorum, approvers}) => {
    return (
        <div>
            <ul>
                <li>Approvers: { approvers.join(', ') }</li>
                <li>Quorum: { quorum }</li>
            </ul>
        </div>
    );
}

export default Header;