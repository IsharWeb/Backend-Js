
const asyncHandler = (requstHandlerFun) => {

    (req, res, next) => {

        Promise
            .resolve(requstHandlerFun(req, res, next))
            .reject((err) => next(err))

    }

}

// short way use nested functionns

// this is correct way but we need to use another
// const asyncHandler = (fun) => async (req, res, next) => {
//     try {
//         await fun(req, res, next)
//     } catch (err) {
//         res.status(err.code || 501)
//             .json({
//                 success: false,
//                 message: err.message
//             })
//     }
// }

// actully function structurs like that but look diff
// const asyncHandler = () => {
//     async (params) => {
//         try {

//         } catch (error) {

//         }
//     }
// };


export default asyncHandler