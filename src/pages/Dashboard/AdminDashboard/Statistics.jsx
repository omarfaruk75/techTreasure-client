
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Statistics = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading, error } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching statistics.</p>;
    }

    // Map fetched stats to chart data
    const data = [
        { name: 'Users', value: stats.users },
        { name: 'Reviews', value: stats.reviews },
        { name: 'Products', value: stats.products },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <div>

            <SectionTitle heading={'Stastics of Tech Treasure'} />

            <div className="flex justify-center mt-8">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Statistics;
