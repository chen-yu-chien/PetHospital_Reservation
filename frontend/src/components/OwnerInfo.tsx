import { Box, Typography } from "@mui/material"
import { OwnerResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getOwnerByIdentifyId } from "../api/ownerApi";

type Props = {
    identifyid: string;
}

function OwnerInfo({identifyid}: Props) {
    const {data, error, isSuccess} = useQuery({
        queryKey: ['owner'],
        queryFn: () => getOwnerByIdentifyId(identifyid)
    })
    
    // console.log(data);

    if(!isSuccess){
        return (
            <Box sx={{height: '10vh', mb: 3, display: 'flex', border: 1, borderWidth: 3, borderColor: 'aquamarine', 
                alignItems: 'center'}}>
                <Typography
                    sx={{
                        fontSize: 20,
                        fontWeight: 500,
                        ml: 5,
                    }}>
                    查無資料
                </Typography>
            </Box>
        )
    }
    else if(error){
        return(
            <Box sx={{height: '10vh', mb: 3, display: 'flex', border: 1, borderWidth: 3, borderColor: 'aquamarine', 
                alignItems: 'center'}}>
                <Typography
                    sx={{
                        fontSize: 20,
                        fontWeight: 500,
                        ml: 5,
                    }}>
                    查詢失敗
                </Typography>
            </Box>
        )
    }
    else{
        return(
            <Box sx={{height: '10vh', mb: 3, display: 'flex', border: 1, borderWidth: 3, borderColor: 'aquamarine', 
                alignItems: 'center'}}>
                    {
                        data.map((owner: OwnerResponse) =>(
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    ml: 5,
                                }} key={owner.ownerid}>
                                飼主姓名：{owner.name} &nbsp;&nbsp;&nbsp;&nbsp;
                                連絡電話：{owner.telephone}
                            </Typography>
                        ))                        
                    }
            </Box>
        )
    }
}

export default OwnerInfo