import { Button, styled, TableBody, TableCell, tableCellClasses, TableRow, Typography } from "@mui/material"
import { ReservationResponse } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
import { deleteReservation, getReservation } from "../api/reservationApi";
import Edit from "./EditDialog";

// type TableProps = {
//     startdate: string;
//     enddate: string;
//     ownername: string;
//     identifyid: string
// }

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

// function ResTable({startdate, enddate, ownername, identifyid}: TableProps) {
function ResTable() {
    const {data, error, isSuccess} = useQuery({
        queryKey: ['reservations'],
        queryFn: () => getReservation()
    })

    const { mutate } = useMutation(deleteReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reservations'] });
        },
        onError: (err) => {
              console.error(err);
        },
    });

    const queryClient = useQueryClient();

    // const [residList] = useState([''])
    // const [docname, setDocname] = useState('');
    // const [docid, setDocid] = useState('');
    // const [petname, setPetname] = useState('');
    // const [ownerid, setOwnerid] = useState('');
    // const [petidList] = useState([''])

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
                    data.map((res: ReservationResponse) => (
                        <StyledTableRow key={res._links.self.href}>
                        <StyledTableCell component="th" scope="row" align="center">{res.date}</StyledTableCell>
                        <StyledTableCell align="center">{res.time}</StyledTableCell>
                        <StyledTableCell align="center">{res.petname}</StyledTableCell>
                        <StyledTableCell align="center">{res.ownername}</StyledTableCell>
                        <StyledTableCell align="center">{res.tel}</StyledTableCell>
                        <StyledTableCell align="center">
                            <Edit resdata={res} />
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
                                        mutate(res._links.self.href);
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