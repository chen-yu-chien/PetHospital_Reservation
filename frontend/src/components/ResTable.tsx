import { Button, styled, TableBody, TableCell, tableCellClasses, TableRow, Typography } from "@mui/material"
import { ReservationResponse } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReservation, getReservationByOwner } from "../api/reservationApi";
import Edit from "./EditDialog";
import dayjs from "dayjs";

type TableProps = {
    startdate: string;
    enddate: string;
    identifyid: string;
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

function ResTable({startdate, enddate, identifyid}: TableProps) {
    const {data, error, isSuccess} = useQuery({
        queryKey: ['reservations'],
        queryFn: () => getReservationByOwner(identifyid)
    })
    
    console.log("res:" + data);

    const { mutate } = useMutation(deleteReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reservations'] });
        },
        onError: (err) => {
              console.error(err);
        },
    });

    const queryClient = useQueryClient();
    const start = dayjs(startdate).format('YYYY-MM-DD');
    const end = dayjs(enddate).format('YYYY-MM-DD');

    if(!isSuccess){
        return (
            <TableBody>
                <StyledTableRow>
                    查無資料
                </StyledTableRow>
            </TableBody>
        )
    }
    else if(error){
        return(
            <TableBody>
                <StyledTableRow>
                    Error
                </StyledTableRow>
            </TableBody>
        )
    }
    else{
        return(
            <TableBody>
                {
                    data.filter((res: ReservationResponse) => {
                        return dayjs(res.date).isAfter(start) && dayjs(res.date).isBefore(end)
                    }).map((res: ReservationResponse) => (
                        <StyledTableRow key={res.resid}>
                        <StyledTableCell component="th" scope="row" align="center">{res.date}</StyledTableCell>
                        <StyledTableCell align="center">{res.time}</StyledTableCell>
                        <StyledTableCell align="center">{res.doctor.name}</StyledTableCell>
                        <StyledTableCell align="center">{res.pet.name}</StyledTableCell>
                        <StyledTableCell align="center">{res.symptom}</StyledTableCell>
                        <StyledTableCell align="center">
                            <Edit resdata={res} doctorid={res.doctor.doctorid} />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Button sx={{
                                border: 1,
                                borderColor: 'aquamarine',
                                borderWidth: 2,
                                bgcolor: 'white',
                                color: 'aquamarine',
                                ":hover": {bgcolor: "aquamarine", color: "white"}}}   
                                onClick={() => {
                                    // console.log(res);
                                    if (window.confirm(`是否確定取消${res.date} ${res.time}的預約紀錄？`)) 
                                        mutate(res.resid);
                                }}
                            >
                                <Typography sx={{color: 'inherit', fontSize: 18, fontWeight: 700}}>
                                    取消
                                </Typography>
                            </Button>
                        </StyledTableCell>
                        </StyledTableRow>
                    ))
                }
            </TableBody>
        )
    }
}

export default ResTable