import { useQuery } from "@tanstack/react-query"
import { getDoctor } from "../api/doctorApi"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { DoctorResponse } from "../types";

type SelectFormProps = {
    handleDocChange: (event: SelectChangeEvent) => void;
}

function DoctorList({handleDocChange}: SelectFormProps) {
    const {data, error, isSuccess} = useQuery({
        queryKey: ['doctors'],
        queryFn: getDoctor
    })

    if(!isSuccess){
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
    else if(error){
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
        return (
            <Select
            id="doctorid"
            defaultValue={"-1"}
            onChange={handleDocChange}
            >
            <MenuItem value={'-1'}>請選擇</MenuItem>
            {data.map((doctors: DoctorResponse) => (
                <MenuItem value={doctors._links.self.href.split('/')[5]}>{doctors.name}</MenuItem>
            ))}
            </Select>
        )
    }
}

export default DoctorList