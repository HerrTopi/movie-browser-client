import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    card: {
        marginTop: "20px",
        display: "flex"
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
        flex: 10,
        fontSize: 20
    },
    detailsButton: {
        float: "right"
    },
    backToSearch: {
        position: "fixed",
        bottom: 50,
        right: 50
    },
    wikiUrl: {
        marginRight: "10px"
    }
})

export default useStyles