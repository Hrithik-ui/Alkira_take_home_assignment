import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from "react"
import Offcanvas from 'react-bootstrap/Offcanvas'
import SpecificRow from "./SpecificRow"

const Tables = () => {
    const [allTeamsData, setallTeamsData] = useState([])
    const [searchTeams, setsearchTeams] = useState("")
    const [sortBy, setsortBy] = useState("city")
    const [isError, setisError] = useState("")
    const NoData = () => (
        <div style={{ width: "100%", height: "100%" }}>
            Oops no data to show...
        </div>
    )
    const apicall = (value) => {
        fetch("https://www.balldontlie.io/api/v1/teams").then((res) => res.json()).then((res) => {
            setallTeamsData((prev) => {
                let finalresult = res.data.filter((team) => team.name.toLowerCase().includes(value.toLowerCase()))
                let result = finalresult.sort((prev, curr) => {
                    if (prev[sortBy].toLowerCase() < curr[sortBy].toLowerCase()) {
                        return -1
                    }
                    else if (prev[sortBy].toLowerCase() > curr[sortBy].toLowerCase()) {
                        return 1
                    }
                    else {
                        return 0
                    }
                })
                return result
            }
            )
        }
        ).catch((e) => setisError(e))
    }
    function outer(func) {
        let timer;
        return function inner(args) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.call(this, args)
            }, 400)
        }
    }
    //Using debounce to reduce the number of API calls made to the server.
    const debounce = outer(apicall)

    useEffect(() => {
        apicall("")
    }, [searchTeams])

    useEffect(() => {
        if (allTeamsData) {
            var finalresult = allTeamsData.filter((team) => team.name.toLowerCase().includes(searchTeams.toLowerCase()))
            var result = finalresult.sort((prev, curr) => {
                if (prev[sortBy].toLowerCase() < curr[sortBy].toLowerCase()) {
                    return -1
                }
                else if (prev[sortBy].toLowerCase() > curr[sortBy].toLowerCase()) {
                    return 1
                }
                else {
                    return 0
                }
            })
            setallTeamsData((prev) => result)
        }
    }, [sortBy])


    const SortingTable = (category) => {
        setsortBy(category)

    }
    if (isError) {
        return (<div>Something went wrong...({isError})</div>)
    }

    return (
        <div style={{ paddingTop: "110px", color: "rgba(39, 108, 245, 0.93)", position: "relative" }}>
            <h1 style={{ marginBottom: "60px" }}>NBA Teams</h1>
            <input id="search" style={{ marginBottom: "50px", width: "380px", border: "1px solid rgba(39, 108, 245, 0.93)" }} type="text" placeholder="Search for teams..." onChange={(e) => debounce(e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "6px" }}>
                <Button variant="outline-primary" id="filter-team-name" onClick={() => SortingTable("name")}>Sort By Team Name</Button>
                <Button variant="outline-primary" id="filter-city" onClick={() => SortingTable("city")}>Sort By City</Button>
                <Button variant="outline-primary" id="filter-division" onClick={() => SortingTable("division")}>Sort By Division</Button>
                <Button variant="outline-primary" id="filter-abbreviation" onClick={() => SortingTable("abbreviation")}>Sort By Abbreviation</Button>

            </div>
            {allTeamsData.length > 0 ? <Table striped bordered hover style={{ width: "850px", height: "auto" }} id="main-table">
                <thead>
                    <tr style={{ backgroundColor: "rgba(39, 108, 245, 0.93)", color: "white" }}>
                        <th style={{ textAlign: "center" }}>Team Name</th>
                        <th style={{ textAlign: "center" }}>City</th>
                        <th style={{ textAlign: "center" }}>Abbreviation</th>
                        <th style={{ textAlign: "center" }}>Conference</th>
                        <th style={{ textAlign: "center" }}>Division</th>
                    </tr>
                </thead>
                <tbody>
                    {allTeamsData.map((team, index) => (
                        <SpecificRow teamname={team.name} teamid={team.id} teamcity={team.city} teamabbreviation={team.abbreviation} teamconference={team.conference} teamdivison={team.division} fullname={team.full_name} key={index} />
                    ))}
                </tbody>
            </Table> : <NoData />}


        </div>
    )
}

export default Tables
