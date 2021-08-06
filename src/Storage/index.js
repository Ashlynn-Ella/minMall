
//封装 sessionStorage
const STORAGE_KEY = 'mall'

export default {
    setItem(key,value,mudole_name) {
        if(mudole_name) {
            let vul = this.getItem(mudole_name)
            if(!vul) return
            vul[key] = value
            this.setItem(mudole_name,vul)
        } else {
            let vul = this.getStorage()
            vul[key]=value
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(vul))
        }       
    },
    //getItem(mall,user)
    getItem(key,mudole_name) {
        if(mudole_name){
            let vul = this.getItem(mudole_name)
            if (vul) return vul[key]
        }
       return this.getStorage()[key]
        
    },
    getStorage() {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
    },
    clear(key,mudole_name) {
        let vul = this.getStorage()
        if(vul == null){
            return
        } 
        if(mudole_name) {
            delete vul[mudole_name][key]
        } else {
            delete vul[key]
        }    

       window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(vul))
    }
}