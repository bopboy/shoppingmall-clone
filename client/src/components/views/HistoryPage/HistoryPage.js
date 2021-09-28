import React from 'react'

function HistoryPage(props) {
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>결제 아이디</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>구입일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.user.userData && props.user.userData.history.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{Date(item.dateOfPurchase).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HistoryPage
