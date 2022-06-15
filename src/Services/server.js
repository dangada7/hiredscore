import {CandidateClass, ExperienceClass} from "@/Services/classes";
const axios = require("axios")

const server = "http://localhost:3000/"

const endPoints = {
    getCandidate : "getCandidate",
}

const responseStatus = {
    success : 200
}

// getCandidates
export const getCandidates = () => {
    return axios
        .get(server + endPoints.getCandidate)
        .then(response => {

            if (response.status === responseStatus.success) {

                let data = response.data
                let candidatesClassArr = []

                // 1) for each candidate
                data.forEach(item => {

                    // 2) get all experience
                    let experienceArr = []
                    if(item.experience){
                        item.experience.map(experienceItem => {
                            experienceArr.push(new ExperienceClass({
                                title : experienceItem.title,
                                startDate : experienceItem.start_date,
                                endDate : experienceItem.end_date,
                            }))
                        })
                    }


                    // 3) push to candidatesClassArr
                    candidatesClassArr.push(new CandidateClass({
                        name : item.contact_info.name.formatted_name,
                        experienceArr : experienceArr,
                    }))

                })

                return candidatesClassArr
            }
        })
}