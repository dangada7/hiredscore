
// CandidateClass
export class CandidateClass{

    name
    experienceArr

    constructor({name, experienceArr}) {
        this.name = name
        this.experienceArr = this.addGaps(experienceArr)

    }

    addGaps(experienceArr){

        // 1) sort
        experienceArr = experienceArr.sort((item1, item2) => {
            return new Date(item1.startDate).getTime() > new Date(item2.startDate).getTime() ? -1 : 1
        })

        let experienceArrWithGaps = []
        let i
        for(i=0; i<experienceArr.length-1; i++){
            experienceArrWithGaps.push(experienceArr[i])

            let startDate_currentJob = new Date(experienceArr[i].startDate)
            let endDate_prevExperience = new Date(experienceArr[i+1].endDate)

            const diffInMs   = startDate_currentJob - endDate_prevExperience
            const gapInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

            if(gapInDays > 0){
                experienceArrWithGaps.push(new ExperienceClass({gapInDays: gapInDays}))
            }
        }
        if(i > 0 ){
            experienceArrWithGaps.push(experienceArr[i])
        }

        return experienceArrWithGaps
    }

}

// Experience
export class ExperienceClass {

    title
    startDate
    endDate
    gapInDays

    constructor({title, startDate, endDate, gapInDays}) {
        this.title = title
        this.startDate = startDate
        this.endDate = endDate
        this.gapInDays = gapInDays
    }


    // getFormat
    getFormat(){

        if(this.gapExperience()){
            return this.getFormatGap()
        } else{
            return this.getFormatExperience()
        }
    }

    // getFormatExperience
    getFormatExperience(){
        if(this.endDate){
            return `Worked as: <b> ${this.title}</b>, From <b>${this.startDate}</b>  To <b>${this.endDate}</b>`
        }else{
            return `Worked as: <b> ${this.title}</b>, From <b>${this.startDate}</b>  To <b>Now</b>`
        }
    }

    // gapExperience
    gapExperience(){
        return this.gapInDays != null
    }

    // getFormatGap
    getFormatGap(){
        let days = this.gapInDays
        let years,months

        if(this.gapInDays > 365){
            years = Math.floor(days / 365)
            days = days % 365
        }
        if(days > 31){
            months = Math.floor(days / 31)
            days = days%31
        }

        let ansArr = []
        if(years > 0){
            ansArr.push(`<b>${years}</b> Years`)
        }
        if(months > 0){
            ansArr.push(`<b>${months}</b> Months`)
        }
        if(days > 0){
            ansArr.push(`<b>${days}</b> Days`)
        }
        return `Gap between jobs: ` + ansArr.join(" ,")
    }
}

