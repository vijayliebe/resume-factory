
export const ResumeService = (() => {
    
    const getResumes = () => {
        let resumes = localStorage.getItem('resumes') || "[]";
        resumes = JSON.parse(resumes);
        return resumes;
    }
    
    const getResumeById = (id) => {
        let resumes = localStorage.getItem('resumes') || "[]";
        resumes = JSON.parse(resumes);
        return resumes.filter((r)=> {return r.id = id;});
    }

    const saveResume = (data) => {
        data['id'] = Date.now();
        let resumes = localStorage.getItem('resumes') || "[]";
        resumes = JSON.parse(resumes);
        resumes.push(data);
        localStorage.setItem('resumes', JSON.stringify(resumes));
        return data;
    }

    const editResume = (id, data) => {
        let resumes = localStorage.getItem('resumes') || "[]";
        resumes = JSON.parse(resumes);
        resumes.forEach((r)=> {
            if(id == r.id){
                r = data;
            }
        });
        localStorage.setItem('resumes', JSON.stringify(resumes));
    }

    const dltResume = (id, data) => {
        let resumes = localStorage.getItem('resumes') || "[]";
        resumes = JSON.parse(resumes);
        resumes.forEach((r, i)=> {
            if(id == r.id){
                resumes.splice(i, 1)
            }
        });
        localStorage.setItem('resumes', JSON.stringify(resumes));
    }

    
    return {
        getResumes,
        getResumeById,
        saveResume,
        editResume,
        dltResume
    }
})()