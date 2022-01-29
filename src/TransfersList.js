import React  from "react";

const TransfersList = ({transfers, approveTransfer}) => {
    return (
        <div>
            <table>
                <h2>Transfers</h2>
                <tbody>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Amount</th>
                        <th>To</th>
                        <th>Approvals</th>
                        <th>Sent</th>
                    </tr>
                </thead>
                {transfers.map(transfer => (
                    <tr key={transfer.id}>
                        <td>{transfer.id}</td>
                        <td>{transfer.to}</td>
                        <td>{transfer.amount}</td>
                        <td>
                            {transfer.approvals}
                            <button onClick={approveTransfer}>Approve</button>
                        </td>
                        <td>{transfer.sent ? 'yes' : 'no'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default TransfersList;