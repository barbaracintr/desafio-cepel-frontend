import { Typography } from "@mui/material"
import { ElectricalComponents } from "./electricalComponents"

export const Dashboard: React.FC = () => {
    return (
        <>
            <Typography variant="h3" component="h1" mt={5} align="center">Cepel - Sistema Elétrico</Typography>
            <ElectricalComponents />
        </>
    )
}