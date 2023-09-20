import {Legend, LineChart, XAxis, Line, Tooltip, CartesianGrid, ResponsiveContainer} from 'recharts'
export default function Chart(props){
    console.log("props data chart")
    console.log(props.data)
    let chartData = props.data.daily.time.map(
        (el, idx) => {
            return {
                'date': el,
                'precipitation': props.data.daily.precipitation_sum[idx],
                'temp_max': props.data.daily.temperature_2m_max[idx],
                'temp_min': props.data.daily.temperature_2m_min[idx],
                'uv_index': props.data.daily.uv_index_max[idx],
                'precipitation_probability': props.data.daily.precipitation_probability_max[idx]
            }
        }
    )

    console.log(chartData)
    return (
        <ResponsiveContainer height={"100%"} width="100%" aspect={2.0}>
        <LineChart  data={chartData} margin={{ top: 25, right: 25, left: 25, bottom: 25 }}>
            <XAxis dataKey="date" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="precipitation_probability" stroke="#ff7300" yAxisId={0} />
            <Line type="monotone" dataKey="temp_max" stroke="#387908" yAxisId={1} />
            <Line type="monotone" dataKey="temp_min" stroke="#577908" yAxisId={2} />
            <Line type="monotone" dataKey="uv_index" stroke="#000000" yAxisId={3} />
            <Legend />
        </LineChart>
        </ResponsiveContainer>



    )
}