import { Typography } from "@mui/material"
import { Outlet } from "react-router-dom"

export const TitleHeader = () => {
    return (
        <>
            <Typography textAlign="center" sx={{
                zIndex: -1000,
                textShadow: "0 0 10px #fff, 0 0 30px #ff339c, 0 0 60px #ff339c",
                typography: { xs: 'h5', sm: 'h3', md: 'h2' },
            }}>
                Super Minesweeper Ultra HD Turbo! Charged Remix IV
            </Typography><Typography textAlign="center" sx={{
                zIndex: -1000,
                textShadow: "0 0 10px #fff, 0 0 30px #3399ff, 0 0 3px #3399ff",
                typography: { xs: 'h6', sm: 'h4', md: 'h3' }
            }}>
                Deluxe Collector's Fancy Reloaded Edition Plus
            </Typography>
            <Outlet/>
        </>
    )
}