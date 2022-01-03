import { KNT } from "../../../dependencies/js/knt"


export const basic = {
    appName: "Voting System",
    appLogo: <h1>E-VOTING</h1>,
    admin: {
        username: "KNT",
        password: "pass",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: ""
    },
    developer: "",
    company: "Olomola Isaac adeyemi",
    yearOfProduction: 2021
}

export const basicJSX = {
    footer:  <div className="footer"><i>(c) 2021. All Right Reserved  {KNT.string.titleCase(basic.company)} <small> {basic.developer}</small> </i></div> ,
    poweredBy: <div className='powered-div'>Powered By JPC Web Stack</div> 
}