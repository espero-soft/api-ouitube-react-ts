import { Ouitube } from "ouitube";

const ouitube: any = new  Ouitube(
    process.env.REACT_APP_CLIENTID || "",
    process.env.REACT_APP_CLIENTSECRET || "",
)

export const getVideos = async (page=1, limit=5) =>{
    try {
        
        const data = await ouitube.request({
            url: "/video",
            method: "GET",
            query: [
                {
                    name: "pageNumber",
                    value: page
                  },
                  {
                    name: "pageLimit",
                    value: limit
                  }
            ]
        })

        return data
        
    } catch (error) {
        return {
            isSuccess: false,
            error
        }
    }
}