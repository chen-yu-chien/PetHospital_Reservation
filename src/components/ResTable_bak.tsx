import { Button, styled, TableCell, tableCellClasses, TableRow, Typography } from "@mui/material"
import { DoctorResponse, OwnerResponse, PetResponse, ReservationResponse } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getDoctorByReservation } from "../api/doctorApi";
import { getPet, getPetByOwner } from "../api/petApi";
import { deleteReservation, getReservation, getReservationByPet } from "../api/reservationApi";
import { getOwner } from "../api/ownerApi";
import Edit from "./EditDialog";

type TableProps = {
    startdate: string;
    enddate: string;
    ownername: string;
    identifyid: string
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

function ResTable({startdate, enddate, ownername, identifyid}: TableProps) {
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

    function dateList(sdate: string, edate: string) {
        const _start = new Date(sdate).getTime()
        const _end = new Date(edate).getTime()
        const list = []
        let current = _start
        while( current <= _end) {
          const formated = new Date(current)
          list.push([formated.getFullYear(), formated.getMonth() + 1, formated.getDate()].join('-'))
          current += 24 * 60 * 60 * 1000
        }
        return list
    }
    const dates = dateList(startdate, enddate);

    const [residList] = useState([''])
    const [docname, setDocname] = useState('');
    const [docid, setDocid] = useState('');
    const [petname, setPetname] = useState('');
    const [ownerid, setOwnerid] = useState('');
    const [petidList] = useState([''])

    function GetDoctor(resid: string) {
        const {data, error, isSuccess} = useQuery({
            queryKey: ['doctors'],
            queryFn: () => getDoctorByReservation(resid)
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
                setDocname(doctor.name);
                setDocid(doctor._links.self.href.split('/')[5])
                i++;
            })
            if(i == 0)
                alert("No data");
        }
    }

    function GetOwnerid(ownername: string, identifyid: string) {
        const {data, error, isSuccess} = useQuery({
            queryKey: ['owners'],
            queryFn: () => getOwner()
        })

        if(!isSuccess){
            alert("GetOwnerid not success");
        }
        else if(error){
            alert("GetOwnerid error");
        }
        else{
            let i = 0;
            data.map((owner: OwnerResponse) => {
                if(owner.name == ownername && owner.identifyId == identifyid) {
                    setOwnerid(owner._links.self.href.split('/')[5]);
                    i++;
                }
            })
            if(i == 0)
                alert("No data");
        }
    }

    function GetPetidList(ownerid: string) {
        const {data, error, isSuccess} = useQuery({
            queryKey: ['pets'],
            queryFn: () => getPetByOwner(ownerid)
        })

        if(!isSuccess){
            alert("GetPetid not success");
        }
        else if(error){
            alert("GetPetid error");
        }
        else{
            let i = 0;
            data.map((pet: PetResponse) => {
                petidList.push(pet._links.self.href.split('/')[5]);
                i++;
            })
            if(i == 0)
                alert("No data");
        }
    }


    function GetPetname(petid: string) {
        const {data, error, isSuccess} = useQuery({
            queryKey: ['pets'],
            queryFn: () => getPet()
        })
    
        if(!isSuccess){
            alert("GetPetname not success");
        }
        else if(error){
            alert("GetPetname error");
        }
        else{
            let i = 0;
            data.map((pet: PetResponse) => {
                if(pet._links.self.href.split('/')[5] == petid) {
                    setPetname(pet.name);
                    i++;
                }
            })
            if(i == 0)
                alert("No data");
        }
    }

    function GetResidList(petid: string){
        const {data, error, isSuccess} = useQuery({
            queryKey: ['reservations'],
            queryFn: () => getReservationByPet(petid)
        })
    
        if(!isSuccess){
            alert("GetResidList not success");
        }
        else if(error){
            alert("GetResidList error");
        }
        else{
            let i = 0;
            data.map((res: ReservationResponse) => {
                residList.push(res._links.self.href.split('/')[5]);
                i++;
            })
            if(i == 0)
                alert("No data");
        }
    }

    if(!isSuccess){
        return (
            <StyledTableRow>
                查無資料
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
        GetOwnerid(ownername, identifyid);
        GetPetidList(ownerid);
        for(let i = 0; i < petidList.length; i++) {
            GetPetname(petidList[i])
            GetResidList(petidList[i])
            data.map((res: ReservationResponse) => {
                if(dates.includes(res.docdate) && residList.includes(res._links.self.href.split('/')[5])){
                    GetDoctor(res._links.self.href.split('/')[5])
                    return(
                        <StyledTableRow key={res._links.self.href}>
                        <StyledTableCell component="th" scope="row" align="center">
                            {res.docdate}
                        </StyledTableCell>
                        <StyledTableCell align="center">{res.doctime}</StyledTableCell>
                        <StyledTableCell align="center">{docname}</StyledTableCell>
                        <StyledTableCell align="center">{petname}</StyledTableCell>
                        <StyledTableCell align="center">
                            <Edit resdata={res} doctordate={res.docdate} doctortime={res.doctime} doctorid={docid} 
                                doctorname={docname} petid={petidList[i]} petname={petname} symptom={res.symptom}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {/* <Cancel/> */}
                            <Button sx={{
                                border: 1,
                                borderColor: 'aquamarine',
                                borderWidth: 2,
                                bgcolor: 'white',
                                color: 'aquamarine',
                                ":hover": {bgcolor: "aquamarine", color: "white"}}}   
                                onClick={() => {
                                    // console.log(res);
                                    if (window.confirm(`是否確定取消${res.docdate} ${res.doctime}的預約紀錄？`)) 
                                        mutate(res._links.self.href);
                                }}
                            >
                                <Typography sx={{color: 'inherit', fontSize: 18, fontWeight: 700}}>
                                    取消
                                </Typography>
                            </Button>
                        </StyledTableCell>
                        </StyledTableRow>
                    )
                }
                else return;
            })
        }
    }
}

export default ResTable