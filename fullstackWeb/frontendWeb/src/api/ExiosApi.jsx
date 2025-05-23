import exios from "exios"

const ExiosApi = exios.create({
   apiUrl: process.meta.env.VITE_API_BASE_URL,
   withCredentials:true
})

export default ExiosApi