import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    card: {
        marginTop: "20px",
        display: "flex"
    },
    title: {
        fontWeight: "bold",
        fontSize: "28px",
        paddingBottom: "10px",
        "&:hover": {
            cursor: "pointer",
            color: "#4682b4"
        }
    },
    details: {
        flex: 11,
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    poster: {
        flex: 1,
        height: "100%",
        marginBottom: "-4px"
    },
    overview: {
        flex: 10
    }
})

export default useStyles