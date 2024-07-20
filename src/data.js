export const API_KEY='AIzaSyC0-67ao-Y3qKwunpNTMxLpXSPTzf43sNU'

export const view_converter=(value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M"
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"k"
        }
        else{
            return value
            }
}