import { styled, TableCell, tableCellClasses, TableRow, Button, Typography } from "@mui/material";
import { DoctorResponse, ScheduleResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "../api/scheduleApi";
import { getDoctor, getDoctorBySchedule } from "../api/doctorApi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type TableProps = {
    startdate: string;
    enddate: string;
    doctorid: string;
    dept: string;
};

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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function ScheduleTable({ startdate, enddate, doctorid, dept }: TableProps) {
    const { data: scheduleData, error: scheduleError, isSuccess: scheduleSuccess } = useQuery<ScheduleResponse[]>({
        queryKey: ['schedules'],
        queryFn: getSchedule
    });

    const [docid, setDocid] = useState<string>('');
    const [docname, setDocname] = useState<string>('');

    useEffect(() => {
        if (scheduleSuccess && scheduleData) {
            const firstSchedule = scheduleData[0];
            getDoctorBySchedule(firstSchedule._links.self.href.split('/')[5])
                .then((response: DoctorResponse) => setDocid(response._links.self.href.split('/')[5]))
                .catch(err => console.error(err));
        }
    }, [scheduleSuccess, scheduleData]);

    useEffect(() => {
        if (docid) {
            getDoctor(docid)
                .then((response: DoctorResponse) => setDocname(response.name))
                .catch(err => console.error(err));
        }
    }, [docid]);

    if (!scheduleSuccess) {
        return (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row" colSpan={5} align="center">
                    查詢失敗
                </StyledTableCell>
            </StyledTableRow>
        );
    }

    if (scheduleError) {
        return (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row" colSpan={5} align="center">
                    Error
                </StyledTableCell>
            </StyledTableRow>
        );
    }

    const dates = dateList(startdate, enddate);
    const filteredSchedules = scheduleData.filter(schedule => {
        const dateIncluded = dates.includes(schedule.date);
        const doctorMatches = doctorid === '-1' || docid === doctorid;
        const deptMatches = dept === '-1' || schedule.dept === dept;
        return dateIncluded && doctorMatches && deptMatches;
    });

    if (filteredSchedules.length === 0) {
        return (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row" colSpan={5} align="center">
                    查無資料
                </StyledTableCell>
            </StyledTableRow>
        );
    }

    return (
        <>
            {filteredSchedules.map((schedule: ScheduleResponse) => (
                <StyledTableRow key={schedule._links.self.href}>
                    <StyledTableCell component="th" scope="row" align="center">
                        {schedule.date}
                    </StyledTableCell>
                    <StyledTableCell align="center">{schedule.starttime} ~ {schedule.endtime}</StyledTableCell>
                    <StyledTableCell align="center">{schedule.dept}</StyledTableCell>
                    <StyledTableCell align="center">{docname}</StyledTableCell>
                    <StyledTableCell align="center">
                        <Link to="/PetReserve"
                            state={{ docdate: schedule.date, doctorid: docid, starttime: schedule.starttime, endtime: schedule.endtime }}>
                            <Button sx={{
                                border: 1,
                                borderColor: 'aquamarine',
                                borderWidth: 2,
                                bgcolor: 'white',
                                color: 'aquamarine',
                                ":hover": { bgcolor: "aquamarine", color: "white" }
                            }}>
                                <Typography sx={{ color: 'inherit', fontSize: 18, fontWeight: 700 }}>
                                    預約
                                </Typography>
                            </Button>
                        </Link>
                    </StyledTableCell>
                </StyledTableRow>
            ))}
        </>
    );
}

export default ScheduleTable;

function dateList(sdate: string, edate: string): string[] {
    const _start = new Date(sdate).getTime();
    const _end = new Date(edate).getTime();
    const list: string[] = [];
    let current = _start;
    while (current <= _end) {
        const formated = new Date(current);
        if (formated.getMonth() + 1 < 10) {
            list.push([formated.getFullYear(), '0' + (formated.getMonth() + 1).toString(), formated.getDate()].join('-'));
        } else {
            list.push([formated.getFullYear(), (formated.getMonth() + 1).toString(), formated.getDate()].join('-'));
        }
        current += 24 * 60 * 60 * 1000;
    }
    return list;
}
