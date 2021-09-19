import axios from 'axios'

type ConfigType = {
    url?: string,
    path: string,
    withOutAccessControlAllowOrigin?: boolean
}

export const GET = async (config: ConfigType) => {
    const ACAO = config.withOutAccessControlAllowOrigin ? {} : { "Access-Control-Allow-Origin": "*" }
    const response = await axios({
        method: 'get',
        url: `${config.url || process.env.REACT_APP_SERVER_URL}/${config.path || ""}`,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            ...ACAO
        }
    })
    return response.data
}

const HTTP_REQUEST = { GET }
export default HTTP_REQUEST