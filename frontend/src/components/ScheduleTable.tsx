import { styled, TableCell, tableCellClasses, TableRow, Button, Typography } from "@mui/material";
import { DoctorResponse, ScheduleResponse } from "../types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getSchedule, getScheduleByDateBetween, getScheduleByDeptAndDateBetween, getScheduleByDoctorAndDateBetween } from "../api/scheduleApi";
import { getDoctor, getDoctorBySchedule } from "../api/doctorApi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type TableProps = {
    startdate: string;
    enddate: string;
    doctorid: number;
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
    // const { data, error, isSuccess } = useQuery<ScheduleResponse[]>({
    //     queryKey: ['schedules', doctor, startdate, enddate],
    //     queryFn: () => getScheduleByDoctorAndDateBetween()
    // });

    const result = useQueries({
        queries: [
            {
                queryKey: ['schedules', startdate, enddate],
                queryFn: () => getScheduleByDateBetween(dateFormatting(startdate), dateFormatting(enddate))
            },
            {
                queryKey: ['schedules', dept, startdate, enddate],
                queryFn: () => getScheduleByDeptAndDateBetween(dept, dateFormatting(startdate), dateFormatting(enddate))
            },
            {
                queryKey: ['schedules', doctorid, startdate, enddate],
                queryFn: () => getScheduleByDoctorAndDateBetween(doctorid, dateFormatting(startdate), dateFormatting(enddate))
            }
        ]
    })

    const datedata = result[0].data;
    const dateerror = result[0].error;
    const dateisSuccess = result[0].isSuccess;
    const deptdata = result[1].data;
    const depterror = result[1].error;
    const deptisSuccess = result[1].isSuccess;
    const docdata = result[2].data;
    const docerror = result[2].error;
    const docisSuccess = result[2].isSuccess;


    // const [docid, setDocid] = useState<string>('');
    // const [docname, setDocname] = useState<string>('');

    const [data, setData] = useState<ScheduleResponse[]>([]);

    useEffect(() => {
        if(doctorid != -1) {
            docdata && setData(docdata);
        }
        else {
            if(dept != '-1') {
                deptdata && setData(deptdata);
            }
            else {
                datedata && setData(datedata);
            }
        }
    }, [doctorid, dept, datedata, deptdata, docdata]);

    if (!dateisSuccess && !deptisSuccess && !docisSuccess) {
        return (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row" colSpan={5} align="center">
                    查詢失敗
                </StyledTableCell>
            </StyledTableRow>
        );
    }
    else if (dateerror && depterror && docerror) {
        return (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row" colSpan={5} align="center">
                    Error
                </StyledTableCell>
            </StyledTableRow>
        );
    }
    else {
        if(data.length == 0) {
            return (
                <StyledTableRow>
                    <StyledTableCell component="th" scope="row" colSpan={5} align="center">
                        查無資料
                    </StyledTableCell>
                </StyledTableRow>
            );
        }
        else {
            return (
                <>
                    {data.map((schedule: ScheduleResponse) => (
                        <StyledTableRow key={schedule.timeid}>
                            <StyledTableCell component="th" scope="row" align="center">
                                {schedule.date.split('T')[0]}
                            </StyledTableCell>
                            <StyledTableCell align="center">{schedule.startTime} ~ {schedule.endTime}</StyledTableCell>
                            <StyledTableCell align="center">{schedule.doctor.department}</StyledTableCell>
                            <StyledTableCell align="center">{schedule.doctor.name}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Link to="/PetReserve"
                                    state={{ docdate: schedule.date, doctorid: schedule.doctor.doctorid, starttime: schedule.startTime, 
                                        endtime: schedule.endTime }}>
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
        
    }
}

export default ScheduleTable;

function dateFormatting(date: string): string {
    const newDate = date.split('/').join('-');
    return newDate;
}