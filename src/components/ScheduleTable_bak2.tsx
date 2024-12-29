import { styled, TableCell, tableCellClasses, TableRow, Button, Typography } from "@mui/material"
import { DoctorResponse, ScheduleResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "../api/scheduleApi";
import { Link } from "react-router-dom"
import { useState } from "react";
import { getDoctor, getDoctorBySchedule } from "../api/doctorApi";

type TableProps = {
    startdate: string;
    enddate: string;
    doctorid: string;
    dept: string
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'aquamarine',
      color: theme.palette.common.white,
      fontSize: 23,
      fontWeight: 700,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 20,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

function ScheduleTable({startdate, enddate, doctorid, dept}: TableProps) {
    const {data, error, isSuccess} = useQuery({
        queryKey: ['schedules'],
        queryFn: () => getSchedule()
    })

    function dateList(sdate: string, edate: string) {
        const _start = new Date(sdate).getTime()
        const _end = new Date(edate).getTime()
        const list = []
        let current = _start
        while( current <= _end) {
          const formated = new Date(current)
          if(formated.getMonth() + 1 < 10)
            list.push([formated.getFullYear(), '0' + (formated.getMonth() + 1).toString(), formated.getDate()].join('-'))
          current += 24 * 60 * 60 * 1000
        }
        return list
    }
    const dates = dateList(startdate, enddate);

    const [docid, setDocid] = useState('')
    const [docname, setDocname] = useState('')

    const GetDocid = (scheduleid: string) => {
        const {data, error, isSuccess} = useQuery({
            queryKey: ['doctors'],
            queryFn: getDoctorBySchedule(scheduleid)
        })
    
        if(!isSuccess){
            alert("GetDocname not success");
        }
        else if(error){
            alert("GetDocname error");
        }
        else{
            let i = 0;
            data.map((doctor: DoctorResponse) => {
                setDocid(doctor._links.self.href.split('/')[5]);
                i++;
                // console.log
            })
            if(i == 0)
                alert("No data");
        }
    }

    function GetDocname(docid: string) {
        const {data, error, isSuccess} = useQuery({
            queryKey: ['doctors'],
            queryFn: () => getDoctor()
        })
    
        if(!isSuccess){
            alert("GetDocname not success");
        }
        else if(error){
            alert("GetDocname error");
        }
        else{
            let i = 0;
            data.map((doctor: DoctorResponse) => {
                if(doctor._links.self.href == docid) {
                    setDocname(doctor.name);
                    i++;
                }
            })
            if(i == 0)
                alert("No data");
        }
    }

    if(!isSuccess){
        return (
            <StyledTableRow>
                查詢失敗
            </StyledTableRow>
        )
    }
    else if(error){
        return(
            <StyledTableRow>
                Error
            </StyledTableRow>
        )
    }
    else{
        let i = 0;
        data.map((schedules: ScheduleResponse) => {
            console.log("schedules.date = " + schedules.date)
            GetDocid(schedules._links.self.href.split('/')[5])
            if(dates.includes(schedules.date)){
                if(doctorid != '-1'){
                    if(dept != '-1'){
                        if(docid != doctorid || schedules.dept == dept)
                            return;
                    }
                    else{
                        if(docid != doctorid)
                            return;
                    }
                }
                else{
                    if(dept != '-1'){
                        if(schedules.dept != dept)
                            return;
                    }    
                }
                
                GetDocname(schedules._links.doctor.href)
                i++;
                
                return(
                    <StyledTableRow key={schedules._links.self.href}>
                    <StyledTableCell component="th" scope="row" align="center">
                        {schedules.date}
                    </StyledTableCell>
                    <StyledTableCell align="center">{schedules.starttime} ~ {schedules.endtime}</StyledTableCell>
                    <StyledTableCell align="center">{schedules.dept}</StyledTableCell>
                    <StyledTableCell align="center">{docname}</StyledTableCell>
                    <StyledTableCell align="center">
                        <Link to="/PetReserve" 
                            state={{docdate: schedules.date, doctorid: docid, starttime: schedules.starttime, endtime: schedules.endtime}}>
                        <Button sx={{
                            border: 1,
                            borderColor: 'aquamarine',
                            borderWidth: 2,
                            bgcolor: 'white',
                            color: 'aquamarine',
                            ":hover": {bgcolor: "aquamarine", color: "white"}
                        }}>
                            <Typography sx={{color: 'inherit', fontSize: 18, fontWeight: 700}}>
                                預約
                            </Typography>
                        </Button>
                        </Link>
                    </StyledTableCell>
                    </StyledTableRow>
                )
            }
            else{
                return;
            }
        })

        if(i == 0) {
            return(
                <StyledTableRow>
                    查無資料
                </StyledTableRow>
            )
        }
    }
}

export default ScheduleTable