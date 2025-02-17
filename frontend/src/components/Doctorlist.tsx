import { useQueries } from "@tanstack/react-query"
import { getDoctor, getDoctorByDept } from "../api/doctorApi"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { DoctorResponse } from "../types";

type SelectFormProps = {
    handleDocChange: (event: SelectChangeEvent) => void;
    department: string;
}

function DoctorList({handleDocChange, department}: SelectFormProps) {
    const result = useQueries({
        queries: [
            {
                queryKey: ['doctors'],
                queryFn: () => getDoctor()
            },
            {
                queryKey: ['doctors', department],
                queryFn: () => getDoctorByDept(department)
            }
        ]
    })

    const docdata = result[0].data
    const docerror = result[0].error
    const docisSuccess = result[0].isSuccess
    const docDeptdata = result[1].data
    const docDepterror = result[1].error
    const docDeptisSuccess = result[1].isSuccess

    if(!docisSuccess && !docDeptisSuccess){
        return(
            <Select
            labelId="department-label"
            id="doctorid"
            defaultValue={"-1"}
            >        
            <MenuItem value={'-1'}>無資料</MenuItem>
            </Select>
        )
    }
    else if(docerror && docDepterror){
        return(
            <Select
            labelId="department-label"
            id="doctorid"
            defaultValue={"-1"}
            >        
            <MenuItem value={'-1'}>Error</MenuItem>
            </Select>
        )
    }
    else{
        if(department === '-1'){
            return (
                <Select
                id="doctorid"
                defaultValue={"-1"}
                onChange={handleDocChange}
                >
                <MenuItem value={'-1'}>請選擇</MenuItem>
                {
                    docdata && docdata.map((doctors: DoctorResponse) => (
                        <MenuItem value={doctors.doctorid}>{doctors.name}</MenuItem>
                ))}
                </Select>
            )
        }

        else{
            return (
                <Select
                id="doctorid"
                defaultValue={"-1"}
                onChange={handleDocChange}
                >
                <MenuItem value={'-1'}>請選擇</MenuItem>
                {
                    docDeptdata && docDeptdata.map((doctor: DoctorResponse) => (
                        <MenuItem value={doctor.doctorid}>{doctor.name}</MenuItem>
                ))}
                </Select>
            )    
        }    
    }
}

export default DoctorList