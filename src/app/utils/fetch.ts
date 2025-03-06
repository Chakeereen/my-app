
import qs from "qs";

interface FetchResponse<T> {
    data: T | null;
    status?: number; 
    error?: {};
  }
   export const fetchApi = async <T>(
    path: string,
    options: RequestInit & {} ={
      method: "GET",
    },
    populate?: any,
    filter?: any
  ): Promise<FetchResponse<T>> => {
    let headers ={
        "Content-Type": "application/json"
    }
    // let url = `${process.env.API_URL}${path}`
    let url: any;
    if (populate) {
        let queryParams: any = {};
        queryParams.populate = populate;
        if (filter) {
            queryParams.filters = filter;
        }
        const newUrl = new URL(path, process.env.API_URL);
        newUrl.search = qs.stringify({
            populate: queryParams.populate
        })
        url = newUrl;
    }
    try {
        const response = await fetch(url, { ...options, headers });
        if (!response.ok) {
            throw new Error("Failed to fetch team members");
        }

        const result = await response.json();
        return { 
            data: result,
        status: response.status,
            
        }
    }catch (error: unknown) {
        return{data: null, status: 500, error: "error"}
     }
    }

     