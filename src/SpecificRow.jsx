import React from 'react'
import { useState} from "react"
import Offcanvas from 'react-bootstrap/Offcanvas'
const SpecificRow = ({ teamname, teamid, teamcity, teamabbreviation, teamdivison, teamconference, fullname }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(!show);
    const handleShow = () => setShow(!show);
    const [sidebarData, setsidebarData] = useState({})
    const [totalGames, settotalGames] = useState(0)
    const [gameDate, setgameDate] = useState("")
    const [isError, setisError] = useState("")
    const getGameData = () => {
        fetch(`https://www.balldontlie.io/api/v1/games?team_ids[]=${teamid}&seasons[]=2021`).then((res) => res.json()).then((res) => {
            let result = res.data.filter((team) => team.home_team.full_name == fullname)
            let date = result[0].date.slice(0, 10)
            setgameDate(date)
            settotalGames(res.meta.total_count)
            setsidebarData((prev) => result[0])
        }).catch((e) => setisError(e))
    }
    const ErrorHandling = () => (
        <div>
            Sorry Something went wrong...({isError})
        </div>
    )
    return (
        <>
            <tr id={teamid} onClick={() => {
                getGameData()
                handleShow()
            }} >

                <td style={{ textAlign: "center", backgroundColor: "white" }}>{teamname}</td>
                <td style={{ textAlign: "center" }}>{teamcity}</td>
                <td style={{ textAlign: "center" }}>{teamabbreviation}</td>
                <td style={{ textAlign: "center" }}>{teamconference}</td>
                <td style={{ textAlign: "center", width: "160px" }}>{teamdivison}</td>

                <Offcanvas show={show} onHide={handleClose} placement="end">
                    <Offcanvas.Header closeButton style={{ backgroundColor: "rgba(39, 108, 245, 0.18)", paddingBottom: "10px" }}>
                        <Offcanvas.Title >{teamname}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", marginBottom: "40px" }}>
                            <h6 style={{ marginBottom: "20px", marginTop: "30px" }}>Team Full Name : {fullname}</h6>
                            <h6>Total Games in 2021 : {totalGames}</h6>
                        </div>
                        <div>
                            {sidebarData ? <div>
                                <strong><p style={{ marginTop: "25px" }}>Random Game Details  : </p></strong>
                                <strong> <p style={{ marginTop: "25px" }}>Date : {gameDate && gameDate}</p></strong>
                                <strong> <p style={{ marginTop: "25px" }}>Home Team : {sidebarData.home_team && sidebarData.home_team.full_name}</p></strong>
                                <strong>  <p style={{ marginTop: "25px" }}>Home Team Score : {sidebarData.home_team_score}</p></strong>
                                <strong>  <p style={{ marginTop: "25px" }}>Visitor Team : {sidebarData.visitor_team && sidebarData.visitor_team.full_name}</p></strong>
                                <strong> <p style={{ marginTop: "25px" }}>Visitor Team Score : {sidebarData.visitor_team_score}</p></strong>
                            </div> : <ErrorHandling />}
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </tr>
        </>
    )
}

export default SpecificRow
