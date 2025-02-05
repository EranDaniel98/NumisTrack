import react, { useEffect, UseEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCoins } from '../api/coinApi';

const Dashboard = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    cont[error, setError] = useState('');
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.token) {
            navigate('/login');
            return;
        }

        const fetchCoins = async () => {
            try {
                const data = await getCoins(user.token);
                setCoins(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load coins.');
            }
            finally {
                setLoading(false);
            }
        };

        fetchCoins();
    }, [user.token, navigate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{color: 'red' }}>{error}</p>
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome, {user.user?.username || 'User'}!</h2>
            <div>
                {coins.length === 0? (
                    <p>No coins in your collection yet. Start adding some!</p>
                ): (
                    <ul>
                        {coins.map((coin) => (
                            <li key={coin._id}>
                                <strong>{coin.name}</strong> - {coin.year}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard
