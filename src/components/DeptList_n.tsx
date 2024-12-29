import { useQuery } from "@tanstack/react-query"
import { getDoctor } from "../api/doctorApi"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { DepartmentResponse } from "../types";

type SelectFormProps = {
    handleDeptChange: (event: SelectChangeEvent) => void;
}

function DeptList({handleDeptChange}: SelectFormProps) {
    const {data, error, isSuccess} = useQuery({
        queryKey: ['doctors'],
        queryFn: getDoctor
    })

    if(!isSuccess){
        return(
            <Select
            labelId="department-label"
            id="deptid"
            defaultValue={"-1"}
            >        
            <MenuItem value={-1}>無資料</MenuItem>
            </Select>
        )
    }
    else if(error){
        return(
            <Select
            labelId="department-label"
            id="deptid"
            defaultValue={"-1"}
            >        
            <MenuItem value={-1}>Error</MenuItem>
            </Select>
        )
    }
    else{
        return (
            <Select
            labelId="department-label"
            id="deptid"
            defaultValue={"-1"}
            onChange={handleDeptChange}
            >
            <MenuItem value={-1}>請選擇</MenuItem>
            {data.map((deptartment: DepartmentResponse) => (
                <MenuItem value={deptartment._links.self.href.split('/')[5]}>{deptartment.name}</MenuItem>
            ))}
            {/* <MenuItem value={-1}>請選擇</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
        )
    }
}

export default DeptList