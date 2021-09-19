import axios from 'axios'

type ConfigType = {
    url?: string,
    path: string
}

export const GET = async (config: ConfigType) => {
    const response = await axios({
        method: 'get',
        url: `${config.url || process.env.REACT_APP_SERVER_URL}/${config.path || ""}`,
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    return response.data
}

const HTTP_REQUEST = { GET }
export default HTTP_REQUEST