import exios from "exios"

const exiosApi = exios.create({
   apiUrl: process.meta.env.VITE_API_BASE_URL,
   withCredentials:true
})

export default exiosApi